import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useProject } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";

export function ProjectsGrid() {
  const { projects, setSelectedProject, selectedProject, userProjectCode } = useProject();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects to show only user's project if they have one
  const availableProjects = userProjectCode 
    ? projects.filter(p => p.code === userProjectCode)
    : projects;

  const filteredProjects = availableProjects.filter(project =>
    project.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProjectTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'project':
        return 'bg-primary/10 text-primary border border-primary/20';
      case 'maintenance':
        return 'bg-warning/10 text-warning border border-warning/20';
      case 'hospitality':
        return 'bg-success/10 text-success border border-success/20';
      case 'infrastructure':
        return 'bg-accent/10 text-accent border border-accent/20';
      default:
        return 'bg-muted text-muted-foreground border border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            {userProjectCode ? 'Your Project' : 'All Projects'}
          </h2>
          <p className="text-muted-foreground mt-1">
            {userProjectCode 
              ? `You have access to ${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''}`
              : `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} available`
            }
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects by code or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <Card
            key={project.code}
            className={`cursor-pointer transition-all hover:shadow-md hover:border-primary/50 ${
              selectedProject.code === project.code ? 'border-primary border-2' : ''
            }`}
            onClick={() => setSelectedProject(project)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold">{project.code}</CardTitle>
                  <Badge className={`text-xs mt-2 ${getProjectTypeColor(project.type)}`}>
                    {project.type}
                  </Badge>
                </div>
                {selectedProject.code === project.code && (
                  <Badge variant="default" className="text-xs">
                    Selected
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.name}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project);
                }}
              >
                Select Project
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No projects found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
