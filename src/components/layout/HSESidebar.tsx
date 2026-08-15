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
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Calendar, label: "Daily Management", path: "/daily-management" },
  { icon: FileBarChart, label: "Statistic Reports", path: "/statistic-reports" },
  { icon: AlertTriangle, label: "Incident Management", path: "/incident-management" },
  { icon: Shield, label: "HSE Audit", path: "/hse-audit" },
  { icon: Eye, label: "HSE Inspection", path: "/hse-inspection" },
  { icon: Siren, label: "Emergency Mgmt.", path: "/emergency-management" },
  { icon: XCircle, label: "HSE Violations", path: "/hse-violations" },
  { icon: BookOpen, label: "Library", path: "/library" },
];

const HSESidebar = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-card/95 backdrop-blur-xl border-r border-border/50 shadow-soft overflow-y-auto">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gradient mb-2">Navigation</h2>
          <p className="text-sm text-muted-foreground">Manage HSE operations</p>
        </div>
        
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <div
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 hover-lift cursor-pointer",
                  location.pathname === item.path 
                    ? "bg-gradient-primary text-primary-foreground border-primary/50 shadow-lg scale-105" 
                    : "bg-card/50 text-card-foreground border-border/30 hover:bg-accent/10 hover:border-accent/30 hover:shadow-md"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon 
                  className={cn(
                    "h-5 w-5 transition-all duration-300",
                    location.pathname === item.path 
                      ? "text-primary-foreground" 
                      : "text-muted-foreground group-hover:text-accent-foreground"
                  )} 
                />
                <span className={cn(
                  "font-medium transition-all duration-300",
                  location.pathname === item.path 
                    ? "text-primary-foreground" 
                    : "text-foreground group-hover:text-accent-foreground"
                )}>
                  {item.label}
                </span>
                {location.pathname === item.path && (
                  <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full animate-pulse-soft"></div>
                )}
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/30">
          <div className="text-xs text-muted-foreground text-center">
            HSE Management System v2.0
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HSESidebar;