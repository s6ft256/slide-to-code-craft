import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import LTIChart from "@/components/LTIChart";
import IncidentReportForm from "@/components/IncidentReportForm";
import { AlertTriangle, FileText, Clock, Users, TrendingDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const IncidentManagement = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  
  const incidentMetrics = [
    {
      title: "Total Incidents",
      value: "00",
      subtitle: "This Month",
      icon: AlertTriangle,
      variant: "success" as const
    },
    {
      title: "Open Reports",
      value: "00",
      subtitle: "Pending",
      icon: FileText,
      variant: "warning" as const
    },
    {
      title: "Response Time",
      value: "2.5h",
      subtitle: "Average",
      icon: Clock,
      variant: "default" as const
    },
    {
      title: "Personnel Affected",
      value: "00",
      subtitle: "Current",
      icon: Users,
      variant: "success" as const
    }
  ];

  if (showReportForm) {
    return (
      <Layout>
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                New Incident Report
              </h1>
              <p className="text-muted-foreground">
                Fill out the incident report form with all required details
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowReportForm(false)}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
        <IncidentReportForm />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Incident Management
            </h1>
            <p className="text-muted-foreground">
              Track and manage safety incidents and near misses
            </p>
          </div>
          <Button 
            onClick={() => setShowReportForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Incident Report
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Incident Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {incidentMetrics.map((metric, index) => (
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

        <LTIChart />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Incident Types">
            <div className="space-y-3">
              {["Near Miss", "Minor Injury", "Property Damage", "Environmental"].map((type, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{type}</span>
                  <span className="font-bold text-foreground">0{index}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Monthly Trend">
            <div className="h-32 flex items-center justify-center">
              <div className="text-center">
                <TrendingDown className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="text-lg font-bold text-success">↓ 15%</div>
                <div className="text-sm text-muted-foreground">Incidents Reduced</div>
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Status Summary">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Under Investigation</span>
                <span className="font-bold text-warning">02</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Closed</span>
                <span className="font-bold text-success">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Corrective Actions</span>
                <span className="font-bold text-primary">08</span>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
};

export default IncidentManagement;