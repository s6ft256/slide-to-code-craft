import React, { createContext, useContext, useState, useEffect } from 'react';

interface Project {
  code: string;
  name: string;
  type: string;
}

interface ProjectContextType {
  selectedProject: Project;
  setSelectedProject: (project: Project) => void;
  projects: Project[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Parse CSV data to extract projects
const parseProjectsFromCSV = (): Project[] => {
  const projects: Project[] = [];
  
  // Project data from CSV file
  const csvData = `TG2151,Refurbishment of underground car parking,TG2151_Refurbishment of underground car parking
TG2133&2136,Mina Island Villa Projects,TG2133&2136_Mina Island Villa Projects
I052,Baniyas North Phase 2,I052_Baniyas North Phase 2
TG2144,CONSTRUCTION OF TOWNHOUSES & SD VILLAS-PHASE 1B & 1C,TG2144_CONSTRUCTION OF TOWNHOUSES & SD VILLAS-PHASE 1B & 1C
TG2153,EPC FOR FUEL FACILITIES AT ZIA,TG2153_EPC FOR FUEL FACILITIES AT ZIA
TG2150,Command of Military Works,TG2150_Command of Military Works
I062,DAS ISLAND RESIDENTIAL DEVELOPMENT PROJECT (DIRD),I062_DAS ISLAND RESIDENTIAL DEVELOPMENT PROJECT (DIRD)
I053,Hudayriyat Island Priority Development Area,I053_Hudayriyat Island Priority Development Area
TG2145,AL Deem Development,TG2145_AL Deem Development
TG2103,SB-03 Luxury Residential Development Project,TG2103_SB-03 Luxury Residential Development Project
I057,Reem Hills-Phase 1,I057_Reem Hills-Phase 1
TG2152,WATER EDGE PHASE 2- YAS_IB 2 GARDENIA,TG2152_WATER EDGE PHASE 2- YAS_IB 2 GARDENIA
I064,Traffic improvement on E20 and Construction of 2 Bridges (IC3 and IC5),I064_Traffic improvement on E20 and Construction of 2 Bridges (IC3 and IC5)
TG2140,Construction Of Mainland Villas 218No's,TG2140_Construction Of Mainland Villas 218No's
S013,City walk,S013_City walk
I071,Contract No. P2411-BUILD CONTRACT FOR JBL 5,I071_Contract No. P2411-BUILD CONTRACT FOR JBL 5
I059,Al Falah Infrastructure Works,I059_Al Falah Infrastructure Works
TEW1007,Masdar Hybrid 1(Power China),TEW1007_Masdar Hybrid 1(Power China)
A-11,Grand Amphitheatre Car Park,A-11_Grand Amphitheatre Car Park
A04,KAFD A.04, D&B parcels,A04_KAFD A.04, D&B parcels
I045,Riyadh city north development phase 6,I045_Riyadh city north development phase 6
I046,Infrastrcture Work for package IIA & IIB,I046_Infrastrcture Work for package IIA & IIB
I049,Construction of Essential Infrastructure Works Reem Island,I049_Construction of Essential Infrastructure Works Reem Island
I058,Design & Build ( Contract P2216 :ETIHAD RAIL STAGE 4 PROJECT MBZ & EXPO Link ),I058_Design & Build ( Contract P2216 :ETIHAD RAIL STAGE 4 PROJECT MBZ & EXPO Link )
I063,AL SAMHA 242 VILLAS,I063_AL SAMHA 242 VILLAS
I065,Saadiyat Lagoons,I065_Saadiyat Lagoons
I066,Al Deem Development,I066_Al Deem Development
I067,Baniyas West,I067_Baniyas West
I072,RHINF2 ? Reem Hills Development,I072_RHINF2 ? Reem Hills Development
I073,Zaid Military university project (ZMU),I073_Zaid Military university project (ZMU)
MSHC,MotorSport Hotel Complex (MSHC) - Qiddiya, Saudi Arabia,MSHC_MotorSport Hotel Complex (MSHC) - Qiddiya, Saudi Arabia
TG2097,Guggenheim Abu Dhabi Main Works,TG2097_Guggenheim Abu Dhabi Main Works
TG2114,BANIYAS NORTH DEVELOPMENT PHSE-2,TG2114_BANIYAS NORTH DEVELOPMENT PHSE-2
TG2121,Emirati housing - Al Samha 242 villas and service facilities,TG2121_Emirati housing - Al Samha 242 villas and service facilities
TG2128,HQ Building Sas Al nakhl,TG2128_HQ Building Sas Al nakhl
TG2130,AL HUDAYRIYAT WEST VELODROME,TG2130_AL HUDAYRIYAT WEST VELODROME
TG2132,Abu Dhabi Future School (ADFS) Program, Phase 10,TG2132_Abu Dhabi Future School (ADFS) Program, Phase 10
TG2134,Baniyas West,TG2134_Baniyas West
TG2138,DAS Island Residetial Development Project,TG2138_DAS Island Residetial Development Project
TG2141,Design and Build for Mina Gathering Village in Abu Dhabi,TG2141_Design and Build for Mina Gathering Village in Abu Dhabi
TG2143,Sport Hotel -Main Works,TG2143_Sport Hotel -Main Works
TG2146,Saadiyat Lagoons,TG2146_Saadiyat Lagoons
TG2149B,Zayed Military University ? Final Operating Capability (FOC),TG2149B_Zayed Military University ? Final Operating Capability (FOC)
TG2151,Refurbishment of underground car parking,TG2151_Refurbishment of underground car parking
TG2156,Construction Of Mainland Villas & TownHouses 593No's,TG2156_Construction Of Mainland Villas & TownHouses 593No's
TG2162,Construction Of North & South Villas 32 No's,TG2162_Construction Of North & South Villas 32 No's
TG2163,P22-Heptagon Project,TG2163_P22-Heptagon Project
TG2164,Maysan Development Phase 1,TG2164_Maysan Development Phase 1
TG2166,Zayed Military University ? Final Operating Capability (FOC ? 1B),TG2166_Zayed Military University ? Final Operating Capability (FOC ? 1B)
TG2113,Mina Zayed Fisherman's wharf Phase 1B ? Main Works,TG2113_Mina Zayed Fisherman's wharf Phase 1B ? Main Works
TG2131,Arabian Ranches 3 Development,TG2131_Arabian Ranches 3 Development
TG2149,Zayed Military University (ZMU),TG2149_Zayed Military University (ZMU)
P2216,P2216,P2216_P2216
ZNM,ZNM,ZNM_ZNM
TG2167,City Walk - Governmental Project Main Construction,TG2167_City Walk - Governmental Project Main Construction
I069,UAE OMAN Railway Link Project Abu Dhabi-Sohar:Oman Section-1-Package B,I069_UAE OMAN Railway Link Project Abu Dhabi-Sohar:Oman Section-1-Package B
TG000,Zayed National Museum,TG000_Zayed National Museum`;
  
  const lines = csvData.split('\n');
  
  lines.forEach(line => {
    const parts = line.split(',');
    if (parts.length >= 2) {
      const code = parts[0].trim();
      const name = parts[1].trim();
      if (code && name) {
        projects.push({
          code,
          name,
          type: 'Project'
        });
      }
    }
  });
  
  return projects;
};

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<Project>({
    code: "TG000",
    name: "Zayed National Museum",
    type: "Project"
  });
  const [projects] = useState<Project[]>(parseProjectsFromCSV());

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
      setSelectedProject: handleSetSelectedProject,
      projects
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