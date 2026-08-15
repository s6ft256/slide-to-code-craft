import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ObservationRecord {
  id: string;
  srno: string;
  date: string;
  time: string;
  observer: string;
  location: string;
  type: string;
  status: string;
}

export default function ObservationTrackerRecords() {
  const [records, setRecords] = useState<ObservationRecord[]>([]);

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem("observation_tracker") || "[]");
      setRecords(Array.isArray(list) ? list.reverse() : []);
    } catch {
      setRecords([]);
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Observation Records</CardTitle>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center">No records yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">Sr.No</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Time</th>
                  <th className="py-2 pr-4">Observer</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Location</th>
                </tr>
              </thead>
              <tbody>
                {records.map(r => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="py-2 pr-4 font-medium">{r.srno}</td>
                    <td className="py-2 pr-4">{r.date}</td>
                    <td className="py-2 pr-4">{r.time}</td>
                    <td className="py-2 pr-4">{r.observer}</td>
                    <td className="py-2 pr-4">{r.type}</td>
                    <td className="py-2 pr-4">{r.status}</td>
                    <td className="py-2 pr-4">{r.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
