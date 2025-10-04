import Layout from "@/components/Layout";
import HSEMetricsGrid from "@/components/HSEMetricsGrid";
import LTIChart from "@/components/LTIChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useDashboardMetrics, TimePeriod } from "@/hooks/use-dashboard-metrics";

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('month');
  const { metrics, loading, error } = useDashboardMetrics(selectedPeriod);

  const handlePeriodChange = (value: string) => {
    const period = value as TimePeriod;
    setSelectedPeriod(period);
    
    // Log the period change for analytics/debugging
    console.log(`Switched to ${period === 'week' ? 'Week' : 'Month'} View`);
    
    // You could add additional functionality here like:
    // - Analytics tracking
    // - Data refresh
    // - UI feedback
  };

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

      <Tabs value={selectedPeriod} onValueChange={handlePeriodChange} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md gap-4">
          <TabsTrigger 
            value="week" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-primary/10"
          >
            Week View
          </TabsTrigger>
          <TabsTrigger 
            value="month" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-primary/10"
          >
            Month View
          </TabsTrigger>
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
