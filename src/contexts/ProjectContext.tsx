import React, { createContext, useContext, useState, useEffect } from 'react';

interface Project {
  code: string;
  name: string;
  type: string;
}

interface ProjectContextType {
  selectedProject: Project;
  setSelectedProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<Project>({
    code: "TG000",
    name: "Zayed National Museum",
    type: "Project"
  });

  useEffect(() => {
    // Load selected project from localStorage
    const savedProject = localStorage.getItem('selectedProject');
    if (savedProject) {
      try {
        setSelectedProject(JSON.parse(savedProject));
      } catch (error) {
        console.error('Error loading selected project:', error);
      }
    }
  }, []);

  const handleSetSelectedProject = (project: Project) => {
    setSelectedProject(project);
    localStorage.setItem('selectedProject', JSON.stringify(project));
  };

  return (
    <ProjectContext.Provider value={{
      selectedProject,
      setSelectedProject: handleSetSelectedProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}