import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import HSEViolationRecords from "@/components/HSEViolationRecords";
import { XCircle, AlertTriangle, FileX, Users, TrendingDown, Eye } from "lucide-react";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const HSEViolations = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { metrics, loading, error } = useDashboardMetrics();

  const totalViolations = (metrics?.totalNCRs ?? 0) + (metrics?.observationRecords ?? 0);
  const resolvedViolations = (metrics?.closedNCRs ?? 0) + (metrics?.closedObservations ?? 0);
  const resolutionRate = totalViolations > 0 ? Math.round((resolvedViolations / totalViolations) * 100) : 0;

  const violationMetrics = [
    {
      title: "Total Violations",
      value: totalViolations.toString().padStart(2, '0'),
      subtitle: "This Month",
      icon: XCircle,
      variant: totalViolations > 0 ? "destructive" as const : "success" as const
    },
    {
      title: "Critical Violations",
      value: (metrics?.openNCRs ?? 0).toString().padStart(2, '0'),
      subtitle: "Immediate Action",
      icon: AlertTriangle,
      variant: (metrics?.openNCRs ?? 0) > 0 ? "destructive" as const : "success" as const
    },
    {
      title: "Resolved",
      value: resolvedViolations.toString().padStart(2, '0'),
      subtitle: `${resolutionRate}% Closed`,
      icon: FileX,
      variant: resolutionRate >= 75 ? "success" as const : "warning" as const
    },
    {
      title: "Personnel Involved",
      value: (metrics?.totalEmployees ?? 0).toString().padStart(2, '0'),
      subtitle: "Require Training",
      icon: Users,
      variant: "warning" as const
    }
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <XCircle className="h-6 w-6" />
          HSE VIOLATIONS
        </h1>
        <p className="text-muted-foreground">
          Safety violation tracking and management system
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex w-full gap-2 p-1">
          <TabsTrigger value="overview" className="flex items-center gap-2 whitespace-nowrap">
            <AlertTriangle className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-2 whitespace-nowrap">
            <Eye className="h-4 w-4" />
            HSE Violation Records
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Violation Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {violationMetrics.map((metric, index) => (
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
          <ChartCard title="Violation Categories">
            <div className="space-y-3">
              {[
                { category: "Safety Equipment", count: (metrics?.totalIncidents ?? 0).toString().padStart(2, '0'), severity: (metrics?.totalIncidents ?? 0) > 5 ? "High" : "Medium" },
                { category: "Procedure Compliance", count: (metrics?.openNCRs ?? 0).toString().padStart(2, '0'), severity: (metrics?.openNCRs ?? 0) > 0 ? "High" : "Low" },
                { category: "Environmental", count: (metrics?.observationRecords ?? 0).toString().padStart(2, '0'), severity: "Low" },
                { category: "Documentation", count: (metrics?.reportsSubmitted ?? 0).toString().padStart(2, '0'), severity: "Medium" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-muted-foreground">{item.category}</span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded ${
                      item.severity === 'High' ? 'bg-destructive text-destructive-foreground' :
                      item.severity === 'Medium' ? 'bg-warning text-warning-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                  <span className="font-bold text-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Monthly Trend">
            <div className="h-32 flex items-center justify-center">
              <div className="text-center">
                <TrendingDown className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="text-lg font-bold text-success">↓ {resolutionRate}%</div>
                <div className="text-sm text-muted-foreground">Violations Reduced</div>
              </div>
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartCard title="Resolution Status">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Open</span>
                <span className="font-bold text-destructive">{(metrics?.openNCRs ?? 0) + (metrics?.openObservations ?? 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">In Progress</span>
                <span className="font-bold text-warning">{Math.floor(totalViolations * 0.3)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Closed</span>
                <span className="font-bold text-success">{resolvedViolations}</span>
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Average Resolution Time">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">4.2</div>
              <div className="text-sm text-muted-foreground">Days Average</div>
              <div className="text-xs text-success mt-1">Improving</div>
            </div>
          </ChartCard>

          <ChartCard title="Corrective Actions">
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-2">{resolvedViolations}</div>
              <div className="text-sm text-muted-foreground">Actions Completed</div>
              <div className="text-xs text-muted-foreground mt-1">{resolutionRate}% Success Rate</div>
            </div>
          </ChartCard>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Violations</h3>
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <div className="space-y-4">
              {[
                { id: "V001", type: "PPE Violation", date: "2024-03-15", status: "Resolved", severity: "Medium" },
                { id: "V002", type: "Procedure Non-compliance", date: "2024-03-14", status: "Open", severity: "High" },
                { id: "V003", type: "Environmental Breach", date: "2024-03-12", status: "In Progress", severity: "Low" },
              ].map((violation, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground">{violation.id}</span>
                    <span className="text-sm text-muted-foreground">{violation.type}</span>
                    <span className="text-xs text-muted-foreground">{violation.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      violation.severity === 'High' ? 'bg-destructive text-destructive-foreground' :
                      violation.severity === 'Medium' ? 'bg-warning text-warning-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {violation.severity}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      violation.status === 'Resolved' ? 'bg-success text-success-foreground' :
                      violation.status === 'Open' ? 'bg-destructive text-destructive-foreground' :
                      'bg-warning text-warning-foreground'
                    }`}>
                      {violation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="records" className="space-y-6">
        <HSEViolationRecords />
      </TabsContent>
    </Tabs>
    </Layout>
  );
};

export default HSEViolations;