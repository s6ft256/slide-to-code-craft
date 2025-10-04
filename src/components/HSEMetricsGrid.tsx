import { 
  Activity, 
  GraduationCap, 
  Calendar, 
  FileText, 
  Clock, 
  Users, 
  Target,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Loader2
} from "lucide-react";
import MetricCard from "./MetricCard";

type MetricVariant = 'success' | 'warning' | 'destructive' | 'default';

interface HSEMetricsGridProps {
  metrics?: any;
  loading?: boolean;
  error?: string | null;
  period?: 'week' | 'month';
}

const HSEMetricsGrid = ({ metrics, loading = false, error = null, period = 'month' }: HSEMetricsGridProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        {error}
      </div>
    );
  }

  const periodText = period === 'week' ? 'This Week' : 'This Month';

  const metricCards = [
    {
      title: "Project Rating",
      value: metrics?.projectRating ?? "N/A",
      subtitle: "OPS 14",
      icon: Target,
      variant: 'success' as MetricVariant
    },
    {
      title: "Project Score",
      value: ((metrics?.projectScore ?? 0)).toString(),
      subtitle: "G E",
      icon: TrendingUp,
      variant: (((metrics?.projectScore ?? 0)) >= 0 ? 'success' : 'destructive') as MetricVariant
    },
    {
      title: "Leading Indicators",
      value: ((metrics?.leadingIndicators ?? 0)).toString().padStart(2, '0'),
      subtitle: "Incidents",
      icon: Activity,
      variant: 'success' as MetricVariant
    },
    {
      title: "Training Average",
      value: `${Math.round(metrics?.trainingAverage ?? 0)}%`,
      subtitle: "Completion",
      icon: GraduationCap,
      variant: ((metrics?.trainingAverage ?? 0) >= 80 ? 'success' : 'warning') as MetricVariant
    },
    {
      title: "Days Without LTI",
      value: ((metrics?.daysWithoutLTI ?? 0)).toString(),
      subtitle: "Days",
      icon: Calendar,
      variant: ((metrics?.daysWithoutLTI ?? 0) > 30 ? 'success' : 'warning') as MetricVariant
    },
    {
      title: "Incidents Reported",
      value: ((metrics?.incidentsReported ?? 0)).toString(),
      subtitle: periodText,
      icon: AlertTriangle,
      variant: ((metrics?.incidentsReported ?? 0) === 0 ? 'success' : 'warning') as MetricVariant
    },
    {
      title: "Reports Submitted",
      value: ((metrics?.reportsSubmitted ?? 0)).toString(),
      subtitle: periodText,
      icon: FileText,
      variant: 'default' as MetricVariant
    },
    {
      title: "Active Trainings",
      value: ((metrics?.activeTrainings ?? 0)).toString(),
      subtitle: "In Progress",
      icon: Users,
      variant: 'default' as MetricVariant
    },
    {
      title: "NCRs",
      value: ((metrics?.ncrs ?? 0)).toString(),
      subtitle: "Open",
      icon: AlertTriangle,
      variant: ((metrics?.ncrs ?? 0) > 5 ? 'destructive' : (metrics?.ncrs ?? 0) > 2 ? 'warning' : 'success') as MetricVariant
    },
    {
      title: "Inspections",
      value: ((metrics?.completedInspections ?? 0)).toString(),
      subtitle: "Completed",
      icon: CheckCircle,
      variant: ((metrics?.completedInspections ?? 0) >= 10 ? 'success' : 'warning') as MetricVariant
    },
    {
      title: "SCRs Status",
      value: "0000",
      subtitle: "Open/Closed",
      icon: FileText,
      variant: "default" as const
    },
    {
      title: "Safe Man Hours",
      value: "00,000",
      subtitle: "Total Hours",
      icon: Clock,
      variant: "default" as const
    },
    {
      title: "Total Employees",
      value: "00",
      subtitle: "/ Employee",
      icon: Users,
      variant: "default" as const
    }
  ];

  const hseAuditMetrics = [
    { label: "AUDIT", value: (metrics?.hseAuditMetrics?.AUDIT ?? 0).toString() },
    { label: "NCRs", value: (metrics?.hseAuditMetrics?.NCRs ?? 0).toString() },
    { label: "SORs", value: (metrics?.hseAuditMetrics?.SORs ?? 0).toString() },
    { label: "ART", value: (metrics?.hseAuditMetrics?.ART ?? 0).toString() },
    { label: "MEETINGS", value: (metrics?.hseAuditMetrics?.MEETINGS ?? 0).toString() },
    { label: "TRIR", value: (metrics?.hseAuditMetrics?.TRIR ?? 0).toString() },
    { label: "LTIFR", value: (metrics?.hseAuditMetrics?.LTIFR ?? 0).toString() },
    { label: "LTISR", value: (metrics?.hseAuditMetrics?.LTISR ?? 0).toString() }
  ];

  return (
    <div className="space-y-8">
      {/* Main Metrics Grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">HSE Compliance Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((metric, index) => (
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

      {/* HSE Audit Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">HSE Audit Metrics</h3>
        <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {hseAuditMetrics.map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-1">{item.label}</p>
                <p className="text-xl font-bold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Status Summary */}
      <div className="bg-gradient-to-r from-accent-light/30 to-success-light/30 rounded-lg border border-accent/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="h-6 w-6 text-success" />
          <h3 className="text-lg font-semibold text-foreground">Project Status Summary</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">Mar 2025</div>
            <div className="text-sm text-muted-foreground">Project Timeline</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">Weekly</div>
            <div className="text-sm text-muted-foreground">Reporting Frequency</div>
          </div>
          {/* Removed 'Compliant' status per request */}
        </div>
      </div>
    </div>
  );
};

export default HSEMetricsGrid;