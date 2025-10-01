import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { startOfMonth, endOfMonth } from 'date-fns';

export type IncidentData = {
  id: number;
  details: string | null;
  incidentdate: string | null;
  reportref: string | null;
  section: string | null;
  srno: string | null;
  time: string | null;
  incident_type: string | null;
  severity: string | null;
  status: string | null;
};

// Define standard categories for consistent display
export const DEFAULT_CATEGORIES = {
  incidentTypes: {
    'Near Miss': 0,
    'Minor Injury': 0,
    'Major Injury': 0,
    'Property Damage': 0,
    'Environmental': 0
  },
  severityLevels: {
    'Low': 0,
    'Medium': 0,
    'High': 0,
    'Critical': 0
  },
  statusSummary: {
    'Open': 0,
    'In Progress': 0,
    'Under Investigation': 0,
    'Closed': 0
  }
} as const;

export type IncidentMetrics = {
  totalIncidents: number;
  openReports: number;
  responseTime: string;
  personnelAffected: number;
  incidentTypes: Record<string, number>;
  severityLevels: Record<string, number>;
  statusSummary: Record<string, number>;
  monthlyData: {
    dates: string[];
    counts: number[];
  };
  loading: boolean;
  error: string | null;
};

const initialMetrics: IncidentMetrics = {
  totalIncidents: 0,
  openReports: 0,
  responseTime: '0h',
  personnelAffected: 0,
  incidentTypes: { ...DEFAULT_CATEGORIES.incidentTypes },
  severityLevels: { ...DEFAULT_CATEGORIES.severityLevels },
  statusSummary: { ...DEFAULT_CATEGORIES.statusSummary },
  monthlyData: {
    dates: [],
    counts: []
  },
  loading: true,
  error: null
};

export const useIncidentMetrics = () => {
  const [metrics, setMetrics] = useState<IncidentMetrics>(initialMetrics);
  const [incidents, setIncidents] = useState<IncidentData[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchIncidentData = async () => {
      if (!mounted) return;

      try {
        const startDate = startOfMonth(new Date());
        const endDate = endOfMonth(new Date());

        const { data: monthlyIncidents, error } = await supabase
          .from('incident_report')
          .select('*')
          .gte('incidentdate', startDate.toISOString())
          .lte('incidentdate', endDate.toISOString());

        if (error) throw error;

        // Initialize with empty array if no data
        const incidentData = (monthlyIncidents || []) as IncidentData[];
        if (mounted) setIncidents(incidentData);

        // Start with default values
        const updatedMetrics = {
          incidentTypes: { ...DEFAULT_CATEGORIES.incidentTypes },
          severityLevels: { ...DEFAULT_CATEGORIES.severityLevels },
          statusSummary: { ...DEFAULT_CATEGORIES.statusSummary },
          dateGroups: new Map<string, number>()
        };

        // Process incidents if we have any
        if (incidentData.length > 0) {
          incidentData.forEach(incident => {
            // Update incident types
            if (incident.incident_type) {
              updatedMetrics.incidentTypes[incident.incident_type] = 
                (updatedMetrics.incidentTypes[incident.incident_type] || 0) + 1;
            }

            // Update severity levels
            if (incident.severity) {
              updatedMetrics.severityLevels[incident.severity] = 
                (updatedMetrics.severityLevels[incident.severity] || 0) + 1;
            }

            // Update status summary
            const status = incident.status || 'Open';
            updatedMetrics.statusSummary[status] = 
              (updatedMetrics.statusSummary[status] || 0) + 1;

            // Update date groups
            if (incident.incidentdate) {
              const count = updatedMetrics.dateGroups.get(incident.incidentdate) || 0;
              updatedMetrics.dateGroups.set(incident.incidentdate, count + 1);
            }
          });
        }

        if (mounted) {
          setMetrics({
            totalIncidents: incidentData.length,
            openReports: incidentData.filter(i => i.status !== 'Closed').length,
            responseTime: '0h',
            personnelAffected: incidentData.length, // Assuming one person per incident
            incidentTypes: updatedMetrics.incidentTypes,
            severityLevels: updatedMetrics.severityLevels,
            statusSummary: updatedMetrics.statusSummary,
            monthlyData: {
              dates: Array.from(updatedMetrics.dateGroups.keys()),
              counts: Array.from(updatedMetrics.dateGroups.values())
            },
            loading: false,
            error: null
          });
        }
      } catch (error) {
        if (mounted) {
          setMetrics({
            ...initialMetrics,
            loading: false,
            error: error instanceof Error ? error.message : 'Error fetching incident data'
          });
        }
      }
    };

    // Set up real-time subscription
    const subscription = supabase
      .channel('incident_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'incident_report' },
        () => fetchIncidentData()
      )
      .subscribe();

    // Initial fetch
    fetchIncidentData();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { metrics, incidents };
};