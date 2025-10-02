import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/daily-management" element={<DailyManagement />} />
          <Route path="/statistic-reports" element={<StatisticReports />} />
          <Route path="/incident-management" element={<IncidentManagement />} />
          <Route path="/hse-audit" element={<HSEAudit />} />
          <Route path="/hse-inspection" element={<HSEInspection />} />
          <Route path="/emergency-management" element={<EmergencyManagement />} />
          <Route path="/hse-violations" element={<HSEViolations />} />
          <Route path="/library" element={<Library />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
