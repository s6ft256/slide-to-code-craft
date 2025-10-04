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
  Menu,
  X
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
  { icon: BookOpen, label: "Library", path: "/library" },
];

const HSESidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-20 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-card shadow-md"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <nav className={cn(
        "bg-sidebar-background border-b md:border-b-0 md:border-r border-sidebar-border shadow-sm transition-all duration-300",
        "md:relative md:translate-x-0 md:w-64",
        "fixed top-16 left-0 right-0 z-50 md:z-auto",
        "transform",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between md:justify-center">
            <div className="flex items-center gap-3 md:hidden">
              <span className="font-semibold text-foreground">Navigation</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-6 overflow-x-auto md:overflow-x-visible">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg border transition-all duration-200 hover:shadow-md whitespace-nowrap text-sm",
                    "w-full md:w-auto justify-start md:justify-center",
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
      </nav>
    </>
  );
};

export default HSESidebar;