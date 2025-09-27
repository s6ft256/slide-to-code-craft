import Layout from "@/components/Layout";
import ProjectStatus from "@/components/ProjectStatus";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import InductionForm from "@/components/InductionForm";
import MasterRegisterForm from "@/components/MasterRegisterForm";
import MasterRegisterRecords from "@/components/MasterRegisterRecords";
import InjuryDetailsForm from "@/components/InjuryDetailsForm";
import InjuryDetailsRecords from "@/components/InjuryDetailsRecords";
import ObservationTrackerForm from "@/components/ObservationTrackerForm";
import ObservationTrackerRecords from "@/components/ObservationTrackerRecords";
import CNRTrackerForm from "@/components/CNRTrackerForm";
import CNRTrackerRecords from "@/components/CNRTrackerRecords";
import { Activity, Users, Clock, Target, AlertTriangle } from "lucide-react";
import { useState } from "react";

const DailyManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [masterTab, setMasterTab] = useState("records");
  const [injuryTab, setInjuryTab] = useState("records");
  const [observationTab, setObservationTab] = useState("records");
  const [cnrTab, setCnrTab] = useState("records");
  const dailyMetrics = [
    {
      title: "Leading Indicators",
      value: "00",
      subtitle: "Incidents",
      icon: Activity,
      variant: "success" as const
    },
    {
      title: "Training Average",
      value: "64.1%",
      subtitle: "Completion",
      icon: Target,
      variant: "warning" as const
    },
    {
      title: "Days Without LTI",
      value: "43",
      subtitle: "Days",
      icon: Clock,
      variant: "success" as const
    },
    {
      title: "Total Employees",
      value: "000",
      subtitle: "Active",
      icon: Users,
      variant: "default" as const
    }
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Daily Management
        </h1>
        <p className="text-muted-foreground">
          Daily HSE performance tracking and management
        </p>
      </div>

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
        >CNR Tracker</button>
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
                {["LTIFR", "LTISR", "ART", "EMERGENCY", "LEADERSHIP", "ENV. & SUS.", "TRAINING", "AWARDS", "CAMPAIGNS"].map((item, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-1">{item}</p>
                    <p className="text-xl font-bold text-foreground">00</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "observation-tracker" && (
        <div className="mt-8">
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded ${observationTab === "records" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
              onClick={() => setObservationTab("records")}
            >Records</button>
            <button
              className={`px-4 py-2 rounded ${observationTab === "add" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
              onClick={() => setObservationTab("add")}
            >Add New Record</button>
          </div>
          {observationTab === "records" && <ObservationTrackerRecords />}
          {observationTab === "add" && (
            <>
              <h3 className="text-lg font-semibold text-foreground mb-4">Observation Tracker (Manual Data Entry)</h3>
              <ObservationTrackerForm />
            </>
          )}
        </div>
      )}
      {activeTab === "master-register" && (
        <div className="mt-8">
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded ${masterTab === "records" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
              onClick={() => setMasterTab("records")}
            >Records</button>
            <button
              className={`px-4 py-2 rounded ${masterTab === "add" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
              onClick={() => setMasterTab("add")}
            >Add New Record</button>
          </div>
          {masterTab === "records" && <MasterRegisterRecords />}
          {masterTab === "add" && (
            <>
              <h3 className="text-lg font-semibold text-foreground mb-4">MASTER REGISTER (Manual Data Entry)</h3>
              <MasterRegisterForm />
            </>
          )}
        </div>
      )}
      {activeTab === "injury-details" && (
        <div className="mt-8">
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded ${injuryTab === "records" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
              onClick={() => setInjuryTab("records")}
            >Records</button>
            <button
              className={`px-4 py-2 rounded ${injuryTab === "add" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
              onClick={() => setInjuryTab("add")}
            >Add New Record</button>
          </div>
          {injuryTab === "records" && <InjuryDetailsRecords />}
          {injuryTab === "add" && (
            <>
              <h3 className="text-lg font-semibold text-foreground mb-4">Injury Details (Manual Data Entry)</h3>
              <InjuryDetailsForm />
            </>
          )}
        </div>
      )}
      {activeTab === "inductions" && (
        <InductionForm />
      )}
      {activeTab === "cnr-tracker" && (
        <div className="mt-8">
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded ${cnrTab === "records" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
              onClick={() => setCnrTab("records")}
            >Records</button>
            <button
              className={`px-4 py-2 rounded ${cnrTab === "add" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
              onClick={() => setCnrTab("add")}
            >Add New Record</button>
          </div>
          {cnrTab === "records" && <CNRTrackerRecords />}
          {cnrTab === "add" && (
            <>
              <h3 className="text-lg font-semibold text-foreground mb-4">CNR Tracker (Manual Data Entry)</h3>
              <CNRTrackerForm />
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default DailyManagement;