import React, { useState, useEffect } from "react";

type InjuryDetailsRow = Record<string, string | number | boolean> & {
  id: string;
  createdAt: string;
};

export default function InjuryDetailsRecords() {
  const [records, setRecords] = useState<InjuryDetailsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      try {
        const data = JSON.parse(localStorage.getItem('injury_details') || '[]');
        setRecords(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecords();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Injury Details Records</h2>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td className="border border-gray-300 px-4 py-2">{record.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {record.createdAt ? (() => {
                      try {
                        return new Date(record.createdAt).toLocaleDateString();
                      } catch {
                        return 'Invalid date';
                      }
                    })() : 'N/A'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {JSON.stringify(record, null, 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}