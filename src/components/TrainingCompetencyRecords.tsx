import React, { useState, useEffect } from "react";

type TrainingCompetencyRow = Record<string, string | number> & {
  id: string;
  createdAt: string;
};

export default function TrainingCompetencyRecords() {
  const [records, setRecords] = useState<TrainingCompetencyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      try {
        const data = JSON.parse(localStorage.getItem('training_competency_register') || '[]');
        setRecords(data);
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
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Training Competency Records</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Training Course</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Score</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date Created</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td className="border border-gray-300 px-4 py-2">{record.id}</td>
                <td className="border border-gray-300 px-4 py-2">{record.name || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">{record.trainingCourseTitle || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">{record.score || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {record.createdAt ? (() => {
                    try {
                      return new Date(record.createdAt).toLocaleDateString();
                    } catch {
                      return 'Invalid date';
                    }
                  })() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
