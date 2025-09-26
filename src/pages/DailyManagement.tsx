import Layout from "@/components/Layout";
import ProjectStatus from "@/components/ProjectStatus";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import { Activity, Users, Clock, Target, AlertTriangle } from "lucide-react";

const DailyManagement = () => {
  const dailyMetrics = [
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
      icon: Target,
      variant: "warning" as const
    },
    {
      title: "Days Without LTI",
      value: "43",
      subtitle: "Days",
      icon: Clock,
      variant: "success" as const
    },
    {
      title: "Total Employees",
      value: "000",
      subtitle: "Active",
      icon: Users,
      variant: "default" as const
    }
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Daily Management
        </h1>
        <p className="text-muted-foreground">
          Daily HSE performance tracking and management
        </p>
      </div>

      <div className="space-y-8">
        <ProjectStatus />
        
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">HSE Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailyMetrics.map((metric, index) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Leading vs Lagging Indicators">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Leading Indicator</span>
                <span className="font-bold text-success">00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Lagging Indicator</span>
                <span className="font-bold text-destructive">00</span>
              </div>
            </div>
          </ChartCard>

          <ChartCard title="SCRs Status">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Open</span>
                <span className="font-bold text-warning">00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Closed</span>
                <span className="font-bold text-success">00</span>
              </div>
            </div>
          </ChartCard>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Extended HSE Metrics</h3>
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4">
              {["LTIFR", "LTISR", "ART", "EMERGENCY", "LEADERSHIP", "ENV. & SUS.", "TRAINING", "AWARDS", "CAMPAIGNS"].map((item, index) => (
                <div key={index} className="text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-1">{item}</p>
                  <p className="text-xl font-bold text-foreground">00</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DailyManagement;