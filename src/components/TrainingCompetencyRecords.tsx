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
  if (isNaN(numScore)) return 'bg-gray-100 text-gray-800';
  if (numScore >= 90) return 'bg-green-100 text-green-800';
  if (numScore >= 70) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'internal': return 'bg-blue-100 text-blue-800';
    case 'external': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
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
    return <div className="p-4">Loading training competency records...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
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
          <table className="min-w-full border rounded text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">Sr.No</th>
                <th className="border border-gray-300 px-4 py-2 text-left">EMP ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Training Course</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Provider</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Score</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">{record.srNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.empIdEid}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.name}</td>
                  <td className="border border-gray-300 px-4 py-2 max-w-xs truncate" title={record.trainingCourseTitle}>
                    {record.trainingCourseTitle.length > 30 ? `${record.trainingCourseTitle.substring(0, 30)}...` : record.trainingCourseTitle}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{record.trainingProvider || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Badge className={getTypeColor(record.internalExternal)}>
                      {record.internalExternal || 'N/A'}
                    </Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Badge className={getScoreColor(record.score)}>
                      {record.score || 'N/A'}
                    </Badge>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
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
