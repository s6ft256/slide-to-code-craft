import Layout from "@/components/Layout";
import InductionForm from "@/components/InductionForm";
import MasterRegisterForm from "@/components/MasterRegisterForm";
import InjuryDetailsForm from "@/components/InjuryDetailsForm";
import ObservationTrackerForm from "@/components/ObservationTrackerForm";
import NCRForm from "@/components/NCRForm";
import IncidentReportForm from "@/components/IncidentReportForm";
import { AddProjectInfoForm } from "@/components/AddProjectInfoForm";
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

      <Tabs defaultValue="inductions" className="space-y-4 md:space-y-6">
        <div className="relative">
          <TabsList className="flex w-full overflow-x-auto gap-1 md:gap-2 p-1 h-auto flex-wrap md:flex-nowrap">
            <TabsTrigger value="inductions" className="flex items-center gap-1 md:gap-2 whitespace-nowrap text-xs md:text-sm px-2 md:px-4 py-2">
              <Users className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden xs:inline">Inductions</span>
              <span className="xs:hidden">Ind.</span>
            </TabsTrigger>
            <TabsTrigger value="project-info" className="flex items-center gap-1 md:gap-2 whitespace-nowrap text-xs md:text-sm px-2 md:px-4 py-2">
              <Building2 className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden xs:inline">Project Info</span>
              <span className="xs:hidden">Proj.</span>
            </TabsTrigger>
            <TabsTrigger value="master-register" className="flex items-center gap-1 md:gap-2 whitespace-nowrap text-xs md:text-sm px-2 md:px-4 py-2">
              <FileText className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Master Register</span>
              <span className="sm:hidden">Master</span>
            </TabsTrigger>
            <TabsTrigger value="injury-details" className="flex items-center gap-1 md:gap-2 whitespace-nowrap text-xs md:text-sm px-2 md:px-4 py-2">
              <AlertTriangle className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Injury Details</span>
              <span className="sm:hidden">Injury</span>
            </TabsTrigger>
            <TabsTrigger value="observation-tracker" className="flex items-center gap-1 md:gap-2 whitespace-nowrap text-xs md:text-sm px-2 md:px-4 py-2">
              <Eye className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Observation Tracker</span>
              <span className="sm:hidden">Obs.</span>
            </TabsTrigger>
            <TabsTrigger value="incident-management" className="flex items-center gap-1 md:gap-2 whitespace-nowrap text-xs md:text-sm px-2 md:px-4 py-2">
              <Shield className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Incident Mgmt.</span>
              <span className="sm:hidden">Inc.</span>
            </TabsTrigger>
            <TabsTrigger value="ncr-tracker" className="flex items-center gap-1 md:gap-2 whitespace-nowrap text-xs md:text-sm px-2 md:px-4 py-2">
              <XCircle className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">NCR Tracker</span>
              <span className="sm:hidden">NCR</span>
            </TabsTrigger>
          </TabsList>
        </div>

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
      </Tabs>
    </Layout>
  );
};

export default DataEntry;