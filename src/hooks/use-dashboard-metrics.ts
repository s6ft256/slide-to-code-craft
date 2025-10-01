import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { startOfMonth, endOfMonth, differenceInDays } from 'date-fns';

// Types
export type DateRange = {
  start: Date;
  end: Date;
};

export type DashboardMetrics = {
  projectRating: string;
  projectScore: number;
  leadingIndicators: number;
  trainingAverage: number;
  daysWithoutLTI: number;
  incidentsReported: number;
  reportsSubmitted: number;
  activeTrainings: number;
  ncrs: number;
  completedInspections: number;
  loading: boolean;
  error: string | null;
  dateRange: DateRange;
};

const initialMetrics: DashboardMetrics = {
  projectRating: '★★★★☆',
  projectScore: 0,
  leadingIndicators: 0,
  trainingAverage: 0,
  daysWithoutLTI: 0,
  incidentsReported: 0,
  reportsSubmitted: 0,
  activeTrainings: 0,
  ncrs: 0,
  completedInspections: 0,
  loading: true,
  error: null,
  dateRange: {
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date())
  }
};

// Helper functions
function calculateProjectScore({
  trainingAverage,
  daysWithoutLTI,
  leadingIndicators,
  ncrCount
}: {
  trainingAverage: number;
  daysWithoutLTI: number;
  leadingIndicators: number;
  ncrCount: number;
}): number {
  let score = 0;
  
  // Training performance (30% weight)
  score += (trainingAverage / 100) * 30;
  
  // Safety performance (40% weight)
  const safetyScore = Math.min(daysWithoutLTI / 365, 1) * 40;
  score += safetyScore;
  
  // Proactive measures (20% weight)
  const proactiveScore = Math.min(leadingIndicators / 10, 1) * 20;
  score += proactiveScore;
  
  // NCR impact (10% weight)
  const ncrImpact = Math.max(0, 1 - (ncrCount / 10)) * 10;
  score += ncrImpact;
  
  return Math.round(score);
}

function calculateProjectRating(score: number): string {
  if (score >= 90) return '★★★★★';
  if (score >= 80) return '★★★★☆';
  if (score >= 70) return '★★★☆☆';
  if (score >= 60) return '★★☆☆☆';
  return '★☆☆☆☆';
}

// Main hook
export function useDashboardMetrics(customDateRange?: DateRange) {
  const [metrics, setMetrics] = useState<DashboardMetrics>(initialMetrics);

  const calculateMetrics = useCallback(async (dateRange: DateRange) => {
    try {
      // Fetch incidents within date range
      const { data: incidents, error: incidentsError } = await supabase
        .from('incident_report')
        .select('*')
        .gte('incidentdate', dateRange.start.toISOString())
        .lte('incidentdate', dateRange.end.toISOString());

      if (incidentsError) throw incidentsError;

      // Fetch training data within date range
      const { data: trainingData, error: trainingError } = await supabase
        .from('training_competency_register')
        .select('*')
        .gte('dateoftraining', dateRange.start.toISOString())
        .lte('dateoftraining', dateRange.end.toISOString());

      if (trainingError) throw trainingError;

      // Calculate training metrics based on training scores
      const completedTrainings = trainingData?.filter(t => t.score >= 70) || [];
      const trainingAverage = trainingData?.length ? 
        (completedTrainings.length / trainingData.length) * 100 : 0;
      const activeTrainings = trainingData?.filter(t => t.internalexternal === 'Internal').length || 0;

      // Fetch NCRs within date range
      const { data: ncrData, error: ncrError } = await supabase
        .from('cnr_tracker')
        .select('*')
        .gte('issueddate', dateRange.start.toISOString())
        .lte('issueddate', dateRange.end.toISOString());

      if (ncrError) throw ncrError;

      // Calculate days without LTI based on incident details
      const isLTIIncident = (details: string | null) => 
        details?.toLowerCase().includes('lti') || details?.toLowerCase().includes('lost time injury');
      
      const ltiIncidents = incidents?.filter(i => isLTIIncident(i.details)) || [];
      const lastLTI = ltiIncidents.length > 0 ? 
        new Date(Math.max(...ltiIncidents.map(i => new Date(i.incidentdate || '').getTime()))) : null;
      const daysWithoutLTI = lastLTI ? 
        differenceInDays(new Date(), lastLTI) : 
        differenceInDays(new Date(), dateRange.start);

      // Calculate leading indicators (near misses from incident details)
      const isNearMiss = (details: string | null) =>
        details?.toLowerCase().includes('near miss') || details?.toLowerCase().includes('near-miss');
      const leadingIndicators = incidents?.filter(i => isNearMiss(i.details)).length || 0;

      // Calculate project score based on various metrics
      const projectScore = calculateProjectScore({
        trainingAverage,
        daysWithoutLTI,
        leadingIndicators,
        ncrCount: ncrData?.length || 0
      });

      // Calculate project rating based on project score
      const projectRating = calculateProjectRating(projectScore);

      setMetrics({
        projectRating,
        projectScore,
        leadingIndicators,
        trainingAverage,
        daysWithoutLTI,
        incidentsReported: incidents?.length || 0,
        reportsSubmitted: incidents?.filter(i => i.reportref).length || 0,
        activeTrainings,
        ncrs: ncrData?.filter(n => n.status === 'Open').length || 0,
        completedInspections: completedTrainings.length,
        loading: false,
        error: null,
        dateRange
      });
    } catch (error) {
      setMetrics(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred while fetching metrics'
      }));
    }
  }, []);

  // Set up subscriptions
  useEffect(() => {
    const dateRange = customDateRange || initialMetrics.dateRange;
    calculateMetrics(dateRange);

    // Set up real-time subscriptions
    const incidentSubscription = supabase
      .channel('incident_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'incident_report' },
        () => calculateMetrics(dateRange)
      )
      .subscribe();

    const trainingSubscription = supabase
      .channel('training_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'training_competency_register' },
        () => calculateMetrics(dateRange)
      )
      .subscribe();

    const ncrSubscription = supabase
      .channel('ncr_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'cnr_tracker' },
        () => calculateMetrics(dateRange)
      )
      .subscribe();

    return () => {
      incidentSubscription.unsubscribe();
      trainingSubscription.unsubscribe();
      ncrSubscription.unsubscribe();
    };
  }, [calculateMetrics, customDateRange]);

  return metrics;
}