// Comprehensive dashboard metrics hook for localStorage
import { useState, useEffect } from 'react';

export type TimePeriod = 'week' | 'month';

export function useDashboardMetrics(period: TimePeriod = 'month') {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMetrics = (timePeriod: TimePeriod = 'month') => {
    try {
      // Get data from all DATA ENTRY forms
      const incidentReports = JSON.parse(localStorage.getItem('incident_report') || '[]');
      const masterRegister = JSON.parse(localStorage.getItem('master_register') || '[]');
      const injuryDetails = JSON.parse(localStorage.getItem('injury_details') || '[]');
      const trainingRecords = JSON.parse(localStorage.getItem('training_competency_register') || '[]');
      const ncrRecords = JSON.parse(localStorage.getItem('ncr_register') || '[]');
      const observationRecords = JSON.parse(localStorage.getItem('observation_tracker') || '[]');
      const hseViolations = JSON.parse(localStorage.getItem('hse_violations') || '[]');

      // Get project info data
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      const projectInfoData = projects.map((project: any) => {
        const projectInfo = localStorage.getItem(`project_info_${project.code}`);
        return projectInfo ? JSON.parse(projectInfo) : null;
      }).filter(Boolean);

      // Calculate project-based metrics
      const totalSafeManHours = projectInfoData.reduce((sum: number, project: any) =>
        sum + (parseInt(project.safeManhours) || 0), 0);

      // For total employees, we'll use the latest master register entry or derive from project data
      const totalEmployeesFromProjects = projectInfoData.reduce((sum: number, project: any) =>
        sum + (parseInt(project.totalEmployees) || 0), 0);
      const totalEmployees = totalEmployeesFromProjects || masterRegister.length || 0;

      // Calculate date range based on period
      const now = new Date();
      const periodStart = new Date();
      if (timePeriod === 'week') {
        periodStart.setDate(now.getDate() - 7);
      } else {
        periodStart.setDate(now.getDate() - 30);
      }

      // Filter data by time period - handle different date field names
      const filterByPeriod = (items: any[]) => {
        return items.filter((item: any) => {
          // Try different date field names that forms might use
          const dateFields = ['date', 'createdAt', 'dateReported', 'issuedDate', 'incidentdate', 'dateOfIncident'];
          let itemDate: Date | null = null;

          for (const field of dateFields) {
            if (item[field]) {
              itemDate = new Date(item[field]);
              if (!isNaN(itemDate.getTime())) break;
            }
          }

          // If no valid date found, include the item (for backward compatibility)
          if (!itemDate || isNaN(itemDate.getTime())) return true;

          return itemDate >= periodStart && itemDate <= now;
        });
      };

      const filteredIncidents = filterByPeriod(incidentReports);
      const filteredInjuries = filterByPeriod(injuryDetails);
      const filteredTraining = filterByPeriod(trainingRecords);
      const filteredNCRs = filterByPeriod(ncrRecords);
      const filteredObservations = filterByPeriod(observationRecords);
      const filteredViolations = filterByPeriod(hseViolations);

      // Calculate metrics from master register (latest entry) - use as fallback
      const latestMasterRecord = masterRegister.length > 0 ? masterRegister[masterRegister.length - 1] : {};

      // HSE Audit Metrics - calculate from actual form data
      const hseAuditMetrics = {
        AUDIT: latestMasterRecord.internalHSEAudit || 0, // Still from master register
        NCRs: filteredNCRs.length,
        SORs: filteredIncidents.filter((incident: any) => {
          // Count serious incidents (could be based on severity or other criteria)
          try {
            const details = JSON.parse(incident.details || '{}');
            return details.severity === 'High' || details.event_category === 'Serious';
          } catch {
            return false;
          }
        }).length,
        ART: latestMasterRecord.kpiRatingART || 0, // Still from master register
        MEETINGS: latestMasterRecord.managementMeetings || 0, // Still from master register
        TRIR: 0, // Calculate if needed
        LTIFR: latestMasterRecord.ltifr || 0,
        LTISR: latestMasterRecord.ltisr || 0
      };

      // Incident metrics (filtered by period)
      const totalIncidents = filteredIncidents.length;
      const recentIncidents = filteredIncidents.length;

      // Training metrics (filtered by period)
      const totalTrainingHours = filteredTraining.reduce((sum: number, record: any) =>
        sum + (parseFloat(record.totalHours || 0) || 0), 0);
      const avgTrainingPerEmployee = filteredTraining.length > 0 ?
        Math.round(totalTrainingHours / filteredTraining.length) : 0;

      // NCR metrics (filtered by period)
      const openNCRs = filteredNCRs.filter((ncr: any) => ncr.status !== 'Closed').length;
      const closedNCRs = filteredNCRs.filter((ncr: any) => ncr.status === 'Closed').length;

      // Safety metrics from injury details and incidents
      const totalLTIs = filteredInjuries.length + filteredIncidents.filter((incident: any) => {
        try {
          const details = JSON.parse(incident.details || '{}');
          return details.injuries > 0;
        } catch {
          return false;
        }
      }).length;

      const fatalities = filteredIncidents.filter((incident: any) => {
        try {
          const details = JSON.parse(incident.details || '{}');
          return details.severity === 'Fatal';
        } catch {
          return false;
        }
      }).length;

      // Calculate days without LTI (simplified - based on recent incident dates)
      const daysWithoutLTI = totalLTIs === 0 ? (timePeriod === 'week' ? 7 : 30) :
        Math.max(0, (timePeriod === 'week' ? 7 : 30) - totalLTIs * 2);

      // Project performance metrics - calculate from real data
      const projectScore = Math.max(0, 100 - (totalIncidents * 2) - (openNCRs * 5) - (fatalities * 20) - (filteredViolations.length * 1));
      const projectRating = projectScore >= 90 ? 'A+' : projectScore >= 80 ? 'A' : projectScore >= 70 ? 'B' : 'C';

      // Training completion rate - calculate from actual training data
      const trainingCompletionRate = filteredTraining.length > 0 ?
        Math.round((filteredTraining.filter((t: any) => t.status === 'Completed').length / filteredTraining.length) * 100) : 0;

      return {
        // Main dashboard metrics
        totalIncidents,
        totalEmployees,
        totalInjuries: filteredInjuries.length,
        completedTraining: filteredTraining.filter((t: any) => t.status === 'Completed').length,
        safetyScore: Math.max(0, 100 - (totalIncidents * 5) - (filteredInjuries.length * 10) - (filteredViolations.length * 2)),
        monthlyTrend: totalIncidents > 0 ? -2.1 : 5.2, // Negative if incidents, positive if no incidents

        // HSE Metrics Grid
        projectRating,
        projectScore,
        leadingIndicators: totalIncidents,
        trainingAverage: trainingCompletionRate,
        daysWithoutLTI,
        incidentsReported: recentIncidents,
        reportsSubmitted: filteredIncidents.length + filteredNCRs.length + filteredViolations.length,
        activeTrainings: filteredTraining.filter((t: any) => t.status === 'In Progress').length,
        ncrs: openNCRs,
        completedInspections: filteredObservations.length, // Use observations as proxy for inspections
        safeManHours: totalSafeManHours,

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
        totalViolations: filteredViolations.length,

        // Master register metrics (as fallback)
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
        projectRating: 'N/A',
        projectScore: 0,
        leadingIndicators: 0,
        trainingAverage: 0,
        daysWithoutLTI: 30,
        incidentsReported: 0,
        reportsSubmitted: 0,
        activeTrainings: 0,
        ncrs: 0,
        completedInspections: 0,
        safeManHours: 0,
        hseAuditMetrics: {
          AUDIT: 0,
          NCRs: 0,
          SORs: 0,
          ART: 0,
          MEETINGS: 0,
          TRIR: 0,
          LTIFR: 0,
          LTISR: 0
        },
        totalTrainingHours: 0,
        avgTrainingPerEmployee: 0,
        openNCRs: 0,
        closedNCRs: 0,
        totalNCRs: 0,
        observationRecords: 0,
        openObservations: 0,
        closedObservations: 0,
        totalViolations: 0,
        latestMasterRecord: {},
        loading: false,
        error: 'Failed to calculate metrics'
      };
    }
  };

  const refreshMetrics = (timePeriod?: TimePeriod) => {
    setLoading(true);
    setError(null);
    try {
      const newMetrics = getMetrics(timePeriod || period);
      setMetrics(newMetrics);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshMetrics();
  }, [period]);

  useEffect(() => {
    // Listen for localStorage changes to refresh metrics
    const handleStorageChange = (e: StorageEvent) => {
      // Only refresh if relevant keys changed
      const relevantKeys = [
        'incident_report', 'master_register', 'injury_details',
        'training_competency_register', 'ncr_register', 'observation_tracker',
        'hse_violations', 'projects'
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
