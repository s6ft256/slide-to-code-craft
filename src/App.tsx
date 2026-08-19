import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import DailyManagement from "./pages/DailyManagement";
import StatisticReports from "./pages/StatisticReports";
import IncidentManagement from "./pages/IncidentManagement";
import HSEAudit from "./pages/HSEAudit";
import HSEInspection from "./pages/HSEInspection";
import EmergencyManagement from "./pages/EmergencyManagement";
import HSEViolations from "./pages/HSEViolations";
import NotFound from "./pages/NotFound";
import Library from "./pages/Library";
import DataEntry from "./pages/DataEntry";
import ProfileSettings from "./pages/ProfileSettings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

function ProjectProviderWrapper({ children }: { children: React.ReactNode }) {
  const { userProfile } = useAuth();
  return (
    <ProjectProvider userProjectCode={userProfile?.selected_project}>
      {children}
    </ProjectProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <ProjectProviderWrapper>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/dashboard" element={<Index />} />
                <Route path="/daily-management" element={
                  <ProtectedRoute>
                    <DailyManagement />
                  </ProtectedRoute>
                } />
                <Route path="/data-entry" element={
                  <ProtectedRoute>
                    <DataEntry />
                  </ProtectedRoute>
                } />
                <Route path="/statistic-reports" element={
                  <ProtectedRoute>
                    <StatisticReports />
                  </ProtectedRoute>
                } />
                <Route path="/incident-management" element={
                  <ProtectedRoute>
                    <IncidentManagement />
                  </ProtectedRoute>
                } />
                <Route path="/incident-management/new" element={
                  <ProtectedRoute>
                    <IncidentManagement />
                  </ProtectedRoute>
                } />
                <Route path="/hse-audit" element={
                  <ProtectedRoute>
                    <HSEAudit />
                  </ProtectedRoute>
                } />
                <Route path="/hse-inspection" element={
                  <ProtectedRoute>
                    <HSEInspection />
                  </ProtectedRoute>
                } />
                <Route path="/emergency-management" element={
                  <ProtectedRoute>
                    <EmergencyManagement />
                  </ProtectedRoute>
                } />
                <Route path="/hse-violations" element={
                  <ProtectedRoute>
                    <HSEViolations />
                  </ProtectedRoute>
                } />
                <Route path="/library" element={<Library />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfileSettings />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </TooltipProvider>
        </ProjectProviderWrapper>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
