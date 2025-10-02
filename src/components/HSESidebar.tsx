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
    <aside className="w-64 bg-sidebar-background border-r border-sidebar-border shadow-medium">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-success-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-sidebar-foreground text-lg">TBMS 2.0</h2>
            <p className="text-sm text-sidebar-foreground/70">HSE Management</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-12 text-sidebar-foreground hover:bg-sidebar-accent transition-smooth",
                  location.pathname === item.path && "bg-sidebar-accent text-sidebar-primary font-medium"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
          
          {/* Library Section */}
          <div>
            <Button
              variant="ghost"
              onClick={() => setIsLibraryOpen(!isLibraryOpen)}
              className={cn(
                "w-full justify-start gap-3 h-12 text-sidebar-foreground hover:bg-sidebar-accent transition-smooth",
                location.pathname.startsWith('/library') && "bg-sidebar-accent text-sidebar-primary font-medium"
              )}
            >
              <BookOpen className="h-5 w-5" />
              Library
              {isLibraryOpen ? 
                <ChevronDown className="h-4 w-4 ml-auto" /> : 
                <ChevronRight className="h-4 w-4 ml-auto" />
              }
            </Button>
            
            {isLibraryOpen && (
              <div className="ml-6 mt-1 space-y-1">
                {librarySubItems.map((subItem, index) => (
                  <Link key={index} to={subItem.path}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 h-10 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-smooth",
                        location.search.includes(subItem.label.toLowerCase()) && "bg-sidebar-accent text-sidebar-primary font-medium"
                      )}
                    >
                      {subItem.label}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
        
        {/* Removed informational card per request */}
      </div>
    </aside>
  );
};

export default HSESidebar;