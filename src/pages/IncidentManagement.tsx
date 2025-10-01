import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import LTIChart from "@/components/LTIChart";
import IncidentReportForm from "@/components/IncidentReportForm";
import { AlertTriangle, FileText, Clock, Users, TrendingDown, Plus, Loader2, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useIncidentMetrics } from "@/hooks/use-incident-metrics";
import { IncidentList } from "@/components/IncidentList";

const IncidentManagement = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  const { metrics, incidents } = useIncidentMetrics();

  if (metrics.loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (metrics.error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px] text-red-500">
          <AlertTriangle className="h-6 w-6 mr-2" />
          {metrics.error}
        </div>
      </Layout>
    );
  }
  
  type MetricVariant = 'success' | 'warning' | 'destructive' | 'default';
  
  const getVariant = (condition: boolean, trueVariant: MetricVariant, falseVariant: MetricVariant): MetricVariant => 
    condition ? trueVariant : falseVariant;

  type MetricItem = {
    title: string;
    value: string;
    subtitle: string;
    icon: LucideIcon;
    variant: MetricVariant;
  };

  const incidentMetrics: MetricItem[] = [
    {
      title: "Total Incidents",
      value: metrics.totalIncidents.toString().padStart(2, '0'),
      subtitle: "This Month",
      icon: AlertTriangle,
      variant: getVariant(metrics.totalIncidents === 0, 'success', 'warning')
    },
    {
      title: "Open Reports",
      value: metrics.openReports.toString().padStart(2, '0'),
      subtitle: "Pending",
      icon: FileText,
      variant: metrics.openReports > 5 ? 'destructive' : 
              metrics.openReports > 0 ? 'warning' : 'success'
    },
    {
      title: "Response Time",
      value: metrics.responseTime,
      subtitle: "Average",
      icon: Clock,
      variant: 'default'
    },
    {
      title: "Personnel Affected",
      value: metrics.personnelAffected.toString().padStart(2, '0'),
      subtitle: "Current",
      icon: Users,
      variant: getVariant(metrics.personnelAffected > 0, 'warning', 'success')
    }
  ];

  if (showReportForm) {
    return (
      <Layout>
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                New Incident Report
              </h1>
              <p className="text-muted-foreground">
                Fill out the incident report form with all required details
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowReportForm(false)}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
        <IncidentReportForm onSuccess={() => setShowReportForm(false)} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Incident Management
            </h1>
            <p className="text-muted-foreground">
              Track and manage safety incidents and near misses
            </p>
          </div>
          <Button 
            onClick={() => setShowReportForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Incident Report
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Incident Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {incidentMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                subtitle={metric.subtitle}
                icon={metric.icon}
                variant={metric.variant}
              />
            ))}
          </div>
        </div>

        <LTIChart />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Incident Types">
            <div className="space-y-3">
              {Object.entries(metrics.incidentTypes).map(([type, count], index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{type}</span>
                  <span className="font-bold text-foreground">{count}</span>
                </div>
              ))}
              {Object.keys(metrics.incidentTypes).length === 0 && (
                <div className="text-sm text-muted-foreground text-center">No incidents recorded</div>
              )}
            </div>
          </ChartCard>

          <ChartCard title="Severity Levels">
            <div className="space-y-3">
              {Object.entries(metrics.severityLevels).map(([severity, count], index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{severity}</span>
                  <span className="font-bold text-foreground">{count}</span>
                </div>
              ))}
              {Object.keys(metrics.severityLevels).length === 0 && (
                <div className="text-sm text-muted-foreground text-center">No data available</div>
              )}
            </div>
          </ChartCard>

          <ChartCard title="Status Summary">
            <div className="space-y-3">
              {Object.entries(metrics.statusSummary).map(([status, count], index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{status}</span>
                  <span className={`font-bold ${status === 'Closed' ? 'text-success' : 
                    status === 'In Progress' ? 'text-warning' : 'text-primary'}`}>
                    {count}
                  </span>
                </div>
              ))}
              {Object.keys(metrics.statusSummary).length === 0 && (
                <div className="text-sm text-muted-foreground text-center">No status data available</div>
              )}
            </div>
          </ChartCard>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Incidents</h2>
          <IncidentList incidents={incidents} />
        </div>
      </div>
    </Layout>
  );
};

export default IncidentManagement;