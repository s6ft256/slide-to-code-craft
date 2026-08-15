import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Save, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useProject } from "@/contexts/ProjectContext";

interface ProjectInfoData {
  projectCode: string;
  projectName: string;
  partnerName: string;
  client: string;
  consultant: string;
  projectStartingDate: Date | undefined;
  projectProgress: string;
  projectDuration: string;
  elapsedTime: string;
  timeToCompletion: string;
  srProjectManager: string;
  hseManager: string;
  projectManager: string;
  technicalManager: string;
  qaQcManager: string;
  ltiDays: string;
  safeManhours: string;
  daysWithoutLTI: string;
}

interface AddProjectInfoFormProps {
  onSave?: (data: ProjectInfoData) => void;
  onCancel?: () => void;
}

export function AddProjectInfoForm({ onSave, onCancel }: AddProjectInfoFormProps) {
  const { selectedProject, setSelectedProject } = useProject();
  const { toast } = useToast();

  const [formData, setFormData] = useState<ProjectInfoData>({
    projectCode: selectedProject.code,
    projectName: selectedProject.name,
    partnerName: "",
    client: "",
    consultant: "",
    projectStartingDate: undefined,
    projectProgress: "",
    projectDuration: "",
    elapsedTime: "",
    timeToCompletion: "",
    srProjectManager: "",
    hseManager: "",
    projectManager: "",
    technicalManager: "",
    qaQcManager: "",
    ltiDays: "",
    safeManhours: "",
    daysWithoutLTI: ""
  });

  const [loading, setLoading] = useState(false);

  // Load existing data if available
  useEffect(() => {
    const existingData = localStorage.getItem(`project_info_${formData.projectCode}`);
    if (existingData) {
      try {
        const parsed = JSON.parse(existingData);
        // Convert date string back to Date object
        if (parsed.projectStartingDate) {
          parsed.projectStartingDate = new Date(parsed.projectStartingDate);
        }
        setFormData({ ...formData, ...parsed });
      } catch (error) {
        console.error('Error loading project info:', error);
      }
    }
  }, [formData.projectCode]);

  const handleInputChange = (field: keyof ProjectInfoData, value: string | Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.projectCode || !formData.projectName || !formData.client) {
        throw new Error("Please fill in all required fields");
      }

      // Check if project exists in projects list, if not, add it
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const projectExists = existingProjects.some((p: any) => p.code === formData.projectCode);

      if (!projectExists) {
        // Add new project to projects list
        const newProject = {
          code: formData.projectCode,
          name: formData.projectName,
          type: "Project"
        };
        existingProjects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(existingProjects));

        // Update selected project in context
        setSelectedProject(newProject);

        toast({
          title: "New Project Added",
          description: `Project ${formData.projectCode} has been added to the projects list.`,
          duration: 3000,
        });
      }

      // Save project info to localStorage
      const dataToSave = {
        ...formData,
        projectStartingDate: formData.projectStartingDate?.toISOString()
      };

      localStorage.setItem(`project_info_${formData.projectCode}`, JSON.stringify(dataToSave));

      toast({
        title: "Project Info Saved",
        description: `Project information for ${formData.projectName} has been saved successfully.`,
        duration: 3000,
      });

      onSave?.(formData);
    } catch (error) {
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save project information",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Project Info
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Stakeholder */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Project Stakeholder</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectCode">Project Code</Label>
                <Input
                  id="projectCode"
                  value={formData.projectCode}
                  onChange={(e) => handleInputChange('projectCode', e.target.value)}
                  placeholder="Enter project code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name <span className="text-red-500">*</span></Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerName">Partner Name (if any)</Label>
                <Input
                  id="partnerName"
                  value={formData.partnerName}
                  onChange={(e) => handleInputChange('partnerName', e.target.value)}
                  placeholder="Enter partner name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client <span className="text-red-500">*</span></Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="consultant">Consultant</Label>
                <Input
                  id="consultant"
                  value={formData.consultant}
                  onChange={(e) => handleInputChange('consultant', e.target.value)}
                  placeholder="Enter consultant name"
                />
              </div>
            </div>
          </div>

          {/* Project Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Project Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Project Starting Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.projectStartingDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.projectStartingDate ? (
                        format(formData.projectStartingDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.projectStartingDate}
                      onSelect={(date) => handleInputChange('projectStartingDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectProgress">Project Progress %</Label>
                <Input
                  id="projectProgress"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.projectProgress}
                  onChange={(e) => handleInputChange('projectProgress', e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectDuration">Project Duration (days)</Label>
                <Input
                  id="projectDuration"
                  type="number"
                  value={formData.projectDuration}
                  onChange={(e) => handleInputChange('projectDuration', e.target.value)}
                  placeholder="Enter duration"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="elapsedTime">Elapsed Time (days)</Label>
                <Input
                  id="elapsedTime"
                  type="number"
                  value={formData.elapsedTime}
                  onChange={(e) => handleInputChange('elapsedTime', e.target.value)}
                  placeholder="Enter elapsed time"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeToCompletion">Time to Completion (days)</Label>
                <Input
                  id="timeToCompletion"
                  type="number"
                  value={formData.timeToCompletion}
                  onChange={(e) => handleInputChange('timeToCompletion', e.target.value)}
                  placeholder="Enter time to completion"
                />
              </div>
            </div>
          </div>

          {/* Project Key Personnel */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Project Key Personnel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="srProjectManager">Sr. Project Manager</Label>
                <Input
                  id="srProjectManager"
                  value={formData.srProjectManager}
                  onChange={(e) => handleInputChange('srProjectManager', e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hseManager">HSE Manager</Label>
                <Input
                  id="hseManager"
                  value={formData.hseManager}
                  onChange={(e) => handleInputChange('hseManager', e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectManager">Project Manager</Label>
                <Input
                  id="projectManager"
                  value={formData.projectManager}
                  onChange={(e) => handleInputChange('projectManager', e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="technicalManager">Technical Manager</Label>
                <Input
                  id="technicalManager"
                  value={formData.technicalManager}
                  onChange={(e) => handleInputChange('technicalManager', e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="qaQcManager">QA/QC Manager</Label>
                <Input
                  id="qaQcManager"
                  value={formData.qaQcManager}
                  onChange={(e) => handleInputChange('qaQcManager', e.target.value)}
                  placeholder="Enter name"
                />
              </div>
            </div>
          </div>

          {/* Safety Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Safety Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ltiDays">Number of days to LTIs (set by local authority)</Label>
                <Input
                  id="ltiDays"
                  type="number"
                  value={formData.ltiDays}
                  onChange={(e) => handleInputChange('ltiDays', e.target.value)}
                  placeholder="Enter days"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="safeManhours">Safe Manhours without LTI</Label>
                <Input
                  id="safeManhours"
                  type="number"
                  value={formData.safeManhours}
                  onChange={(e) => handleInputChange('safeManhours', e.target.value)}
                  placeholder="Enter manhours"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="daysWithoutLTI">Days Without LTI</Label>
                <Input
                  id="daysWithoutLTI"
                  type="number"
                  value={formData.daysWithoutLTI}
                  onChange={(e) => handleInputChange('daysWithoutLTI', e.target.value)}
                  placeholder="Enter days"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save Project Info"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}