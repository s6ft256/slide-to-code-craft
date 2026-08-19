import Layout from "@/components/Layout";
import HSEMetricsGrid from "@/components/HSEMetricsGrid";
import LTIChart from "@/components/LTIChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp, Calendar, Keyboard, Info, Building2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useDashboardMetrics, TimePeriod } from "@/hooks/use-dashboard-metrics";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProjectInfo } from "@/components/ProjectInfo";
import { useProject } from "@/contexts/ProjectContext";
import { ProjectsGrid } from "@/components/ProjectsGrid";

const Index = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeTab, setActiveTab] = useState<'week' | 'month' | 'projects' | 'project-info'>('week');
  
  // Compute current period based on active tab
  const currentPeriod: TimePeriod = activeTab === 'week' ? 'week' : activeTab === 'month' ? 'month' : 'month';
  
  const { metrics, loading, error, refreshMetrics } = useDashboardMetrics(currentPeriod);
  const { toast } = useToast();
  const { selectedProject, userProjectCode } = useProject();

  const handleTabChange = useCallback(async (value: 'week' | 'month' | 'projects' | 'project-info') => {
    // Prevent multiple rapid clicks
    if (isTransitioning) return;
    
    // Prevent switching to projects tab if user has a specific project
    if (userProjectCode && value === 'projects') {
      toast({
        title: 'Access Restricted',
        description: 'You only have access to your assigned project',
        variant: 'destructive',
      });
      return;
    }
    
    setIsTransitioning(true);
    
    try {
      // Visual feedback - show loading state
      setActiveTab(value);
      
      // Save user preference
      localStorage.setItem('hse-dashboard-active-tab', value);
      
      // Force data refresh for the new period (only for week/month tabs)
      if (value === 'week' || value === 'month') {
        await refreshMetrics(value as TimePeriod);
        
        // Analytics tracking (could be replaced with actual analytics service)
        console.log(`Dashboard view changed to: ${value === 'week' ? 'Weekly' : 'Monthly'}`);
        
        // Show success feedback
        toast({
          title: `Switched to ${value === 'week' ? 'Weekly' : 'Monthly'} View`,
          description: `Showing data for the last ${value === 'week' ? '7 days' : '30 days'}`,
          duration: 2000,
        });
      }
      
      // Add a small delay for smooth transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      
    } catch (error) {
      console.error('Error switching tab:', error);
      toast({
        title: "Error",
        description: "Failed to load data for the selected tab",
        variant: "destructive",
        duration: 3000,
      });
      setIsTransitioning(false);
    }
  }, [isTransitioning, refreshMetrics, toast, userProjectCode]);

  const handleRefresh = useCallback(async () => {
    try {
      setIsTransitioning(true);
      await refreshMetrics(currentPeriod);
      toast({
        title: "Data Refreshed",
        description: "Dashboard data has been updated",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Could not refresh dashboard data",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [currentPeriod, refreshMetrics, toast]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Alt + W for Week view, Alt + M for Month view, Alt + R for refresh
      if (event.altKey) {
        switch (event.key.toLowerCase()) {
          case 'w':
            event.preventDefault();
            handleTabChange('week');
            break;
          case 'm':
            event.preventDefault();
            handleTabChange('month');
            break;
          case 'p':
            // Only allow projects tab if user doesn't have a specific project
            if (!userProjectCode) {
              event.preventDefault();
              handleTabChange('projects');
            }
            break;
          case 'r':
            event.preventDefault();
            handleRefresh();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleTabChange, handleRefresh, userProjectCode]); // Include the callback dependencies

  return (
    <TooltipProvider>
      <Layout>
        <div className="mb-6">
          <div className="flex justify-end items-start">
            <div className="flex gap-2 shrink-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Keyboard className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    <div><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Alt + W</kbd> Week View</div>
                    <div><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Alt + M</kbd> Month View</div>
                    <div><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Alt + R</kbd> Refresh</div>
                  </div>
                </TooltipContent>
              </Tooltip>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isTransitioning || loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isTransitioning ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl gap-4">
          <TabsTrigger 
            value="week"
            disabled={isTransitioning}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-primary/10 disabled:opacity-50"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Week View
            {activeTab === 'week' && (
              <TrendingUp className="h-3 w-3 ml-2 opacity-70" />
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="month"
            disabled={isTransitioning}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-primary/10 disabled:opacity-50"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Month View
            {activeTab === 'month' && (
              <TrendingUp className="h-3 w-3 ml-2 opacity-70" />
            )}
          </TabsTrigger>
          {!userProjectCode && (
            <TabsTrigger 
              value="projects"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-primary/10"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
          )}
          <TabsTrigger 
            value="project-info"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-primary/10"
          >
            <Info className="h-4 w-4 mr-2" />
            Project Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="space-y-6">
          <div className="space-y-8">
            <HSEMetricsGrid metrics={metrics} loading={loading} error={error} period="week" />
            <LTIChart />
          </div>
        </TabsContent>

        <TabsContent value="month" className="space-y-6">
          <div className="space-y-8">
            <HSEMetricsGrid metrics={metrics} loading={loading} error={error} period="month" />
            <LTIChart />
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <ProjectsGrid />
        </TabsContent>

        <TabsContent value="project-info" className="space-y-6">
          <ProjectInfo projectCode={selectedProject.code} />
        </TabsContent>
      </Tabs>
    </Layout>
    </TooltipProvider>
  );
};

export default Index;
