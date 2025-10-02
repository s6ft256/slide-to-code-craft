import { 
  BarChart3, 
  Calendar, 
  FileBarChart, 
  AlertTriangle, 
  Shield, 
  Eye, 
  Siren, 
  XCircle,
  Home,
  BookOpen,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Calendar, label: "Daily Management", path: "/daily-management" },
  { icon: FileBarChart, label: "Statistic Reports", path: "/statistic-reports" },
  { icon: AlertTriangle, label: "Incident Management", path: "/incident-management" },
  { icon: Shield, label: "HSE Audit", path: "/hse-audit" },
  { icon: Eye, label: "HSE Inspection", path: "/hse-inspection" },
  { icon: Siren, label: "Emergency Mgmt.", path: "/emergency-management" },
  { icon: XCircle, label: "HSE Violations", path: "/hse-violations" },
];

const librarySubItems = [
  { label: "ISO", path: "/library?tab=iso" },
  { label: "UAE", path: "/library?tab=uae" },
  { label: "SOPs", path: "/library?tab=sops" },
  { label: "Policy", path: "/library?tab=policy" },
];

const HSESidebar = () => {
  const location = useLocation();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  
  return (
    <nav className="bg-sidebar-background border-b border-sidebar-border shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/slide-to-code-craft/troj.jpg" 
              alt="Troj Logo" 
              className="w-8 h-8 rounded-lg object-cover"
            />
          </div>
          
          <div className="flex items-center space-x-1 overflow-x-hidden">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-smooth whitespace-nowrap",
                    location.pathname === item.path && "bg-sidebar-accent text-sidebar-primary font-medium"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
            
            {/* Library Section */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-150 whitespace-nowrap",
                  location.pathname.startsWith('/library') && "bg-sidebar-accent text-sidebar-primary font-medium"
                )}
              >
                <BookOpen className="h-4 w-4" />
                Library
                {isLibraryOpen ? 
                  <ChevronDown className="h-3 w-3 transition-transform duration-150" /> : 
                  <ChevronRight className="h-3 w-3 transition-transform duration-150" />
                }
              </Button>
              
              {isLibraryOpen && (
                <div className="absolute top-full left-0 mt-0 bg-sidebar-background border border-sidebar-border rounded-md shadow-xl z-50 min-w-[140px] animate-in fade-in-0 slide-in-from-top-2 duration-200">
                  <div className="py-1">
                    {librarySubItems.map((subItem, index) => (
                      <Link key={index} to={subItem.path}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "w-full justify-start px-4 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-150 rounded-none first:rounded-t-md last:rounded-b-md",
                            location.search.includes(subItem.label.toLowerCase()) && "bg-sidebar-accent text-sidebar-primary font-medium"
                          )}
                        >
                          {subItem.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default HSESidebar;