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
    <header className="bg-card border-b border-border px-4 py-3 md:px-6 md:py-4 shadow-soft">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        {/* Left section - Logo and Project Info */}
        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
          <img 
            src="/slide-to-code-craft/troj.jpg" 
            alt="Troj Logo" 
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover flex-shrink-0"
          />
          
          <div className="flex items-center gap-2 md:gap-4 flex-1 md:flex-initial">
            <div className="text-sm font-semibold text-foreground hidden md:block">
              Projects
            </div>
            <ProjectSelector />
            <ThemeToggle />
          </div>
        </div>

        {/* Right section - Actions and User */}
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <Button 
              size="sm"
              className="bg-gradient-primary hover:bg-primary-hover text-primary-foreground font-medium shadow-medium transition-smooth text-xs md:text-sm"
            >
              <FileText className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Generate Report</span>
              <span className="sm:hidden">Report</span>
            </Button>

            <Link to="/data-entry">
              <Button 
                size="sm"
                variant="outline"
                className="font-medium transition-smooth text-xs md:text-sm"
              >
                <Database className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">DATA ENTRY</span>
                <span className="sm:hidden">Entry</span>
              </Button>
            </Link>
          </div>
          
          <NotificationDropdown />
          
          <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-border">
            <div className="text-right text-xs md:text-sm">
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