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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem('event_records') || '[]');
      const newRecord = { ...form, id: Date.now().toString(), createdAt: new Date().toISOString() };
      existingData.push(newRecord);
      localStorage.setItem('event_records', JSON.stringify(existingData));

      // Dispatch custom event to notify dashboard of localStorage changes
      window.dispatchEvent(new CustomEvent('localStorageUpdate', { detail: { key: 'event_records' } }));

      setSuccess(true);
      if (onSubmit) onSubmit(form);
      setForm(initialState);
    } catch (err) {
      setError((err as Error).message || "Failed to save data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Add Event Record</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <Input id="srNo" name="srNo" value={form.srNo} onChange={handleChange} placeholder="Sr.No" />
          <Input id="date" name="date" value={form.date} onChange={handleChange} placeholder="Date" type="date" />
          <Input id="typeOfActivity" name="typeOfActivity" value={form.typeOfActivity} onChange={handleChange} placeholder="Type of Activity" />
          <Input id="titleTopic" name="titleTopic" value={form.titleTopic} onChange={handleChange} placeholder="Title / Topic" />
          <Input id="numberOfAttendees" name="numberOfAttendees" value={form.numberOfAttendees} onChange={handleChange} placeholder="Number of attendees" />
          <Input id="supervisors" name="supervisors" value={form.supervisors} onChange={handleChange} placeholder="Supervisors" />
          <Input id="siteEngineer" name="siteEngineer" value={form.siteEngineer} onChange={handleChange} placeholder="Site Engineer" />
          <Input id="projectEngineer" name="projectEngineer" value={form.projectEngineer} onChange={handleChange} placeholder="Project Engineer" />
          <Input id="deptManagersLead" name="deptManagersLead" value={form.deptManagersLead} onChange={handleChange} placeholder="Dept Managers Lead" />
          <Input id="projectManager" name="projectManager" value={form.projectManager} onChange={handleChange} placeholder="Project Manager" />
          <Input id="projectDirector" name="projectDirector" value={form.projectDirector} onChange={handleChange} placeholder="Project Director" />
          <Input id="hseTeam" name="hseTeam" value={form.hseTeam} onChange={handleChange} placeholder="HSE team" />
          <Input id="corporateHSE" name="corporateHSE" value={form.corporateHSE} onChange={handleChange} placeholder="Corporate HSE" />
          <Input id="topManagement" name="topManagement" value={form.topManagement} onChange={handleChange} placeholder="Top Management" />
          <Input id="activityLeader" name="activityLeader" value={form.activityLeader} onChange={handleChange} placeholder="Activity Leader" />
          <Input id="activityLeaderDesignation" name="activityLeaderDesignation" value={form.activityLeaderDesignation} onChange={handleChange} placeholder="Activity Leader Designation" />
          <Input id="projectSeniorManagementInvolvement" name="projectSeniorManagementInvolvement" value={form.projectSeniorManagementInvolvement} onChange={handleChange} placeholder="Project Senior Management Involvement" />
          <Input id="corporateManagementInvolvement" name="corporateManagementInvolvement" value={form.corporateManagementInvolvement} onChange={handleChange} placeholder="Corporate Management Involvement" />
          <Input id="remarks" name="remarks" value={form.remarks} onChange={handleChange} placeholder="Remarks" />
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Submit"}
            </Button>
          </div>
          {error && <div className="md:col-span-2 text-red-600 mt-2">{error}</div>}
          {success && <div className="md:col-span-2 text-green-600 mt-2">Saved successfully!</div>}
        </form>
      </CardContent>
    </Card>
  );
}
