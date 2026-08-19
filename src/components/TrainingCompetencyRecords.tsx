import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TrainingCompetencyRecord = {
  id: string;
  srNo: string;
  dateOfTraining: string | null;
  trainingCourseTitle: string;
  trainingProvider: string;
  trainingDurationHrs: string;
  trainingHours: string;
  internalExternal: string;
  empIdEid: string;
  name: string;
  designation: string;
  company: string;
  score: string;
  noOfAttendees: string;
  certificateReference: string;
  trainingCertificateValidity: string;
  createdAt: string;
};

const getScoreColor = (score: string) => {
  const numScore = parseFloat(score);
  if (isNaN(numScore)) return 'bg-muted text-muted-foreground border border-border';
  if (numScore >= 90) return 'bg-success/10 text-success border border-success/20';
  if (numScore >= 70) return 'bg-warning/10 text-warning border border-warning/20';
  return 'bg-destructive/10 text-destructive border border-destructive/20';
};

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'internal': return 'bg-primary/10 text-primary border border-primary/20';
    case 'external': return 'bg-accent/10 text-accent border border-accent/20';
    default: return 'bg-muted text-muted-foreground border border-border';
  }
};

export default function TrainingCompetencyRecords() {
  const [records, setRecords] = useState<TrainingCompetencyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      try {
        const data = JSON.parse(localStorage.getItem('training_competency_register') || '[]');
        setRecords(data.reverse()); // Most recent first
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecords();
  }, []);

  if (loading) {
    return <div className="p-4 text-muted-foreground">Loading training competency records...</div>;
  }

  if (error) {
    return <div className="p-4 text-destructive">Error: {error}</div>;
  }

  if (records.length === 0) {
    return <div className="p-4 text-muted-foreground">No training competency records found.</div>;
  }

  return (
    <Card className="max-w-7xl mx-auto mb-6">
      <CardHeader>
        <CardTitle>Training & Competency Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="min-w-full border border-border rounded text-sm bg-card">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Sr.No</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">EMP ID</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Name</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Training Course</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Provider</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Type</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Score</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-muted/50">
                  <td className="border border-border px-4 py-2 font-medium text-foreground">{record.srNo}</td>
                  <td className="border border-border px-4 py-2 text-foreground">{record.empIdEid}</td>
                  <td className="border border-border px-4 py-2 text-foreground">{record.name}</td>
                  <td className="border border-border px-4 py-2 max-w-xs truncate text-foreground" title={record.trainingCourseTitle}>
                    {record.trainingCourseTitle.length > 30 ? `${record.trainingCourseTitle.substring(0, 30)}...` : record.trainingCourseTitle}
                  </td>
                  <td className="border border-border px-4 py-2 text-foreground">{record.trainingProvider || 'N/A'}</td>
                  <td className="border border-border px-4 py-2">
                    <Badge className={getTypeColor(record.internalExternal)}>
                      {record.internalExternal || 'N/A'}
                    </Badge>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Badge className={getScoreColor(record.score)}>
                      {record.score || 'N/A'}
                    </Badge>
                  </td>
                  <td className="border border-border px-4 py-2 text-foreground">
                    {record.dateOfTraining ? new Date(record.dateOfTraining).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
