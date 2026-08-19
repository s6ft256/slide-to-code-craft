import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type NCRRecord = {
  id: string;
  srNo: string;
  reference: string;
  issuedDate: string | null;
  location: string;
  areaSection: string;
  subject: string;
  description: string;
  source: string;
  typeOfNCR: string;
  type: string;
  responsibleCompanyName: string;
  responsibleDept: string;
  proposedDateOfClosure: string | null;
  actualDateOfClosure: string | null;
  status: string;
  daysToClose: string;
  remarks: string;
  createdAt: string;
};

const getSeverityColor = (typeOfNCR: string) => {
  switch (typeOfNCR.toLowerCase()) {
    case 'svr': return 'bg-destructive/10 text-destructive border border-destructive/20';
    case 'swn': return 'bg-warning/10 text-warning border border-warning/20';
    case 'major': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'minor': return 'bg-primary/10 text-primary border border-primary/20';
    default: return 'bg-muted text-muted-foreground border border-border';
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'open': return 'bg-destructive/10 text-destructive border border-destructive/20';
    case 'in progress': return 'bg-warning/10 text-warning border border-warning/20';
    case 'closed': return 'bg-success/10 text-success border border-success/20';
    case 'cancelled': return 'bg-muted text-muted-foreground border border-border';
    default: return 'bg-muted text-muted-foreground border border-border';
  }
};

export default function NCRRecords() {
  const [records, setRecords] = useState<NCRRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      try {
        const data = JSON.parse(localStorage.getItem('ncr_register') || '[]');
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
    return <div className="p-4 text-muted-foreground">Loading NCR records...</div>;
  }

  if (error) {
    return <div className="p-4 text-destructive">Error: {error}</div>;
  }

  if (records.length === 0) {
    return <div className="p-4 text-muted-foreground">No NCR records found.</div>;
  }

  return (
    <Card className="max-w-7xl mx-auto mb-6">
      <CardHeader>
        <CardTitle>NCR Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="min-w-full border border-border rounded text-sm bg-card">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Sr.No</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Reference</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Issued Date</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Subject</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Type of NCR</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Type</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Responsible Company</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Status</th>
                <th className="border border-border px-4 py-2 text-left text-muted-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row) => (
                <tr key={row.id} className="hover:bg-muted/50">
                  <td className="border border-border px-4 py-2 font-medium text-foreground">{row.srNo}</td>
                  <td className="border border-border px-4 py-2 text-foreground">{row.reference}</td>
                  <td className="border border-border px-4 py-2 text-foreground">
                    {row.issuedDate ? new Date(row.issuedDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="border border-border px-4 py-2 text-foreground">{row.subject}</td>
                  <td className="border border-border px-4 py-2">
                    <Badge className={getSeverityColor(row.typeOfNCR)}>
                      {row.typeOfNCR}
                    </Badge>
                  </td>
                  <td className="border border-border px-4 py-2 text-foreground">{row.type}</td>
                  <td className="border border-border px-4 py-2 text-foreground">{row.responsibleCompanyName || 'N/A'}</td>
                  <td className="border border-border px-4 py-2">
                    <Badge className={getStatusColor(row.status)}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="border border-border px-4 py-2 max-w-xs truncate text-foreground" title={row.description}>
                    {row.description.length > 50 ? `${row.description.substring(0, 50)}...` : row.description}
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