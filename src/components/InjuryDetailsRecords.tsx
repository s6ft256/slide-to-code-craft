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
    case 'cut/laceration': return 'bg-red-100 text-red-800';
    case 'burn': return 'bg-orange-100 text-orange-800';
    case 'fracture': return 'bg-purple-100 text-purple-800';
    case 'sprain/strain': return 'bg-yellow-100 text-yellow-800';
    case 'contusion': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'on leave': return 'bg-yellow-100 text-yellow-800';
    case 'terminated': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
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
    return <div className="p-4 text-red-600">Error: {error}</div>;
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
          <table className="min-w-full border rounded text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">Sr.No</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Incident Ref</th>
                <th className="border border-gray-300 px-4 py-2 text-left">IP Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Injury Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Body Part</th>
                <th className="border border-gray-300 px-4 py-2 text-left">LTI</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Incident Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">{record.srNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.incidentRef}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.ipName}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Badge className={getInjuryTypeColor(record.typeOfInjury)}>
                      {record.typeOfInjury || 'N/A'}
                    </Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{record.bodyPartInjured || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Badge className={record.isLTI ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                      {record.isLTI ? 'Yes' : 'No'}
                    </Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Badge className={getStatusColor(record.ipStatus)}>
                      {record.ipStatus || 'N/A'}
                    </Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
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