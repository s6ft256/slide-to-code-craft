import { useState } from "react";
import { Building2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useProject } from "@/contexts/ProjectContext";

interface ProjectSelectorProps {
  className?: string;
}

export function ProjectSelector({ className }: ProjectSelectorProps) {
  const { selectedProject, setSelectedProject } = useProject();

  // Mock project data - in a real app, this would come from an API
  const projects = [
    { code: "TG000", name: "Zayed National Museum", type: "Project" },
    { code: "TG-2134", name: "Baniyas West", type: "Project" },
  ];

  const getProjectTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'project':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'hospitality':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'infrastructure':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-3 px-4 py-2 h-auto border-2 hover:border-primary/50 transition-colors ${className}`}
          aria-label="Select project"
        >
          <Building2 className="h-4 w-4 text-primary" />
          <div className="text-left">
            <div className="font-semibold text-sm">{selectedProject.code}</div>
            <div className="text-xs text-muted-foreground truncate max-w-[120px]">
              {selectedProject.name}
            </div>
          </div>
          <Badge className={`text-xs ${getProjectTypeColor(selectedProject.type)}`}>
            {selectedProject.type}
          </Badge>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Select Project
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {projects.map((project) => (
          <DropdownMenuItem
            key={project.code}
            className={`flex items-center justify-between p-3 cursor-pointer ${
              selectedProject.code === project.code ? 'bg-accent' : ''
            }`}
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex-1">
              <div className="font-medium text-sm">{project.code}</div>
              <div className="text-xs text-muted-foreground">{project.name}</div>
            </div>
            <Badge className={`text-xs ml-2 ${getProjectTypeColor(project.type)}`}>
              {project.type}
            </Badge>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}