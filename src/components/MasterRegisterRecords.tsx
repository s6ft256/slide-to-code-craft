import React, { useEffect, useState } from "react";

type MasterRegisterRecord = Record<string, string | number | boolean> & {
  id: string;
  createdAt: string;
};

export default function MasterRegisterRecords() {
  const [records, setRecords] = useState<MasterRegisterRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      setError(null);
      try {
        const data = JSON.parse(localStorage.getItem('master_register') || '[]');
        setRecords(data);
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchRecords();
  }, []);

  const mappedRecords = records.map((record) => ({
    ...record,
    // Add any necessary field mappings here if needed
  }));

  if (loading) return <div className="text-muted-foreground">Loading records...</div>;
  if (error) return <div className="text-destructive">{error}</div>;
  if (!records.length) return <div className="text-muted-foreground">No records found.</div>;

  return (
    <div className="overflow-auto">
      <table className="min-w-full border border-border rounded bg-card">
        <thead>
          <tr>
            {Object.keys(mappedRecords[0]).map((key) => (
              <th key={key} className="px-2 py-1 border-b border-border bg-muted text-xs font-semibold text-muted-foreground">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mappedRecords.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-card" : "bg-muted/50"}>
              {Object.values(row).map((val, i) => (
                <td key={i} className="px-2 py-1 border-b border-border text-xs text-foreground">{String(val ?? "")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
