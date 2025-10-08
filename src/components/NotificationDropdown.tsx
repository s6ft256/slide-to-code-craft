import { useState } from "react";
import { Bell, AlertTriangle, Clock, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { useCriticalIncidents, CriticalIncident } from "@/hooks/use-critical-incidents";

interface NotificationDropdownProps {
  className?: string;
}

export function NotificationDropdown({ className }: NotificationDropdownProps) {
  const { criticalIncidents, loading, count } = useCriticalIncidents();
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'reported':
      case 'resolved':
        return 'bg-green-500';
      case 'pending':
      case 'open':
        return 'bg-yellow-500';
      case 'in progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`relative ${className}`}
          aria-label={`Notifications (${count} critical incidents)`}
        >
          <Bell className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {count > 99 ? '99+' : count}
              </span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 max-h-96">
        <DropdownMenuLabel className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          Critical Incidents
          {count > 0 && (
            <Badge variant="destructive" className="ml-auto">
              {count}
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {loading ? (
          <div className="p-4 text-center text-muted-foreground">
            Loading notifications...
          </div>
        ) : criticalIncidents.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No critical incidents at this time
          </div>
        ) : (
          <ScrollArea className="max-h-80">
            {criticalIncidents.map((incident) => (
              <DropdownMenuItem
                key={incident.id}
                className="flex flex-col items-start p-4 cursor-pointer hover:bg-muted/50"
                onClick={() => {
                  // Could navigate to incident details page
                  console.log('View incident:', incident.id);
                }}
              >
                <div className="flex items-start justify-between w-full mb-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${getSeverityColor(incident.severity)} text-white text-xs`}
                    >
                      {incident.severity}
                    </Badge>
                    <Badge
                      className={`${getStatusColor(incident.status)} text-white text-xs`}
                    >
                      {incident.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {incident.srno || 'N/A'}
                  </span>
                </div>

                <div className="w-full space-y-1">
                  <p className="text-sm font-medium line-clamp-2">
                    {incident.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(incident.incidentdate)}
                      {incident.time && ` ${incident.time}`}
                    </div>

                    {incident.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {incident.location}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <FileText className="h-3 w-3" />
                    {incident.incidentType}
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        )}

        {criticalIncidents.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-center text-primary font-medium"
              onClick={() => {
                // Navigate to incident management page
                window.location.href = '/incident-management';
                setIsOpen(false);
              }}
            >
              View All Incidents
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}