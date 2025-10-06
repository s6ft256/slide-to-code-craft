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
    <div className="fixed left-0 top-16 h-screen w-64 bg-sidebar-background border-r border-sidebar-border shadow-md overflow-y-auto z-10">
      <div className="px-3 py-6">
        <div className="mb-6 px-3">
          <h2 className="text-sidebar-foreground font-bold text-sm uppercase tracking-wider opacity-80">
            HSE Management
          </h2>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path} className="block">
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 my-1 rounded-md transition-all duration-200",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm font-medium" 
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-8 px-3 py-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between text-xs text-sidebar-foreground/70">
            <span>© 2025 HSE Dashboard</span>
            <span>v1.2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSESidebar;