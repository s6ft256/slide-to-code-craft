import { FileText, Database, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { UserProfileDropdown } from "@/components/layout/UserProfileDropdown";
import { ProjectSelector } from "@/components/layout/ProjectSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const HSEHeader = () => {
  const { userProfile, user, signOut } = useAuth();
  const fullName = userProfile?.name || user?.email?.split('@')[0] || 'User';
  const displayName = fullName.split(' ')[0]; // Show only first name

  const handleSignOut = async () => {
    await signOut();
    window.location.hash = '/sign-in';
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4 shadow-soft">
      <div className="flex items-center justify-between">
        {/* Left section - Logo and Project Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/troj.jpg"
              alt="Troj Logo"
              className="w-10 h-10 rounded-lg object-cover ring-2 ring-primary/20 shadow-medium"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-foreground">
                THSEBMS
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

          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right text-sm">
                <div className="font-semibold text-foreground">{displayName}</div>
                {userProfile?.company && (
                  <div className="text-xs text-muted-foreground">{userProfile.company}</div>
                )}
              </div>
              <UserProfileDropdown />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="ml-2"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link to="/sign-in">
              <Button
                variant="outline"
                className="font-medium transition-smooth ml-4"
              >
                <LogOut className="h-4 w-4 mr-2 rotate-180" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HSEHeader;