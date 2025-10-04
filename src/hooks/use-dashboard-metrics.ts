// Comprehensive dashboard metrics hook for localStorage
import { useState, useEffect } from 'react';

export type TimePeriod = 'week' | 'month';

export function useDashboardMetrics(period: TimePeriod = 'month') {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMetrics = (timePeriod: TimePeriod = 'month') => {
    try {
      // Get data from all forms
      const incidentReports = JSON.parse(localStorage.getItem('incident_report') || '[]');
      const masterRegister = JSON.parse(localStorage.getItem('master_register') || '[]');
      const injuryDetails = JSON.parse(localStorage.getItem('injury_details') || '[]');
      const trainingRecords = JSON.parse(localStorage.getItem('training_competency_register') || '[]');
      const ncrRecords = JSON.parse(localStorage.getItem('ncr_register') || '[]');
      const observationRecords = JSON.parse(localStorage.getItem('observation_tracker') || '[]');

      // Calculate date range based on period
      const now = new Date();
      const periodStart = new Date();
      if (timePeriod === 'week') {
        periodStart.setDate(now.getDate() - 7);
      } else {
        periodStart.setDate(now.getDate() - 30);
      }

      // Filter data by time period
      const filterByPeriod = (items: any[], dateField: string = 'date') => {
        return items.filter((item: any) => {
          const itemDate = new Date(item[dateField] || item.createdAt || item.dateReported);
          return itemDate >= periodStart && itemDate <= now;
        });
      };

      const filteredIncidents = filterByPeriod(incidentReports);
      const filteredInjuries = filterByPeriod(injuryDetails);
      const filteredTraining = filterByPeriod(trainingRecords);
      const filteredNCRs = filterByPeriod(ncrRecords);
      const filteredObservations = filterByPeriod(observationRecords);

      // Calculate metrics from master register (latest entry)
      const latestMasterRecord = masterRegister.length > 0 ? masterRegister[masterRegister.length - 1] : {};

      // HSE Audit Metrics from master register
      const hseAuditMetrics = {
        AUDIT: latestMasterRecord.internalHSEAudit || 0,
        NCRs: latestMasterRecord.totalNCRS || 0,
        SORs: latestMasterRecord.seriousDangerousOccurrence || 0,
        ART: latestMasterRecord.kpiRatingART || 0,
        MEETINGS: latestMasterRecord.managementMeetings || 0,
        TRIR: 0, // Calculate if needed
        LTIFR: latestMasterRecord.ltifr || 0,
        LTISR: latestMasterRecord.ltisr || 0
      };

      // Incident metrics (filtered by period)
      const totalIncidents = filteredIncidents.length;
      const recentIncidents = filteredIncidents.length; // All filtered incidents are recent for the period

      // Training metrics (filtered by period)
      const totalTrainingHours = filteredTraining.reduce((sum: number, record: any) =>
        sum + (parseFloat(record.totalHours || 0) || 0), 0);
      const avgTrainingPerEmployee = filteredTraining.length > 0 ?
        Math.round(totalTrainingHours / filteredTraining.length) : 0;

      // NCR metrics (filtered by period)
      const openNCRs = filteredNCRs.filter((ncr: any) => ncr.status !== 'Closed').length;
      const closedNCRs = filteredNCRs.filter((ncr: any) => ncr.status === 'Closed').length;

      // Safety metrics from master register
      const totalLTIs = latestMasterRecord.totalLTI || 0;
      const fatalities = latestMasterRecord.fatalities || 0;

      // Calculate days without LTI (simplified)
      const daysWithoutLTI = totalLTIs === 0 ? 45 : Math.max(0, 45 - totalLTIs * 7);

      // Project performance metrics
      const projectScore = Math.max(0, 100 - (totalIncidents * 2) - (openNCRs * 5) - (fatalities * 20));
      const projectRating = projectScore >= 90 ? 'A+' : projectScore >= 80 ? 'A' : projectScore >= 70 ? 'B' : 'C';

      return {
        // Main dashboard metrics
        totalIncidents,
        totalEmployees: masterRegister.length,
        totalInjuries: filteredInjuries.length,
        completedTraining: filteredTraining.length,
        safetyScore: Math.max(0, 100 - (totalIncidents * 5) - (filteredInjuries.length * 10)),
        monthlyTrend: 5.2,

        // HSE Metrics Grid
        projectRating,
        projectScore,
        leadingIndicators: totalIncidents,
        trainingAverage: filteredTraining.length > 0 ? 85 : 0, // Could be calculated from actual data
        daysWithoutLTI,
        incidentsReported: recentIncidents,
        reportsSubmitted: filteredIncidents.length,
        activeTrainings: filteredTraining.length,
        ncrs: openNCRs,
        completedInspections: latestMasterRecord.safetyInspectionsConducted || 0,

        // HSE Audit Metrics
        hseAuditMetrics,

        // Extended metrics for other dashboards
        totalTrainingHours,
        avgTrainingPerEmployee,
        openNCRs,
        closedNCRs,
        totalNCRs: filteredNCRs.length,
        observationRecords: filteredObservations.length,
        openObservations: filteredObservations.filter((obs: any) => obs.status !== 'Closed').length,
        closedObservations: filteredObservations.filter((obs: any) => obs.status === 'Closed').length,

        // Master register metrics
        latestMasterRecord,

        loading: false,
        error: null
      };
    } catch (error) {
      console.error('Error calculating metrics:', error);
      return {
        totalIncidents: 0,
        totalEmployees: 0,
        totalInjuries: 0,
        completedTraining: 0,
        safetyScore: 100,
        monthlyTrend: 0,
        projectRating: "N/A",
        projectScore: 0,
        leadingIndicators: 0,
        trainingAverage: 0,
        daysWithoutLTI: 0,
        incidentsReported: 0,
        reportsSubmitted: 0,
        activeTrainings: 0,
        ncrs: 0,
        completedInspections: 0,
        hseAuditMetrics: {
          AUDIT: 0, NCRs: 0, SORs: 0, ART: 0, MEETINGS: 0, TRIR: 0, LTIFR: 0, LTISR: 0
        },
        totalTrainingHours: 0,
        avgTrainingPerEmployee: 0,
        openNCRs: 0,
        closedNCRs: 0,
        totalNCRs: 0,
        observationRecords: 0,
        openObservations: 0,
        closedObservations: 0,
        latestMasterRecord: {},
        loading: false,
        error: 'Failed to load metrics'
      };
    }
  };

  const refreshMetrics = (timePeriod?: TimePeriod) => {
    try {
      setLoading(true);
      setError(null);
      const newMetrics = getMetrics(timePeriod || period);
      setMetrics(newMetrics);
    } catch (err) {
      setError('Failed to load metrics');
      console.error('Error refreshing metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    refreshMetrics();

    // Listen for localStorage changes (cross-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      // Only refresh if the changed key is one of our data sources
      const relevantKeys = [
        'incident_report',
        'master_register',
        'injury_details',
        'training_competency_register',
        'ncr_register',
        'observation_tracker'
      ];

      if (e.key && relevantKeys.includes(e.key)) {
        refreshMetrics();
      }
    };

    // Custom event for same-tab updates
    const handleCustomStorageChange = () => {
      refreshMetrics();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdate', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdate', handleCustomStorageChange);
    };
  }, [period]);

  return { metrics, loading, error, refreshMetrics };
}