import Layout from "@/components/layout/Layout";
import InductionForm from "@/components/forms/InductionForm";
import MasterRegisterForm from "@/components/forms/MasterRegisterForm";
import InjuryDetailsForm from "@/components/forms/InjuryDetailsForm";
import ObservationTrackerForm from "@/components/forms/ObservationTrackerForm";
import NCRForm from "@/components/forms/NCRForm";
import IncidentReportForm from "@/components/forms/IncidentReportForm";
import { AddProjectInfoForm } from "@/components/forms/AddProjectInfoForm";
import HSEViolationForm from "@/components/forms/HSEViolationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, FileText, Users, AlertTriangle, Eye, XCircle, Shield, Building2 } from "lucide-react";

const DataEntry = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Database className="h-6 w-6" />
          DATA ENTRY
        </h1>
        <p className="text-muted-foreground">
          Manual data entry forms for HSE management and compliance tracking
        </p>
      </div>

      <Tabs defaultValue="inductions" className="space-y-6">
        <TabsList className="flex w-full overflow-x-auto gap-2 p-1">
          <TabsTrigger value="inductions" className="flex items-center gap-2 whitespace-nowrap">
            <Users className="h-4 w-4" />
            Inductions
          </TabsTrigger>
          <TabsTrigger value="project-info" className="flex items-center gap-2 whitespace-nowrap">
            <Building2 className="h-4 w-4" />
            Project Info
          </TabsTrigger>
          <TabsTrigger value="master-register" className="flex items-center gap-2 whitespace-nowrap">
            <FileText className="h-4 w-4" />
            Master Register
          </TabsTrigger>
          <TabsTrigger value="injury-details" className="flex items-center gap-2 whitespace-nowrap">
            <AlertTriangle className="h-4 w-4" />
            Injury Details
          </TabsTrigger>
          <TabsTrigger value="observation-tracker" className="flex items-center gap-2 whitespace-nowrap">
            <Eye className="h-4 w-4" />
            Observation Tracker
          </TabsTrigger>
          <TabsTrigger value="incident-management" className="flex items-center gap-2 whitespace-nowrap">
            <Shield className="h-4 w-4" />
            Incident Management
          </TabsTrigger>
          <TabsTrigger value="ncr-tracker" className="flex items-center gap-2 whitespace-nowrap">
            <XCircle className="h-4 w-4" />
            NCR Tracker
          </TabsTrigger>
          <TabsTrigger value="hse-violation" className="flex items-center gap-2 whitespace-nowrap">
            <Shield className="h-4 w-4" />
            HSE Violation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inductions" className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">Inductions (Manual Data Entry)</h3>
            <InductionForm />
          </div>
        </TabsContent>

        <TabsContent value="project-info" className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">Project Info (Manual Data Entry)</h3>
            <AddProjectInfoForm />
          </div>
        </TabsContent>

        <TabsContent value="master-register" className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">MASTER REGISTER (Manual Data Entry)</h3>
            <MasterRegisterForm />
          </div>
        </TabsContent>

        <TabsContent value="injury-details" className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">Injury Details (Manual Data Entry)</h3>
            <InjuryDetailsForm />
          </div>
        </TabsContent>

        <TabsContent value="observation-tracker" className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">Observation Tracker (Manual Data Entry)</h3>
            <ObservationTrackerForm onSuccess={() => {}} />
          </div>
        </TabsContent>

        <TabsContent value="incident-management" className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">Incident Management (Manual Data Entry)</h3>
            <IncidentReportForm onSuccess={() => {}} onCancel={() => {}} />
          </div>
        </TabsContent>

        <TabsContent value="ncr-tracker" className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">NCR Tracker (Manual Data Entry)</h3>
            <NCRForm onClose={() => {}} />
          </div>
        </TabsContent>

        <TabsContent value="hse-violation" className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">HSE Violation Form (Manual Data Entry)</h3>
            <HSEViolationForm />
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default DataEntry;