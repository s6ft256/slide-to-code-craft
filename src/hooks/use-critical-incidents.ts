// Hook for managing critical incidents notifications
import { useState, useEffect } from 'react';

export interface CriticalIncident {
  id: string;
  srno: string | null;
  incidentdate: string | null;
  time: string | null;
  section: string | null;
  details: string;
  severity: string;
  description: string;
  location: string;
  incidentType: string;
  status: string;
}

export function useCriticalIncidents() {
  const [criticalIncidents, setCriticalIncidents] = useState<CriticalIncident[]>([]);
  const [loading, setLoading] = useState(true);

  const getCriticalIncidents = (): CriticalIncident[] => {
    try {
      const incidentReports = JSON.parse(localStorage.getItem('incident_report') || '[]');

      return incidentReports
        .map((incident: any) => {
          try {
            // Parse additional details from the details field if it exists
            let additionalDetails = null;
            if (incident.details && typeof incident.details === 'string') {
              try {
                additionalDetails = JSON.parse(incident.details);
              } catch {
                // If parsing fails, treat details as plain text
                additionalDetails = { description: incident.details };
              }
            } else if (incident.details && typeof incident.details === 'object') {
              additionalDetails = incident.details;
            }

            // Extract severity and other details
            const severity = additionalDetails?.severity || 'Low';
            const description = additionalDetails?.description || incident.details || 'No description';
            const location = additionalDetails?.location || incident.section || 'Unknown';
            const incidentType = additionalDetails?.incident_type || 'General';
            const status = additionalDetails?.status || (incident.reportref ? 'Reported' : 'Pending');

            return {
              id: incident.id,
              srno: incident.srno,
              incidentdate: incident.incidentdate,
              time: incident.time,
              section: incident.section,
              details: incident.details || '',
              severity,
              description,
              location,
              incidentType,
              status
            };
          } catch (error) {
            console.error('Error parsing incident:', error);
            return null;
          }
        })
        .filter((incident: CriticalIncident | null): incident is CriticalIncident => {
          // Filter for critical incidents (High severity or specific criteria)
          return incident !== null && (
            incident.severity === 'High' ||
            incident.severity === 'Critical' ||
            incident.incidentType?.toLowerCase().includes('fatality') ||
            incident.incidentType?.toLowerCase().includes('serious') ||
            incident.description?.toLowerCase().includes('fatality') ||
            incident.description?.toLowerCase().includes('serious injury')
          );
        })
        .sort((a: CriticalIncident, b: CriticalIncident) => {
          // Sort by date (most recent first)
          const dateA = new Date(a.incidentdate || a.id).getTime();
          const dateB = new Date(b.incidentdate || b.id).getTime();
          return dateB - dateA;
        });
    } catch (error) {
      console.error('Error loading critical incidents:', error);
      return [];
    }
  };

  const refreshCriticalIncidents = () => {
    setLoading(true);
    const incidents = getCriticalIncidents();
    setCriticalIncidents(incidents);
    setLoading(false);
  };

  useEffect(() => {
    refreshCriticalIncidents();

    // Listen for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'incident_report') {
        refreshCriticalIncidents();
      }
    };

    // Custom event for same-tab updates
    const handleCustomStorageChange = () => {
      refreshCriticalIncidents();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdate', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdate', handleCustomStorageChange);
    };
  }, []);

  return {
    criticalIncidents,
    loading,
    count: criticalIncidents.length,
    refreshCriticalIncidents
  };
}