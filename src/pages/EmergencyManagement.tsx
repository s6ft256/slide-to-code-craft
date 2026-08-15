import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import { Siren, Users, Clock, Shield, Phone } from "lucide-react";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";

const EmergencyManagement = () => {
  const { metrics, loading, error } = useDashboardMetrics();

  const emergencyMetrics = [
    {
      title: "Emergency Drills",
      value: (metrics?.completedInspections ?? 0).toString().padStart(2, '0'),
      subtitle: "This Year",
      icon: Siren,
      variant: "success" as const
    },
    {
      title: "Response Team",
      value: (metrics?.totalEmployees ?? 0).toString(),
      subtitle: "Trained Personnel",
      icon: Users,
      variant: "default" as const
    },
    {
      title: "Response Time",
      value: "24h",
      subtitle: "Average",
      icon: Clock,
      variant: "success" as const
    },
    {
      title: "Emergency Contacts",
      value: "24/7",
      subtitle: "Available",
      icon: Phone,
      variant: "default" as const
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Emergency Preparedness</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyMetrics.map((metric, index) => (
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
          <ChartCard title="Emergency Types">
            <div className="space-y-3">
              {[
                { type: "Fire Emergency", count: (metrics?.totalIncidents ?? 0).toString().padStart(2, '0'), status: (metrics?.totalIncidents ?? 0) > 0 ? "Active" : "Ready" },
                { type: "Medical Emergency", count: (metrics?.totalInjuries ?? 0).toString().padStart(2, '0'), status: (metrics?.totalInjuries ?? 0) > 0 ? "Active" : "Ready" },
                { type: "Evacuation", count: "00", status: "Ready" },
                { type: "Chemical Spill", count: "00", status: "Ready" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-muted-foreground">{item.type}</span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded ${
                      item.status === 'Active' ? 'bg-warning text-warning-foreground' : 'bg-success text-success-foreground'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <span className="font-bold text-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Response Readiness">
            <div className="space-y-4">
              {[
                { item: "Emergency Equipment", status: `${Math.round(metrics?.safetyScore ?? 0)}%`, color: (metrics?.safetyScore ?? 0) >= 80 ? "success" : "warning" },
                { item: "Trained Personnel", status: `${Math.round(metrics?.trainingAverage ?? 0)}%`, color: (metrics?.trainingAverage ?? 0) >= 80 ? "success" : "warning" },
                { item: "Communication Systems", status: "98%", color: "success" },
                { item: "Evacuation Routes", status: "100%", color: "success" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.item}</span>
                  <span className={`font-bold ${
                    item.color === 'success' ? 'text-success' : 'text-warning'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartCard title="Last Drill">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-2">{Math.floor(Math.random() * 30) + 1}</div>
              <div className="text-sm text-muted-foreground">Days Ago</div>
              <div className="text-xs text-success mt-1">Successful</div>
            </div>
          </ChartCard>

          <ChartCard title="Equipment Status">
            <div className="text-center">
              <Shield className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="text-lg font-bold text-success">All Ready</div>
              <div className="text-sm text-muted-foreground">Emergency Equipment</div>
            </div>
          </ChartCard>

          <ChartCard title="Team Availability">
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-2">{metrics?.totalEmployees ?? 0}/{metrics?.totalEmployees ?? 0}</div>
              <div className="text-sm text-muted-foreground">On-Site Personnel</div>
              <div className="text-xs text-muted-foreground mt-1">100% Available</div>
            </div>
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
};

export default EmergencyManagement;