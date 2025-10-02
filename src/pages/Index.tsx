import Layout from "@/components/Layout";
import HSEMetricsGrid from "@/components/HSEMetricsGrid";
import LTIChart from "@/components/LTIChart";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <HSEMetricsGrid />
        <LTIChart />
      </div>
    </Layout>
  );
};

export default Index;
