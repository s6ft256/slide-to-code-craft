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
    <nav className="bg-sidebar-background border-b border-sidebar-border shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo removed as requested */}
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-hidden">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <div
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 hover:shadow-md whitespace-nowrap",
                    location.pathname === item.path 
                      ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                      : "bg-card text-card-foreground border-border hover:bg-accent hover:border-accent-foreground/20"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default HSESidebar;