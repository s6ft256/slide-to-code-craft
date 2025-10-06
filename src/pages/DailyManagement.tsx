import Layout from "@/components/layout/Layout";
import ProjectStatus from "@/components/charts/ProjectStatus";
import MetricCard from "@/components/charts/MetricCard";
import ChartCard from "@/components/charts/ChartCard";
import MasterRegisterRecords from "@/components/records/MasterRegisterRecords";
import InjuryDetailsRecords from "@/components/records/InjuryDetailsRecords";

import { Activity, Users, Clock, Target, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import ObservationTrackerRecords from "@/components/records/ObservationTrackerRecords";
import NCRRecords from "@/components/records/NCRRecords";
import TrainingRecords from "@/components/records/TrainingRecords";
import TrainingCompetencyRecords from "@/components/records/TrainingCompetencyRecords";
import EventRecords from "@/components/records/EventRecords";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { calculateHSEMetrics, HSEMetrics } from "@/lib/hseMetrics";

const DailyManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [hseMetrics, setHseMetrics] = useState<HSEMetrics>({
    LTIFR: 0,
    LTISR: 0,
    ART: 0,
    EMERGENCY: 0,
    LEADERSHIP: 0,
    ENVIRONMENT_SUSTAINABILITY: 0,
    TRAINING: 0,
    AWARDS: 0,
    CAMPAIGNS: 0,
  });

  const { metrics, loading, error } = useDashboardMetrics();

  // Calculate HSE metrics on component mount and when localStorage changes
  useEffect(() => {
    const updateMetrics = () => {
      const calculatedMetrics = calculateHSEMetrics();
      setHseMetrics(calculatedMetrics);
    };

    updateMetrics();

    // Listen for localStorage changes from form submissions
    const handleStorageChange = (e: CustomEvent) => {
      if (e.detail?.key && [
        'injury_details',
        'incident_report',
        'training_records',
        'induction_records',
        'training_competency_register',
        'event_records',
        'observation_tracker',
        'ncr_register'
      ].includes(e.detail.key)) {
        updateMetrics();
      }
    };

    window.addEventListener('localStorageUpdate', handleStorageChange as EventListener);

    return () => {
      window.removeEventListener('localStorageUpdate', handleStorageChange as EventListener);
    };
  }, []);

  const dailyMetrics = [
    {
      title: "Leading Indicators",
      value: (metrics?.leadingIndicators ?? 0).toString().padStart(2, '0'),
      subtitle: "Incidents",
      icon: Activity,
      variant: ((metrics?.leadingIndicators ?? 0) === 0 ? "success" : "warning") as "success" | "warning"
    },
    {
      title: "Training Average",
      value: `${Math.round(metrics?.trainingAverage ?? 0)}%`,
      subtitle: "Completion",
      icon: Target,
      variant: ((metrics?.trainingAverage ?? 0) >= 80 ? "success" : "warning") as "success" | "warning"
    },
    {
      title: "Days Without LTI",
      value: (metrics?.daysWithoutLTI ?? 0).toString(),
      subtitle: "Days",
      icon: Clock,
      variant: ((metrics?.daysWithoutLTI ?? 0) > 30 ? "success" : "warning") as "success" | "warning"
    },
    {
      title: "Total Employees",
      value: (metrics?.totalEmployees ?? 0).toString().padStart(3, '0'),
      subtitle: "Active",
      icon: Users,
      variant: "default" as const
    }
  ];

  return (
    <Layout>

      <div className="mb-4 flex gap-2">
        <button
          className={`px-4 py-2 rounded ${activeTab === "dashboard" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
          onClick={() => setActiveTab("dashboard")}
        >Dashboard</button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "observation-tracker" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
          onClick={() => setActiveTab("observation-tracker")}
        >Observation Tracker</button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "master-register" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
          onClick={() => setActiveTab("master-register")}
        >MASTER REGISTER</button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "injury-details" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
          onClick={() => setActiveTab("injury-details")}
        >Injury Details</button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "inductions" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
          onClick={() => setActiveTab("inductions")}
        >Inductions</button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "cnr-tracker" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
          onClick={() => setActiveTab("cnr-tracker")}
        >NCR Tracker</button>
      </div>

      {activeTab === "dashboard" && (
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
                {[
                  { label: "LTIFR", value: hseMetrics.LTIFR.toFixed(2) },
                  { label: "LTISR", value: hseMetrics.LTISR.toFixed(2) },
                  { label: "ART", value: hseMetrics.ART.toFixed(2) },
                  { label: "EMERGENCY", value: hseMetrics.EMERGENCY.toString() },
                  { label: "LEADERSHIP", value: hseMetrics.LEADERSHIP.toString() },
                  { label: "ENV. & SUS.", value: hseMetrics.ENVIRONMENT_SUSTAINABILITY.toString() },
                  { label: "TRAINING", value: hseMetrics.TRAINING.toString() },
                  { label: "AWARDS", value: hseMetrics.AWARDS.toString() },
                  { label: "CAMPAIGNS", value: hseMetrics.CAMPAIGNS.toString() }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "observation-tracker" && (
        <div className="mt-8">
          <ObservationTrackerRecords />
        </div>
      )}
      {activeTab === "master-register" && (
        <div className="mt-8">
          <MasterRegisterRecords />
        </div>
      )}
      {activeTab === "injury-details" && (
        <div className="mt-8">
          <InjuryDetailsRecords />
        </div>
      )}
      {activeTab === "inductions" && (
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Training Records</h3>
            <TrainingRecords />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Training & Competency Register</h3>
            <TrainingCompetencyRecords />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Events Records</h3>
            <EventRecords />
          </div>
        </div>
      )}
      {activeTab === "cnr-tracker" && (
        <div className="mt-8">
          <NCRRecords />
        </div>
      )}
    </Layout>
  );
};

export default DailyManagement;