import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type EventRecord = {
  id: string;
  srNo: string;
  date: string;
  typeOfActivity: string;
  titleTopic: string;
  numberOfAttendees: string;
  supervisors: string;
  siteEngineer: string;
  projectEngineer: string;
  deptManagersLead: string;
  projectManager: string;
  projectDirector: string;
  hseTeam: string;
  corporateHSE: string;
  topManagement: string;
  activityLeader: string;
  activityLeaderDesignation: string;
  projectSeniorManagementInvolvement: string;
  corporateManagementInvolvement: string;
  remarks: string;
  createdAt: string;
};

export default function EventRecords() {
  const [records, setRecords] = useState<EventRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      try {
        const data = JSON.parse(localStorage.getItem('event_records') || '[]');
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
    return <div className="p-4 text-muted-foreground">Loading event records...</div>;
  }

  if (error) {
    return <div className="p-4 text-destructive">Error: {error}</div>;
  }

  if (records.length === 0) {
    return <div className="p-4 text-muted-foreground">No event records found.</div>;
  }

  return (
    <Card className="max-w-3xl mx-auto mb-6">
      <CardHeader>
        <CardTitle>Event Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="min-w-full border border-border rounded text-xs bg-card">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Sr.No</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Date</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Type of Activity</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Title / Topic</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Number of attendees</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Supervisors</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Site Engineer</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Project Engineer</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Dept Managers Lead</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Project Manager</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Project Director</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">HSE team</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Corporate HSE</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Top Management</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Activity Leader</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Activity Leader Designation</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Project Senior Management Involvement</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Corporate Management Involvement</th>
                <th className="border border-border px-2 py-1 text-left text-muted-foreground">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row) => (
                <tr key={row.id} className="hover:bg-muted/50">
                  <td className="border border-border px-2 py-1 text-foreground">{row.srNo}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.date}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.typeOfActivity}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.titleTopic}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.numberOfAttendees}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.supervisors}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.siteEngineer}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.projectEngineer}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.deptManagersLead}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.projectManager}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.projectDirector}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.hseTeam}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.corporateHSE}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.topManagement}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.activityLeader}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.activityLeaderDesignation}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.projectSeniorManagementInvolvement}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.corporateManagementInvolvement}</td>
                  <td className="border border-border px-2 py-1 text-foreground">{row.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
