import HSEHeader from "@/components/HSEHeader";
import HSESidebar from "@/components/HSESidebar";
import HSEMetricsGrid from "@/components/HSEMetricsGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HSEHeader />
      <div className="flex">
        <HSESidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                HSE Management Dashboard
              </h1>
              <p className="text-muted-foreground">
                Comprehensive health, safety, and environment monitoring for construction projects
              </p>
            </div>
            <HSEMetricsGrid />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
