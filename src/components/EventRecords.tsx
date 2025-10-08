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
    return <div className="p-4">Loading event records...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
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
          <table className="min-w-full border rounded text-xs">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Date</th>
                <th>Type of Activity</th>
                <th>Title / Topic</th>
                <th>Number of attendees</th>
                <th>Supervisors</th>
                <th>Site Engineer</th>
                <th>Project Engineer</th>
                <th>Dept Managers Lead</th>
                <th>Project Manager</th>
                <th>Project Director</th>
                <th>HSE team</th>
                <th>Corporate HSE</th>
                <th>Top Management</th>
                <th>Activity Leader</th>
                <th>Activity Leader Designation</th>
                <th>Project Senior Management Involvement</th>
                <th>Corporate Management Involvement</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row) => (
                <tr key={row.id}>
                  <td>{row.srNo}</td>
                  <td>{row.date}</td>
                  <td>{row.typeOfActivity}</td>
                  <td>{row.titleTopic}</td>
                  <td>{row.numberOfAttendees}</td>
                  <td>{row.supervisors}</td>
                  <td>{row.siteEngineer}</td>
                  <td>{row.projectEngineer}</td>
                  <td>{row.deptManagersLead}</td>
                  <td>{row.projectManager}</td>
                  <td>{row.projectDirector}</td>
                  <td>{row.hseTeam}</td>
                  <td>{row.corporateHSE}</td>
                  <td>{row.topManagement}</td>
                  <td>{row.activityLeader}</td>
                  <td>{row.activityLeaderDesignation}</td>
                  <td>{row.projectSeniorManagementInvolvement}</td>
                  <td>{row.corporateManagementInvolvement}</td>
                  <td>{row.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
