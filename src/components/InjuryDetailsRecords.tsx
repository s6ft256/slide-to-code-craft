import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type InjuryDetailsRecord = {
  id: string;
  srNo: string;
  incidentRef: string;
  incidentDate: string | null;
  typeOfInjury: string;
  bodyPartInjured: string;
  natureOfInjuryIllness: string;
  mechanismOfInjuryIllness: string;
  agencySourceOfInjuryIllness: string;
  emiratesIdOfIP: string;
  employeeIdOfIP: string;
  ipName: string;
  trade: string;
  ipStatus: string;
  isLTI: boolean;
  backToWorkDate: string | null;
  timeOffDays: string;
  weekEndingOn: string | null;
  createdAt: string;
};

const getInjuryTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'cut/laceration': return 'bg-destructive/10 text-destructive border border-destructive/20';
    case 'burn': return 'bg-warning/10 text-warning border border-warning/20';
    case 'fracture': return 'bg-accent/10 text-accent border border-accent/20';
    case 'sprain/strain': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'contusion': return 'bg-primary/10 text-primary border border-primary/20';
    default: return 'bg-muted text-muted-foreground border border-border';
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return 'bg-success/10 text-success border border-success/20';
    case 'on leave': return 'bg-warning/10 text-warning border border-warning/20';
    case 'terminated': return 'bg-destructive/10 text-destructive border border-destructive/20';
    default: return 'bg-muted text-muted-foreground border border-border';
  }
};

export default function InjuryDetailsRecords() {
  const [records, setRecords] = useState<InjuryDetailsRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      try {
        const data = JSON.parse(localStorage.getItem('injury_details') || '[]');
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
    return <div className="p-4">Loading injury details records...</div>;
  }

  if (error) {
    return <div className="p-4 text-destructive">Error: {error}</div>;
  }

  if (records.length === 0) {
    return <div className="p-4 text-muted-foreground">No injury details records found.</div>;
  }

  return (
    <Card className="max-w-7xl mx-auto mb-6">
      <CardHeader>
        <CardTitle>Injury Details Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="min-w-full border border-border rounded text-sm bg-card">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Sr.No</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Incident Ref</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">IP Name</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Injury Type</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Body Part</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">LTI</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Status</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Incident Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-muted/50">
                  <td className="border border-border px-4 py-2 font-medium text-foreground">{record.srNo}</td>
                  <td className="border border-border px-4 py-2 text-foreground">{record.incidentRef}</td>
                  <td className="border border-border px-4 py-2 text-foreground">{record.ipName}</td>
                  <td className="border border-border px-4 py-2">
                    <Badge className={getInjuryTypeColor(record.typeOfInjury)}>
                      {record.typeOfInjury || 'N/A'}
                    </Badge>
                  </td>
                  <td className="border border-border px-4 py-2 text-foreground">{record.bodyPartInjured || 'N/A'}</td>
                  <td className="border border-border px-4 py-2">
                    <Badge className={record.isLTI ? 'bg-destructive/10 text-destructive border border-destructive/20' : 'bg-success/10 text-success border border-success/20'}>
                      {record.isLTI ? 'Yes' : 'No'}
                    </Badge>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Badge className={getStatusColor(record.ipStatus)}>
                      {record.ipStatus || 'N/A'}
                    </Badge>
                  </td>
                  <td className="border border-border px-4 py-2 text-foreground">
                    {record.incidentDate ? new Date(record.incidentDate).toLocaleDateString() : 'N/A'}
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