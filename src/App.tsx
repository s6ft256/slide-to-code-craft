import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Auth from "./pages/Auth";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <ProjectProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <HashRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/auth" element={<Auth />} />
                
                {/* Protected routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } />
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
                <Route path="/library" element={
                  <ProtectedRoute>
                    <Library />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </TooltipProvider>
        </ProjectProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
