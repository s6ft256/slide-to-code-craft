import Layout from "@/components/Layout";
import HSEMetricsGrid from "@/components/HSEMetricsGrid";
import LTIChart from "@/components/LTIChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useDashboardMetrics, TimePeriod } from "@/hooks/use-dashboard-metrics";

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('month');
  const { metrics, loading, error } = useDashboardMetrics(selectedPeriod);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          HSE Management Dashboard
        </h1>
        <p className="text-muted-foreground">
          Comprehensive health, safety, and environment monitoring for construction projects
        </p>
      </div>

      <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as TimePeriod)} className="mb-6">
        <TabsList>
          <TabsTrigger value="week">Week View</TabsTrigger>
          <TabsTrigger value="month">Month View</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-8">
        <HSEMetricsGrid metrics={metrics} loading={loading} error={error} />
        <LTIChart />
      </div>
    </Layout>
  );
};

export default Index;
