import Layout from "@/components/Layout";
import HSEMetricsGrid from "@/components/HSEMetricsGrid";
import LTIChart from "@/components/LTIChart";

const Index = () => {
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
      <div className="space-y-8">
        <HSEMetricsGrid />
        <LTIChart />
      </div>
    </Layout>
  );
};

export default Index;
