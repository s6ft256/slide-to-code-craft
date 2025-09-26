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
  TrendingUp
} from "lucide-react";
import MetricCard from "./MetricCard";

const HSEMetricsGrid = () => {
  const metrics = [
    {
      title: "Project Rating",
      value: "★★★★☆",
      subtitle: "OPS 14",
      icon: Target,
      variant: "success" as const
    },
    {
      title: "Project Score",
      value: "+0",
      subtitle: "G E",
      icon: TrendingUp,
      variant: "default" as const
    },
    {
      title: "Leading Indicators",
      value: "00",
      subtitle: "Incidents",
      icon: Activity,
      variant: "success" as const
    },
    {
      title: "Training Average",
      value: "64.1%",
      subtitle: "Completion",
      icon: GraduationCap,
      variant: "warning" as const
    },
    {
      title: "Days Without LTI",
      value: "43",
      subtitle: "Days",
      icon: Calendar,
      variant: "success" as const
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
    { label: "AUDIT", value: "00" },
    { label: "NCRs", value: "00" },
    { label: "SORs", value: "00" },
    { label: "ART", value: "00" },
    { label: "MEETINGS", value: "00" },
    { label: "TRIR", value: "00" },
    { label: "LTIFR", value: "00" },
    { label: "LTISR", value: "00" }
  ];

  return (
    <div className="space-y-8">
      {/* Main Metrics Grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">HSE Compliance Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
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
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">Compliant</div>
            <div className="text-sm text-muted-foreground">HSE Status</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSEMetricsGrid;