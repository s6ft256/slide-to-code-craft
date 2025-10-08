import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import { Eye, CheckCircle, AlertCircle, XCircle, Calendar } from "lucide-react";

const HSEInspection = () => {
  const inspectionMetrics = [
    {
      title: "Scheduled Inspections",
      value: "24",
      subtitle: "This Month",
      icon: Calendar,
      variant: "default" as const
    },
    {
      title: "Completed",
      value: "18",
      subtitle: "75% Complete",
      icon: CheckCircle,
      variant: "success" as const
    },
    {
      title: "Pending",
      value: "06",
      subtitle: "25% Remaining",
      icon: AlertCircle,
      variant: "warning" as const
    },
    {
      title: "Failed Items",
      value: "03",
      subtitle: "Require Action",
      icon: XCircle,
      variant: "destructive" as const
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Inspection Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {inspectionMetrics.map((metric, index) => (
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
          <ChartCard title="Inspection Areas">
            <div className="space-y-3">
              {[
                { area: "Equipment Safety", score: "92%" },
                { area: "Work Environment", score: "88%" },
                { area: "Emergency Procedures", score: "95%" },
                { area: "Personal Protective Equipment", score: "90%" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.area}</span>
                  <span className="font-bold text-success">{item.score}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Monthly Inspection Trend">
            <div className="space-y-3">
              {[
                { month: "January", count: "22" },
                { month: "February", count: "25" },
                { month: "March", count: "24" },
                { month: "April", count: "28" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.month}</span>
                  <span className="font-bold text-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartCard title="Pass Rate">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">87.5%</div>
              <div className="text-sm text-muted-foreground">Overall Pass Rate</div>
            </div>
          </ChartCard>

          <ChartCard title="Critical Findings">
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive mb-2">02</div>
              <div className="text-sm text-muted-foreground">Require Immediate Action</div>
            </div>
          </ChartCard>

          <ChartCard title="Average Score">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">8.7</div>
              <div className="text-sm text-muted-foreground">Out of 10</div>
            </div>
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
};

export default HSEInspection;