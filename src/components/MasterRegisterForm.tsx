import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type FieldType = "string" | "number" | "boolean" | "date" | "checkbox";
interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
}
const fields: FieldDef[] = [
  { name: "nonHazWasteDisposalL", label: "Non-Hazardous Waste Disposal (l)", type: "number" },
  { name: "hazWasteDisposalSolidTonnes", label: "Hazardous Waste Disposal - Solid(tonnes)", type: "number" },
  { name: "hazWasteDisposalLiquidL", label: "Hazardous Waste Disposal -liquid (l)", type: "number" },
  { name: "waterConsumption", label: "Water Consumption (in m3)", type: "number" },
  { name: "level5", label: "Level 5", type: "number" },
  { name: "level4", label: "Level 4", type: "number" },
  { name: "level3", label: "Level 3", type: "number" },
  { name: "level2", label: "Level 2", type: "number" },
  { name: "level1", label: "Level 1", type: "number" },
  { name: "hipoIncidents", label: "HiPo incidents", type: "number" },
  { name: "envIncidentMajor", label: "Environmental Incident - Major", type: "number" },
  { name: "envIncidentModerate", label: "Environmental Incident - Moderate", type: "number" },
  { name: "envIncidentMinor", label: "Environmental Incident - Minor", type: "number" },
  { name: "totalLTI", label: "Total LTI", type: "number" },
  { name: "fatalities", label: "Fatalities (F)", type: "number" },
  { name: "ptd", label: "Permanent Total Disability (PTD)", type: "number" },
  { name: "ppd", label: "Permanent Partial Disability (PPD)", type: "number" },
  { name: "lostWorkdayCase", label: "Lost Workday Case (LWDC)", type: "number" },
  { name: "lostWorkdaysInjuries", label: "Lost Workdays Injuries", type: "number" },
  { name: "lostWorkdaysIllness", label: "Lost Workdays Occupational Illness", type: "number" },
  { name: "noOfLostWorkDays", label: "No of Lost Work Days", type: "number" },
  { name: "seriousDangerousOccurrence", label: "Serious Dangerous Occurrence (As per OSHAD Mechanism 11, Schedule A)", type: "number" },
  { name: "rwdc", label: "Restricted Work Day Case (RWDC)", type: "number" },
  { name: "mtc", label: "Medical Treatment Case (MTC)", type: "number" },
  { name: "fac", label: "First Aid cases (FAC)", type: "number" },
  { name: "equipmentPropertyDamages", label: "Equipment/Property Damages (excluding serious dangerous occurrences)", type: "number" },
  { name: "fireIncidents", label: "Fire Incidents (excluding serious dangerous occurrences)", type: "number" },
  { name: "nearMiss", label: "Near Miss", type: "number" },
  { name: "securityIncidents", label: "Security Incidents", type: "number" },
  { name: "totalTrainingHours", label: "Total Training Hours", type: "number" },
  { name: "inductionAttendees", label: "Induction Attendees", type: "number" },
  { name: "noOfAssessedTrainings", label: "No of Assessed Trainings", type: "number" },
  { name: "noOfAssessedTrainingsPerEmployee", label: "No of Assessed trainings / per employee", type: "number" },
  { name: "avgTrainingPerEmployee", label: "Average Training Per employee", type: "number" },
  { name: "externalTrainingHours", label: "External Training Hours", type: "number" },
  { name: "externalTrainingAttendees", label: "External Training -#Attendees", type: "number" },
  { name: "internalTrainingsSessions", label: "Internal Trainings (No of sessions)", type: "number" },
  { name: "internalTrainingHours", label: "Internal Training Hours", type: "number" },
  { name: "internalTrainingAttendees", label: "Internal Training -#Attendees", type: "number" },
  { name: "drills", label: "Drills", type: "number" },
  { name: "safetyInspectionsConducted", label: "Safety Inspections Conducted", type: "number" },
  { name: "safetyObservationsRaised", label: "Safety Observations raised", type: "number" },
  { name: "safetyObservationsOpen", label: "Safety Observations Open", type: "number" },
  { name: "safetyObservationsClosed", label: "Safety Observations closed", type: "number" },
  { name: "safetyObservationsOverdue", label: "Safety Observations Overdue", type: "number" },
  { name: "avgResolutionTimeNCR", label: "Average Resolution Time For NCR", type: "number" },
  { name: "totalNCRS", label: "Total NCRS", type: "number" },
  { name: "totalNCRClosed", label: "Total NCR closed", type: "number" },
  { name: "totalStopWorkNotices", label: "Total Stop Work Notices", type: "number" },
  { name: "internalHSEAudit", label: "Internal HSE Audit", type: "number" },
  { name: "sraExternalHSEAudit", label: "SRA / External HSE Audit", type: "number" },
  { name: "ncrsInternal", label: "NCRS (Internal)", type: "number" },
  { name: "ncrsInternalClosed", label: "NCRS (Internal) closed", type: "number" },
  { name: "ncrsExternal", label: "NCRS (External)", type: "number" },
  { name: "ncrsExternalClosed", label: "NCRS (External) Closed", type: "number" },
  { name: "stopWorkNoticeExternal", label: "Stop Work Notice (External)", type: "number" },
  { name: "stopWorkNoticeInternal", label: "Stop Work Notice (Internal)", type: "number" },
  { name: "hseEnforcementAction", label: "HSE Enforcement Action from authorities (such as Penalties, Notices)", type: "number" },
  { name: "tbtSessions", label: "TBT sessions", type: "number" },
  { name: "tbtAttendees", label: "TBT Attendees", type: "number" },
  { name: "managementWalks", label: "Management Walks", type: "number" },
  { name: "managementMeetings", label: "Management Meetings", type: "number" },
  { name: "committeeMeetings", label: "Committee Meetings", type: "number" },
  { name: "hseMeetings", label: "HSE Meetings", type: "number" },
  { name: "awards", label: "Awards", type: "number" },
  { name: "campaigns", label: "Campaigns", type: "number" },
  { name: "ltifr", label: "LTIFR", type: "number" },
  { name: "ltisr", label: "LTISR", type: "number" },
  { name: "kpiRatingART", label: "KPI Rating - ART", type: "number" },
  { name: "kpiHSECompliance", label: "KPI - HSE Compliance", type: "number" },
  { name: "kpiRatingStopWork", label: "KPI rating - Stop Work", type: "number" },
  { name: "kpiPercentNCRClosed", label: "KPI-% of NCR Closed", type: "number" },
  { name: "kpiPercentObservationsClosed", label: "KPI -Percentage of Observations Closed", type: "number" },
  { name: "kpiRatingHSEWeeklyInspection", label: "KPI Rating - HSE Weekly Inspection", type: "number" },
  { name: "kpiPercentActionClosureIncidents", label: "KPI % of Action Closure from Incidents", type: "number" },
  { name: "kpiRatingEnforcementActions", label: "KPI Rating - Enforcement Actions", type: "number" },
  { name: "kpiRatingLTIFR", label: "KPI Rating - LTIFR", type: "number" },
  { name: "kpiRatingLTISR", label: "KPI Rating - LTISR", type: "number" },
  { name: "kpiEmergencyPreparednessDrills", label: "KPI-Emergency Preparedness (Drills)", type: "number" },
  { name: "kpiEnvironmentSustainability", label: "KPI - Environment and Sustainability", type: "number" },
  { name: "kpiWasteRecycled", label: "KPI - Waste Recycled", type: "number" },
  { name: "kpiWasteReductionRate", label: "KPI - Waste Reduction Rate", type: "number" },
  { name: "kpiRatingWaterConsumption", label: "KPI rating - Water Consumption", type: "number" },
  { name: "kpiLeadership", label: "KPI - Leadership", type: "number" },
  { name: "kpiRatingManagementWalk", label: "KPI Rating - Management Walk", type: "number" },
  { name: "kpiRatingManagementMeetings", label: "KPI rating - Management Meetings", type: "number" },
  { name: "kpiRatingCommitteeMeeting", label: "KPI Rating - Committee Meeting", type: "number" },
  { name: "kpiRatingAward", label: "KPI rating - Award", type: "number" },
  { name: "kpiRatingCampaigns", label: "KPI Rating - Campaigns", type: "number" },
  { name: "kpiTrainingOverall", label: "KPI - Training Overall", type: "number" },
  { name: "kpiAvgTrainingPerEmployee", label: "KPI-Average Training Per employee", type: "number" },
  { name: "kpiNoOfAssessedTrainingPerEmployee", label: "KPI - No of Assessed Training per employee", type: "number" },
  { name: "overallProjectPerformance", label: "Overall Project Performance", type: "number" },
  { name: "reportingMonthYear", label: "Reporting Month / Year", type: "string" }
];

export default function MasterRegisterForm({ onSubmit }: { onSubmit?: (data: Record<string, string | number | boolean>) => void }) {
  const initialForm = Object.fromEntries(fields.map(f => [f.name, f.type === "checkbox" ? false : ""]));
  const [form, setForm] = useState<Record<string, string | number | boolean>>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, value, checked } = e.target;
    const fieldDef = fields.find(f => f.name === name);
    let newValue: string | number | boolean = value;
    if (fieldDef?.type === "checkbox") {
      newValue = checked;
    } else if (fieldDef?.type === "number") {
      newValue = value === "" ? "" : Number(value);
    }
    setForm(f => ({ ...f, [name]: newValue }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Save to localStorage under 'master_register'
      const key = 'master_register';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      const newRecord = { ...form, id: Date.now().toString(), createdAt: new Date().toISOString() };
      if (Array.isArray(existing)) {
        existing.push(newRecord);
        localStorage.setItem(key, JSON.stringify(existing));
      } else {
        localStorage.setItem(key, JSON.stringify([newRecord]));
      }
      setSuccess(true);
      if (onSubmit) onSubmit(form);
      setForm(initialForm);
    } catch (err) {
      setError((err as Error).message || 'Failed to save data');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Master Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map(field => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-medium">{field.label}</Label>
                {field.type === "checkbox" ? (
                  <Select value={form[field.name] ? "Yes" : "No"} onValueChange={val => setForm(f => ({ ...f, [field.name]: val === "Yes" }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                ) : field.type === "date" ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !form[field.name] && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form[field.name] ? (
                          format(new Date(form[field.name] as string), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={form[field.name] ? new Date(form[field.name] as string) : undefined}
                        onSelect={date => setForm(f => ({ ...f, [field.name]: date ? format(date, 'yyyy-MM-dd') : "" }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={String(form[field.name] ?? "")}
                    onChange={handleChange}
                    placeholder={field.label}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Master Register Record"}
            </Button>
          </div>
          {error && (
            <div className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 text-sm mt-2 p-2 bg-green-50 rounded">
              Master Register record added successfully!
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
