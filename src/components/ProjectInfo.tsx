import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Users, Target, TrendingUp, Shield, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { AddProjectInfoForm } from "./AddProjectInfoForm";

interface ProjectData {
  projectCode: string;
  projectName?: string;
  partnerName?: string;
  client?: string;
  consultant?: string;
  projectStartingDate?: Date;
  projectProgress?: string;
  projectDuration?: string;
  elapsedTime?: string;
  timeToCompletion?: string;
  srProjectManager?: string;
  hseManager?: string;
  projectManager?: string;
  technicalManager?: string;
  qaQcManager?: string;
  ltiDays?: string;
  safeManhours?: string;
  daysWithoutLTI?: string;
}

export function ProjectInfo({ projectCode }: ProjectInfoProps) {
  const [showForm, setShowForm] = useState(false);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjectData();
  }, [projectCode]);

  const loadProjectData = useCallback(() => {
    setLoading(true);
    try {
      const storedData = localStorage.getItem(`project_info_${projectCode}`);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        // Convert date string back to Date object for display
        if (parsed.projectStartingDate) {
          parsed.projectStartingDate = new Date(parsed.projectStartingDate);
        }
        setProjectData(parsed);
      } else {
        // Default data for demonstration
        setProjectData({
          projectCode,
          projectName: projectCode === "TG-2134" ? "Baniyas West" : "Project Name",
          partnerName: projectCode === "TG-2134" ? "NA" : "",
          client: projectCode === "TG-2134" ? "Abu Dhabi Housing Authority" : "",
          consultant: projectCode === "TG-2134" ? "Pioneer Engineering Consultancy" : "",
          projectStartingDate: projectCode === "TG-2134" ? new Date("2023-04-25") : undefined,
          projectProgress: projectCode === "TG-2134" ? "12.10" : "",
          projectDuration: projectCode === "TG-2134" ? "1462" : "",
          elapsedTime: projectCode === "TG-2134" ? "893" : "",
          timeToCompletion: projectCode === "TG-2134" ? "569" : "",
          srProjectManager: projectCode === "TG-2134" ? "Tareq Salah" : "",
          hseManager: projectCode === "TG-2134" ? "Usman Zahid" : "",
          projectManager: projectCode === "TG-2134" ? "Ahmed Ahmed Mohamed Ahmed" : "",
          technicalManager: projectCode === "TG-2134" ? "Ahmed Mohamed Kamal" : "",
          qaQcManager: projectCode === "TG-2134" ? "Mohamed Aboueluser" : "",
          ltiDays: projectCode === "TG-2134" ? "1" : "",
          safeManhours: projectCode === "TG-2134" ? "6580" : "",
          daysWithoutLTI: projectCode === "TG-2134" ? "45" : ""
        });
      }
    } catch (error) {
      console.error('Error loading project data:', error);
      setProjectData(null);
    } finally {
      setLoading(false);
    }
  }, [projectCode]);

  useEffect(() => {
    loadProjectData();
  }, [loadProjectData]);

  const handleFormSave = () => {
    setShowForm(false);
    loadProjectData(); // Reload data after saving
  };

  if (showForm) {
    return (
      <AddProjectInfoForm
        onSave={handleFormSave}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Loading project information...</div>
        </CardContent>
      </Card>
    );
  }

  if (!projectData) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="text-muted-foreground">No project information available</div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project Info
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Project Information
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-sm">
                {projectCode}
              </Badge>
              <Button onClick={() => setShowForm(true)} size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Info
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Stakeholder */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Project Stakeholder</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Project Name:</label>
                <p className="text-foreground font-medium">{projectData.projectName || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Partner Name (if any):</label>
                <p className="text-foreground">{projectData.partnerName || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Client:</label>
                <p className="text-foreground">{projectData.client || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Consultant:</label>
                <p className="text-foreground">{projectData.consultant || 'Not specified'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Project Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Project Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Project Starting Date:</label>
                <p className="text-foreground font-medium">
                  {projectData.projectStartingDate
                    ? projectData.projectStartingDate.toLocaleDateString()
                    : 'Not specified'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Project Progress %:</label>
                <p className="text-foreground font-medium text-green-600">
                  {projectData.projectProgress ? `${projectData.projectProgress}%` : 'Not specified'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Project Duration (days):</label>
                <p className="text-foreground">{projectData.projectDuration || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Elapsed Time (days):</label>
                <p className="text-foreground">{projectData.elapsedTime || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Time to Completion (days):</label>
                <p className="text-foreground">{projectData.timeToCompletion || 'Not specified'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Project Key Personnel */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Project Key Personnel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Sr. Project Manager:</label>
                <p className="text-foreground font-medium">{projectData.srProjectManager || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">HSE Manager:</label>
                <p className="text-foreground font-medium">{projectData.hseManager || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Project Manager:</label>
                <p className="text-foreground font-medium">{projectData.projectManager || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Technical Manager:</label>
                <p className="text-foreground font-medium">{projectData.technicalManager || 'Not specified'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">QA/QC Manager:</label>
                <p className="text-foreground font-medium">{projectData.qaQcManager || 'Not specified'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Safety Metrics */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Safety Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Number of days to LTIs (set by local authority):</label>
                <p className="text-foreground font-medium text-orange-600">{projectData.ltiDays || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Safe Manhours without LTI:</label>
                <p className="text-foreground font-medium text-green-600">
                  {projectData.safeManhours ? projectData.safeManhours.toLocaleString() : 'Not specified'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Days Without LTI:</label>
                <p className="text-foreground font-medium text-blue-600">{projectData.daysWithoutLTI || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}