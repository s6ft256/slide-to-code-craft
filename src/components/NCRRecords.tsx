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
    case 'svr': return 'bg-red-100 text-red-800';
    case 'swn': return 'bg-orange-100 text-orange-800';
    case 'major': return 'bg-yellow-100 text-yellow-800';
    case 'minor': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'open': return 'bg-red-100 text-red-800';
    case 'in progress': return 'bg-yellow-100 text-yellow-800';
    case 'closed': return 'bg-green-100 text-green-800';
    case 'cancelled': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
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
    return <div className="p-4">Loading NCR records...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
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
          <table className="min-w-full border rounded text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">Sr.No</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Reference</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Issued Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Type of NCR</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Responsible Company</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">{row.srNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.reference}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.issuedDate ? new Date(row.issuedDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{row.subject}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Badge className={getSeverityColor(row.typeOfNCR)}>
                      {row.typeOfNCR}
                    </Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{row.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.responsibleCompanyName || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Badge className={getStatusColor(row.status)}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 max-w-xs truncate" title={row.description}>
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