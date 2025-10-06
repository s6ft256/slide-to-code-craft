import { FileText, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NotificationDropdown } from "@/components/layout/NotificationDropdown";
import { UserProfileDropdown } from "@/components/layout/UserProfileDropdown";
import { userData } from "@/lib/userData";
import { ProjectSelector } from "@/components/layout/ProjectSelector";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const HSEHeader = () => {
  const { user } = useAuth();
  
  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return "Guest User";
    
    if (user.user_metadata?.isAnonymous) return "Guest User";
    
    return user.user_metadata?.name || 
           user.user_metadata?.full_name || 
           (user.email ? user.email.split('@')[0] : "User");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-soft">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left section - Logo and Project Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 hover-lift p-2 rounded-lg transition-all duration-200">
              <img
                src="/slide-to-code-craft/troj.jpg"
                alt="Troj Logo"
                className="w-10 h-10 rounded-lg object-cover ring-2 ring-primary/20 shadow-medium"
              />
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-foreground">
                  HSE Management System
                </div>
                <div className="text-xs text-muted-foreground">
                  Professional Safety Solutions
                </div>
              </div>
            </div>

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
              className="btn-professional gradient-bg-primary hover:shadow-lg text-primary-foreground font-medium shadow-medium transition-all duration-200 hover:scale-105"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>

            <Link to="/data-entry">
              <Button
                variant="outline"
                className="font-medium transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:bg-primary/5"
              >
                <Database className="h-4 w-4 mr-2" />
                DATA ENTRY
              </Button>
            </Link>

            <NotificationDropdown />

            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right text-sm">
                <div className="font-semibold text-foreground">{getUserDisplayName()}</div>
              </div>
              <UserProfileDropdown />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HSEHeader;