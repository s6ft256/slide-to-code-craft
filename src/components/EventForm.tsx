import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const initialState = {
  srNo: "",
  date: "",
  typeOfActivity: "",
  titleTopic: "",
  numberOfAttendees: "",
  supervisors: "",
  siteEngineer: "",
  projectEngineer: "",
  deptManagersLead: "",
  projectManager: "",
  projectDirector: "",
  hseTeam: "",
  corporateHSE: "",
  topManagement: "",
  activityLeader: "",
  activityLeaderDesignation: "",
  projectSeniorManagementInvolvement: "",
  corporateManagementInvolvement: "",
  remarks: ""
};

export default function EventForm({ onSubmit }: { onSubmit?: (data: typeof initialState) => void }) {
  const [form, setForm] = useState(initialState);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
    setForm(initialState);
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Add Event Record</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <Input name="srNo" value={form.srNo} onChange={handleChange} placeholder="Sr.No" />
          <Input name="date" value={form.date} onChange={handleChange} placeholder="Date" type="date" />
          <Input name="typeOfActivity" value={form.typeOfActivity} onChange={handleChange} placeholder="Type of Activity" />
          <Input name="titleTopic" value={form.titleTopic} onChange={handleChange} placeholder="Title / Topic" />
          <Input name="numberOfAttendees" value={form.numberOfAttendees} onChange={handleChange} placeholder="Number of attendees" />
          <Input name="supervisors" value={form.supervisors} onChange={handleChange} placeholder="Supervisors" />
          <Input name="siteEngineer" value={form.siteEngineer} onChange={handleChange} placeholder="Site Engineer" />
          <Input name="projectEngineer" value={form.projectEngineer} onChange={handleChange} placeholder="Project Engineer" />
          <Input name="deptManagersLead" value={form.deptManagersLead} onChange={handleChange} placeholder="Dept Managers Lead" />
          <Input name="projectManager" value={form.projectManager} onChange={handleChange} placeholder="Project Manager" />
          <Input name="projectDirector" value={form.projectDirector} onChange={handleChange} placeholder="Project Director" />
          <Input name="hseTeam" value={form.hseTeam} onChange={handleChange} placeholder="HSE team" />
          <Input name="corporateHSE" value={form.corporateHSE} onChange={handleChange} placeholder="Corporate HSE" />
          <Input name="topManagement" value={form.topManagement} onChange={handleChange} placeholder="Top Management" />
          <Input name="activityLeader" value={form.activityLeader} onChange={handleChange} placeholder="Activity Leader" />
          <Input name="activityLeaderDesignation" value={form.activityLeaderDesignation} onChange={handleChange} placeholder="Activity Leader Designation" />
          <Input name="projectSeniorManagementInvolvement" value={form.projectSeniorManagementInvolvement} onChange={handleChange} placeholder="Project Senior Management Involvement" />
          <Input name="corporateManagementInvolvement" value={form.corporateManagementInvolvement} onChange={handleChange} placeholder="Corporate Management Involvement" />
          <Input name="remarks" value={form.remarks} onChange={handleChange} placeholder="Remarks" />
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
