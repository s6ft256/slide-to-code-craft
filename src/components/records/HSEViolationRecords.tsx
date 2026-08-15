import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Trash2, Calendar, User, MapPin, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface HSEViolationRecord {
  id: string;
  employee: string;
  violationNo: string;
  reportedTo: string;
  date: string;
  reportedBy: string;
  dateOfIncident: string;
  contactInformation: string;
  reportType: string;
  violators: string;
  location: string;
  safetyCodesBroken: string;
  descriptionOfEvent: string;
  nextCourseOfAction: string;
  createdAt: string;
}

const HSEViolationRecords = () => {
  const [records, setRecords] = useState<HSEViolationRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<HSEViolationRecord | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    try {
      const data = JSON.parse(localStorage.getItem('hse_violations') || '[]');
      setRecords(data);
    } catch (error) {
      console.error('Error loading HSE violation records:', error);
    }
  };

  const deleteRecord = (id: string) => {
    try {
      const updatedRecords = records.filter(record => record.id !== id);
      localStorage.setItem('hse_violations', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);

      toast({
        title: "Record Deleted",
        description: "HSE violation record has been deleted successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete the record.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const getReportTypeBadge = (type: string) => {
    const variants = {
      mail: "default",
      email: "secondary",
      phone: "outline",
      "in-person": "destructive"
    } as const;

    return (
      <Badge variant={variants[type as keyof typeof variants] || "default"}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            HSE Violation Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No HSE violation records found</p>
              <p className="text-sm">Records will appear here when violations are reported</p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <Card key={record.id} className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{record.violationNo}</h3>
                        <p className="text-sm text-muted-foreground">
                          Reported on {format(new Date(record.date), "PPP")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {getReportTypeBadge(record.reportType)}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRecord(record)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteRecord(record.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Employee:</span>
                        <span>{record.employee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Location:</span>
                        <span>{record.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Reported by:</span>
                        <span>{record.reportedBy}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm">
                        <span className="font-medium">Safety Codes Broken:</span> {record.safetyCodesBroken}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed View Modal */}
      {selectedRecord && (
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Violation Details - {selectedRecord.violationNo}
              </span>
              <Button
                variant="outline"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Employee:</span> {selectedRecord.employee}</p>
                  <p><span className="font-medium">Violation No:</span> {selectedRecord.violationNo}</p>
                  <p><span className="font-medium">Reported to:</span> {selectedRecord.reportedTo}</p>
                  <p><span className="font-medium">Reported by:</span> {selectedRecord.reportedBy}</p>
                  <p><span className="font-medium">Report Type:</span> {getReportTypeBadge(selectedRecord.reportType)}</p>
                  <p><span className="font-medium">Contact:</span> {selectedRecord.contactInformation || 'Not provided'}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Dates</h4>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Report Date:</span> {format(new Date(selectedRecord.date), "PPP")}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Incident Date:</span> {format(new Date(selectedRecord.dateOfIncident), "PPP")}
                  </p>
                </div>
              </div>
            </div>

            {/* Violation Details */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Violation Details</h4>
                <div className="space-y-3 text-sm">
                  <p><span className="font-medium">Violator(s):</span> {selectedRecord.violators || 'Not specified'}</p>
                  <p><span className="font-medium">Location:</span> {selectedRecord.location}</p>
                  <p><span className="font-medium">Safety Code(s) Broken:</span> {selectedRecord.safetyCodesBroken}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Description of Event</h4>
                <p className="text-sm bg-muted p-3 rounded-md">{selectedRecord.descriptionOfEvent}</p>
              </div>

              {selectedRecord.nextCourseOfAction && (
                <div>
                  <h4 className="font-semibold mb-2">Next Course of Action</h4>
                  <p className="text-sm bg-muted p-3 rounded-md">{selectedRecord.nextCourseOfAction}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HSEViolationRecords;
