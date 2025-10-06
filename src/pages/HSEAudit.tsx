import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProjectStatus from "@/components/charts/ProjectStatus";
import ChartCard from "@/components/charts/ChartCard";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface NCRRecord {
  id: string;
  srNo: string;
  status: string;
  typeOfNCR: string;
  type: string;
  createdAt: string;
}

interface ObservationRecord {
  id: string;
  type: string;
  status: string;
  createdAt: string;
}

interface IncidentRecord {
  id: string;
  details: string; // JSON string containing additional details
  createdAt: string;
}

interface ViolationRecord {
  id: string;
  reportType: string;
  location: string;
  createdAt: string;
}

interface AuditMetrics {
  totalNCRs: number;
  openNCRs: number;
  closedNCRs: number;
  ncrByType: Record<string, number>;
  totalObservations: number;
  openObservations: number;
  closedObservations: number;
  observationsByType: Record<string, number>;
  totalIncidents: number;
  incidentsBySeverity: Record<string, number>;
  totalViolations: number;
  violationsByType: Record<string, number>;
  violationsByLocation: Record<string, number>;
}

const HSEAudit = () => {
  const [metrics, setMetrics] = useState<AuditMetrics>({
    totalNCRs: 0,
    openNCRs: 0,
    closedNCRs: 0,
    ncrByType: {},
    totalObservations: 0,
    openObservations: 0,
    closedObservations: 0,
    observationsByType: {},
    totalIncidents: 0,
    incidentsBySeverity: {},
    totalViolations: 0,
    violationsByType: {},
    violationsByLocation: {}
  });
  const [loading, setLoading] = useState(true);

  const calculateMetrics = () => {
    // NCR Metrics
    const ncrData: NCRRecord[] = JSON.parse(localStorage.getItem('ncr_register') || '[]');
    const totalNCRs = ncrData.length;
    const openNCRs = ncrData.filter(ncr => ncr.status === 'Open').length;
    const closedNCRs = ncrData.filter(ncr => ncr.status === 'Closed').length;
    const ncrByType = ncrData.reduce((acc, ncr) => {
      acc[ncr.typeOfNCR] = (acc[ncr.typeOfNCR] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Observation Metrics
    const observationData: ObservationRecord[] = JSON.parse(localStorage.getItem('observation_tracker') || '[]');
    const totalObservations = observationData.length;
    const openObservations = observationData.filter(obs => obs.status === 'Open').length;
    const closedObservations = observationData.filter(obs => obs.status === 'Closed').length;
    const observationsByType = observationData.reduce((acc, obs) => {
      acc[obs.type] = (acc[obs.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Incident Metrics
    const incidentData: IncidentRecord[] = JSON.parse(localStorage.getItem('incident_report') || '[]');
    const totalIncidents = incidentData.length;
    const incidentsBySeverity = incidentData.reduce((acc, incident) => {
      try {
        const details = JSON.parse(incident.details || '{}');
        const severity = details.severity || 'Unknown';
        acc[severity] = (acc[severity] || 0) + 1;
      } catch {
        acc['Unknown'] = (acc['Unknown'] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Violation Metrics
    const violationData: ViolationRecord[] = JSON.parse(localStorage.getItem('hse_violations') || '[]');
    const totalViolations = violationData.length;
    const violationsByType = violationData.reduce((acc, violation) => {
      acc[violation.reportType] = (acc[violation.reportType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const violationsByLocation = violationData.reduce((acc, violation) => {
      acc[violation.location] = (acc[violation.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setMetrics({
      totalNCRs,
      openNCRs,
      closedNCRs,
      ncrByType,
      totalObservations,
      openObservations,
      closedObservations,
      observationsByType,
      totalIncidents,
      incidentsBySeverity,
      totalViolations,
      violationsByType,
      violationsByLocation
    });
    setLoading(false);
  };

  useEffect(() => {
    calculateMetrics();

    // Listen for localStorage updates
    const handleStorageUpdate = (event: CustomEvent) => {
      const { key } = event.detail;
      if (['ncr_register', 'observation_tracker', 'incident_report', 'hse_violations'].includes(key)) {
        calculateMetrics();
      }
    };

    window.addEventListener('localStorageUpdate', handleStorageUpdate as EventListener);

    return () => {
      window.removeEventListener('localStorageUpdate', handleStorageUpdate as EventListener);
    };
  }, []);

  // Prepare chart data
  const auditData = [
    { name: 'NCRs', open: metrics.openNCRs, closed: metrics.closedNCRs },
    { name: 'Observations', open: metrics.openObservations, closed: metrics.closedObservations },
    { name: 'Incidents', open: metrics.totalIncidents, closed: 0 }, // Incidents don't have open/closed status in current schema
    { name: 'Violations', open: metrics.totalViolations, closed: 0 }, // Violations don't have open/closed status in current schema
  ];

  const totalOpen = metrics.openNCRs + metrics.openObservations;
  const totalClosed = metrics.closedNCRs + metrics.closedObservations;
  const total = totalOpen + totalClosed;
  const closureRate = total > 0 ? Math.round((totalClosed / total) * 100) : 0;

  const closureData = [
    { name: 'Open', value: totalOpen, color: '#ef4444' },
    { name: 'Closed', value: totalClosed, color: '#22c55e' },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading audit metrics...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          HSE Audit
        </h1>
        <p className="text-muted-foreground">
          HSE audit management and tracking system
        </p>
      </div>

      <div className="space-y-8">
        <ProjectStatus />

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">HSE Audit Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">{metrics.totalNCRs.toString().padStart(2, '0')}</div>
                <div className="text-sm text-muted-foreground">Total NCRs</div>
                <div className="text-xs text-muted-foreground mt-1">{metrics.openNCRs} Open / {metrics.closedNCRs} Closed</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">{metrics.totalObservations.toString().padStart(2, '0')}</div>
                <div className="text-sm text-muted-foreground">Total Observations</div>
                <div className="text-xs text-muted-foreground mt-1">{metrics.openObservations} Open / {metrics.closedObservations} Closed</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">{metrics.totalIncidents.toString().padStart(2, '0')}</div>
                <div className="text-sm text-muted-foreground">Total Incidents</div>
                <div className="text-xs text-muted-foreground mt-1">Reported this period</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Audit Item Status">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={auditData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis />
                  <Bar dataKey="open" fill="hsl(var(--destructive))" name="Open" />
                  <Bar dataKey="closed" fill="hsl(var(--success))" name="Closed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Closure Rate">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={closureData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {closureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Audit Status Summary</h3>
          <div className="grid grid-cols-3 gap-6">
            <ChartCard title="Overall Closure Rate">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-2">{closureRate}%</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </ChartCard>

            <ChartCard title="NCR Resolution Rate">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning mb-2">
                  {metrics.totalNCRs > 0 ? Math.round((metrics.closedNCRs / metrics.totalNCRs) * 100) : 0}%
                </div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
            </ChartCard>

            <ChartCard title="Observation Closure Rate">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">
                  {metrics.totalObservations > 0 ? Math.round((metrics.closedObservations / metrics.totalObservations) * 100) : 0}%
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </ChartCard>
          </div>
        </div>

        {/* Additional metrics sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="NCR Types Distribution">
            <div className="space-y-2">
              {Object.entries(metrics.ncrByType).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-sm">{type || 'Unspecified'}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
              {Object.keys(metrics.ncrByType).length === 0 && (
                <div className="text-sm text-muted-foreground text-center">No NCR data available</div>
              )}
            </div>
          </ChartCard>

          <ChartCard title="Observation Types Distribution">
            <div className="space-y-2">
              {Object.entries(metrics.observationsByType).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-sm">{type}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
              {Object.keys(metrics.observationsByType).length === 0 && (
                <div className="text-sm text-muted-foreground text-center">No observation data available</div>
              )}
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Incident Severity Distribution">
            <div className="space-y-2">
              {Object.entries(metrics.incidentsBySeverity).map(([severity, count]) => (
                <div key={severity} className="flex justify-between items-center">
                  <span className="text-sm">{severity}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
              {Object.keys(metrics.incidentsBySeverity).length === 0 && (
                <div className="text-sm text-muted-foreground text-center">No incident data available</div>
              )}
            </div>
          </ChartCard>

          <ChartCard title="Violation Report Types">
            <div className="space-y-2">
              {Object.entries(metrics.violationsByType).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-sm">{type || 'Unspecified'}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
              {Object.keys(metrics.violationsByType).length === 0 && (
                <div className="text-sm text-muted-foreground text-center">No violation data available</div>
              )}
            </div>
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
};

export default HSEAudit;