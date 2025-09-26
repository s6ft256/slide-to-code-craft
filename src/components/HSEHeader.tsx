import { Search, Bell, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const HSEHeader = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4 shadow-soft">
      <div className="flex items-center justify-between">
        {/* Left section - Search and Project Info */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="w-64 pl-10 bg-background border-border focus:ring-primary"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="font-semibold text-foreground">TG000</span>
              <span className="text-muted-foreground"> - </span>
              <span className="text-foreground">Zayed National Museum</span>
            </div>
            <Badge variant="secondary" className="bg-accent-light text-accent font-medium">
              Project
            </Badge>
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
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
          </Button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right text-sm">
              <div className="font-semibold text-foreground">Ahmed Abbas</div>
              <div className="text-muted-foreground">ESS</div>
            </div>
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HSEHeader;