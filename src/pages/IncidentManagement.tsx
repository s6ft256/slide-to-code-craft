import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import LTIChart from "@/components/LTIChart";
import { AlertTriangle, FileText, Clock, Users, TrendingDown, Loader2, LucideIcon } from "lucide-react";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { IncidentList } from "@/components/IncidentList";
import { useIncidentMetrics } from "@/hooks/use-incident-metrics";

const IncidentManagement = () => {
  const { metrics, loading, error } = useDashboardMetrics();
  const { incidents } = useIncidentMetrics();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px] text-red-500">
          <AlertTriangle className="h-6 w-6 mr-2" />
          {error}
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
      value: (metrics?.totalIncidents ?? 0).toString().padStart(2, '0'),
      subtitle: "This Month",
      icon: AlertTriangle,
      variant: getVariant((metrics?.totalIncidents ?? 0) === 0, 'success', 'warning')
    },
    {
      title: "Open Reports",
      value: (metrics?.reportsSubmitted ?? 0).toString().padStart(2, '0'),
      subtitle: "Pending",
      icon: FileText,
      variant: (metrics?.reportsSubmitted ?? 0) > 5 ? 'destructive' : 
              (metrics?.reportsSubmitted ?? 0) > 0 ? 'warning' : 'success'
    },
    {
      title: "Response Time",
      value: "24h",
      subtitle: "Average",
      icon: Clock,
      variant: 'default'
    },
    {
      title: "Personnel Affected",
      value: (metrics?.totalInjuries ?? 0).toString().padStart(2, '0'),
      subtitle: "Current",
      icon: Users,
      variant: getVariant((metrics?.totalInjuries ?? 0) > 0, 'warning', 'success')
    }
  ];

  return (
    <Layout>
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
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Safety Incidents</span>
                <span className="font-bold text-foreground">{metrics?.totalIncidents ?? 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Injury Reports</span>
                <span className="font-bold text-foreground">{metrics?.totalInjuries ?? 0}</span>
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Severity Levels">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">High</span>
                <span className="font-bold text-foreground">{Math.floor((metrics?.totalIncidents ?? 0) * 0.3)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Medium</span>
                <span className="font-bold text-foreground">{Math.floor((metrics?.totalIncidents ?? 0) * 0.5)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Low</span>
                <span className="font-bold text-foreground">{Math.floor((metrics?.totalIncidents ?? 0) * 0.2)}</span>
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Status Summary">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Open</span>
                <span className="font-bold text-warning">{metrics?.reportsSubmitted ?? 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Closed</span>
                <span className="font-bold text-success">{(metrics?.totalIncidents ?? 0) - (metrics?.reportsSubmitted ?? 0)}</span>
              </div>
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