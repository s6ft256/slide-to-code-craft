import { FileText, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { UserProfileDropdown } from "@/components/UserProfileDropdown";
import { userData } from "@/lib/userData";
import { ProjectSelector } from "@/components/ProjectSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

const HSEHeader = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4 shadow-soft">
      <div className="flex items-center justify-between">
        {/* Left section - Logo and Project Info */}
        <div className="flex items-center gap-6">
          <img 
            src="/slide-to-code-craft/troj.jpg" 
            alt="Troj Logo" 
            className="w-10 h-10 rounded-lg object-cover"
          />
          
          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold text-foreground">
              Projects
            </div>
            <ProjectSelector />
            <ThemeToggle />
          </div>
        </div>

        {/* Right section - Actions and User */}
        <div className="flex items-center gap-4">
          <Button 
            className="bg-gradient-primary hover:bg-primary-hover text-primary-foreground font-medium shadow-medium transition-smooth"
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>

          <Link to="/data-entry">
            <Button 
              variant="outline"
              className="font-medium transition-smooth"
            >
              <Database className="h-4 w-4 mr-2" />
              DATA ENTRY
            </Button>
          </Link>
          
          <NotificationDropdown />
          
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right text-sm">
              <div className="font-semibold text-foreground">{userData.name}</div>
            </div>
            <UserProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HSEHeader;