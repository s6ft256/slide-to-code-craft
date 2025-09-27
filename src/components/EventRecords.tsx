import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const mockRecords = [
  {
    srNo: "01",
    date: "2025-09-01",
    typeOfActivity: "Safety Meeting",
    titleTopic: "Fire Drill",
    numberOfAttendees: "20",
    supervisors: "John Doe",
    siteEngineer: "Jane Smith",
    projectEngineer: "Bob Lee",
    deptManagersLead: "Alice Brown",
    projectManager: "Tom White",
    projectDirector: "Sara Black",
    hseTeam: "HSE Team",
    corporateHSE: "Corp HSE",
    topManagement: "CEO",
    activityLeader: "Mike Green",
    activityLeaderDesignation: "Lead",
    projectSeniorManagementInvolvement: "Yes",
    corporateManagementInvolvement: "Yes",
    remarks: "Successful"
  }
];

export default function EventRecords() {
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
              {mockRecords.map((row, idx) => (
                <tr key={idx}>
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
