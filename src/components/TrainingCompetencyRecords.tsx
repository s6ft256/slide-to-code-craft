import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function TrainingCompetencyRecords() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from("training_competency_register").select("*");
      if (error) setError(error.message);
      setRecords(data || []);
      setLoading(false);
    }
    fetchRecords();
  }, []);

  if (loading) return <div>Loading records...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!records.length) return <div>No records found.</div>;

  return (
    <div className="overflow-auto">
      <table className="min-w-full border rounded">
        <thead>
          <tr>
            {Object.keys(records[0]).map((key) => (
              <th key={key} className="px-2 py-1 border-b bg-gray-100 text-xs font-semibold text-gray-700">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {Object.values(row).map((val, i) => (
                <td key={i} className="px-2 py-1 border-b text-xs">{String(val ?? "")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
