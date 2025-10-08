import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TrainingRecord = {
  id: string;
  empId: string;
  name: string;
  designation: string;
  company: string;
  dateOfInduction: string | null;
  location: string;
  trainingProvider: string;
  refresherBefore: string;
  createdAt: string;
};

export default function TrainingRecords() {
  const [records, setRecords] = useState<TrainingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      try {
        const data = JSON.parse(localStorage.getItem('training_records') || '[]');
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
    return <div className="p-4">Loading training records...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (records.length === 0) {
    return <div className="p-4 text-muted-foreground">No training records found.</div>;
  }

  return (
    <Card className="max-w-6xl mx-auto mb-6">
      <CardHeader>
        <CardTitle>Training Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="min-w-full border rounded text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">EMP ID / EID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Designation</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Company</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date of Induction</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Training Provider</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Refresher Before</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{row.empId}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.designation}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.company}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.dateOfInduction ? new Date(row.dateOfInduction).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{row.location || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.trainingProvider || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.refresherBefore || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}