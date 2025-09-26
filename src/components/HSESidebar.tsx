import { 
  BarChart3, 
  Calendar, 
  FileBarChart, 
  AlertTriangle, 
  Shield, 
  Eye, 
  Siren, 
  XCircle,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Calendar, label: "Daily Management" },
  { icon: FileBarChart, label: "Statistic Reports" },
  { icon: AlertTriangle, label: "Incident Management" },
  { icon: Shield, label: "HSE Audit" },
  { icon: Eye, label: "HSE Inspection" },
  { icon: Siren, label: "Emergency Mgmt." },
  { icon: XCircle, label: "HSE Violations" },
];

const HSESidebar = () => {
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
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-12 text-sidebar-foreground hover:bg-sidebar-accent transition-smooth",
                item.active && "bg-sidebar-accent text-sidebar-primary font-medium"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>
        
        <div className="mt-8 p-4 bg-sidebar-accent/30 rounded-lg border border-sidebar-border">
          <p className="text-sm text-sidebar-foreground/80 mb-2">Safety First</p>
          <p className="text-xs text-sidebar-foreground/60">
            Current project status: <span className="text-success font-medium">Compliant</span>
          </p>
        </div>
      </div>
    </aside>
  );
};

export default HSESidebar;