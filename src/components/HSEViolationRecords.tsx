import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Eye, Trash2, Calendar, User, MapPin, FileText } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type HSEViolationRecord = {
  id: string;
  violationNo: string;
  employee: string;
  reportedTo: string;
  date: Date | undefined;
  reportedBy: string;
  dateOfIncident: Date | undefined;
  contactInformation: string;
  reportType: string;
  violators: string;
  location: string;
  safetyCodesBroken: string;
  descriptionOfEvent: string;
  nextCourseOfAction: string;
  createdAt: string;
};

export default function HSEViolationRecords() {
  const { toast } = useToast();
  const [records, setRecords] = useState<HSEViolationRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<HSEViolationRecord | null>(null);

  // Load records from localStorage
  useEffect(() => {
    const loadRecords = () => {
      try {
        const stored = localStorage.getItem('hse_violations');
        if (stored) {
          const parsedRecords = JSON.parse(stored);
          // Convert date strings back to Date objects
          const recordsWithDates = parsedRecords.map((record: any) => ({
            ...record,
            date: record.date ? new Date(record.date) : undefined,
            dateOfIncident: record.dateOfIncident ? new Date(record.dateOfIncident) : undefined,
          }));
          setRecords(recordsWithDates);
        }
      } catch (error) {
        console.error('Error loading HSE violation records:', error);
        toast({
          title: "Error",
          description: "Failed to load HSE violation records",
          variant: "destructive",
        });
      }
    };

    loadRecords();

    // Listen for localStorage updates
    const handleStorageUpdate = (e: CustomEvent) => {
      if (e.detail?.key === 'hse_violations') {
        loadRecords();
      }
    };

    window.addEventListener('localStorageUpdate', handleStorageUpdate as EventListener);

    return () => {
      window.removeEventListener('localStorageUpdate', handleStorageUpdate as EventListener);
    };
  }, [toast]);

  const handleDelete = (id: string) => {
    try {
      const updatedRecords = records.filter(record => record.id !== id);
      localStorage.setItem('hse_violations', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('localStorageUpdate', { detail: { key: 'hse_violations' } }));

      toast({
        title: "Record Deleted",
        description: "HSE violation record has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete the record",
        variant: "destructive",
      });
    }
  };

  const getReportTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'mail': 'default',
      'email': 'secondary',
      'phone': 'outline',
      'in-person': 'destructive'
    };
    return variants[type] || 'default';
  };

  if (selectedRecord) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">HSE Violation Report Details</h3>
          <Button variant="outline" onClick={() => setSelectedRecord(null)}>
            Back to Records
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Violation Report: {selectedRecord.violationNo}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Report Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Violation No</p>
                <p className="font-semibold">{selectedRecord.violationNo}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Employee</p>
                <p className="font-semibold">{selectedRecord.employee}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Reported to</p>
                <p className="font-semibold">{selectedRecord.reportedTo || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Date</p>
                <p className="font-semibold">{selectedRecord.date ? format(selectedRecord.date, 'PPP') : 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Reported by</p>
                <p className="font-semibold">{selectedRecord.reportedBy}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Date of Incident</p>
                <p className="font-semibold">{selectedRecord.dateOfIncident ? format(selectedRecord.dateOfIncident, 'PPP') : 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Contact Information</p>
                <p className="font-semibold">{selectedRecord.contactInformation || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Report Type</p>
                <Badge variant={getReportTypeBadge(selectedRecord.reportType)}>
                  {selectedRecord.reportType || 'N/A'}
                </Badge>
              </div>
            </div>

            {/* Violation Details */}
            <div className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Violator(s)
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedRecord.violators}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedRecord.location}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Safety Code(s) Broken
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedRecord.safetyCodesBroken}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Description of Event
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedRecord.descriptionOfEvent}</p>
              </div>

              {selectedRecord.nextCourseOfAction && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Next Course of Action
                  </h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedRecord.nextCourseOfAction}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">HSE Violation Records</h3>
        <Badge variant="outline">{records.length} records</Badge>
      </div>

      {records.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No HSE Violation Records</h3>
            <p className="text-muted-foreground text-center">
              No HSE violation reports have been submitted yet. Use the HSE Violation Form to create your first report.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {records.map((record) => (
            <Card key={record.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">{record.violationNo}</h4>
                      <Badge variant={getReportTypeBadge(record.reportType)}>
                        {record.reportType}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Employee: {record.employee} | Reported by: {record.reportedBy}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Date: {record.date ? format(record.date, 'PPP') : 'N/A'} |
                      Incident: {record.dateOfIncident ? format(record.dateOfIncident, 'PPP') : 'N/A'}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {record.descriptionOfEvent}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRecord(record)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(record.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}