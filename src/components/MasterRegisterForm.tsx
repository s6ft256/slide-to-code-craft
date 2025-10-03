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
  { name: "weekEndingOn", label: "Week Ending On", type: "date" },
  { name: "trojanManhours", label: "Trojan General Contracting Manhours", type: "number" },
  { name: "npcManhours", label: "NPC Manhours", type: "number" },
  { name: "otherSubconsManhours", label: "Other Subcons Manhours", type: "number" },
  { name: "totalManhours", label: "Total Manhours", type: "number" },
  { name: "trojanManpower", label: "Trojan General Contracting Manpower", type: "number" },
  { name: "npcManpower", label: "NPC Manpower", type: "number" },
  { name: "otherSubconManpower", label: "Other Subcon Manpower", type: "number" },
  { name: "totalManpower", label: "Total Manpower", type: "number" },
  { name: "weeklyHSEInspectionScore", label: "Weekly HSE Inspection Score", type: "number" },
  { name: "expectedWasteGeneration", label: "Expected Waste Generation (tonnes)", type: "number" },
  { name: "actualWasteGeneration", label: "Actual Waste Generation (tonnes)", type: "number" },
  { name: "wasteRecycledPercent", label: "Waste Recycled (%)", type: "number" },
  { name: "envSamplingAir", label: "Environmental Sampling Conducted (Air)", type: "checkbox" },
  { name: "envSamplingNoise", label: "Environmental Sampling Conducted (Noise)", type: "checkbox" },
  { name: "fuelConsumption", label: "Fuel Consumption (Litres)", type: "number" },
  { name: "nonHazWasteDisposalTonnes", label: "Non-Hazardous Waste Disposal (tonnes)", type: "number" },
  { name: "nonHazWasteDisposalL", label: "Non-Hazardous Waste Disposal (litres)", type: "number" },
  { name: "hazWasteDisposalSolidTonnes", label: "Hazardous Waste Disposal - Solid (tonnes)", type: "number" },
  { name: "hazWasteDisposalLiquidL", label: "Hazardous Waste Disposal - Liquid (litres)", type: "number" },
  { name: "waterConsumption", label: "Water Consumption (m³)", type: "number" },
  { name: "level5", label: "Level 5 Incidents", type: "number" },
  { name: "level4", label: "Level 4 Incidents", type: "number" },
  { name: "level3", label: "Level 3 Incidents", type: "number" },
  { name: "level2", label: "Level 2 Incidents", type: "number" },
  { name: "level1", label: "Level 1 Incidents", type: "number" },
  { name: "hipoIncidents", label: "HiPo Incidents", type: "number" },
  { name: "envIncidentMajor", label: "Environmental Incident - Major", type: "number" },
  { name: "envIncidentModerate", label: "Environmental Incident - Moderate", type: "number" },
  { name: "envIncidentMinor", label: "Environmental Incident - Minor", type: "number" },
  { name: "totalLTI", label: "Total LTI", type: "number" },
  { name: "fatalities", label: "Fatalities (F)", type: "number" },
  { name: "ptd", label: "Permanent Total Disability (PTD)", type: "number" },
  { name: "ppd", label: "Permanent Partial Disability (PPD)", type: "number" },
  { name: "lostWorkdayCase", label: "Lost Workday Case (LWDC)", type: "number" },
  { name: "lostWorkdaysInjuries", label: "Lost Workdays - Injuries", type: "number" },
  { name: "lostWorkdaysIllness", label: "Lost Workdays - Occupational Illness", type: "number" },
  { name: "noOfLostWorkDays", label: "Total Lost Work Days", type: "number" },
  { name: "seriousDangerousOccurrence", label: "Serious Dangerous Occurrence (OSHA Schedule A)", type: "number" },
  { name: "rwdc", label: "Restricted Work Day Case (RWDC)", type: "number" },
  { name: "mtc", label: "Medical Treatment Case (MTC)", type: "number" },
  { name: "fac", label: "First Aid Cases (FAC)", type: "number" },
  { name: "equipmentPropertyDamages", label: "Equipment/Property Damages", type: "number" },
  { name: "fireIncidents", label: "Fire Incidents", type: "number" },
  { name: "nearMiss", label: "Near Miss", type: "number" },
  { name: "securityIncidents", label: "Security Incidents", type: "number" },
  { name: "totalTrainingHours", label: "Total Training Hours", type: "number" },
  { name: "inductionAttendees", label: "Induction Attendees", type: "number" },
  { name: "noOfAssessedTrainings", label: "Number of Assessed Trainings", type: "number" },
  { name: "avgTrainingPerEmployee", label: "Average Training Hours Per Employee", type: "number" },
  { name: "externalTrainingHours", label: "External Training Hours", type: "number" },
  { name: "externalTrainingAttendees", label: "External Training Attendees", type: "number" },
  { name: "internalTrainingHours", label: "Internal Training Hours", type: "number" },
  { name: "internalTrainingAttendees", label: "Internal Training Attendees", type: "number" },
  { name: "drills", label: "Emergency Drills Conducted", type: "number" },
  { name: "safetyInspectionsConducted", label: "Safety Inspections Conducted", type: "number" },
  { name: "safetyObservationsRaised", label: "Safety Observations Raised", type: "number" },
  { name: "safetyObservationsOpen", label: "Safety Observations Open", type: "number" },
  { name: "safetyObservationsClosed", label: "Safety Observations Closed", type: "number" },
  { name: "safetyObservationsOverdue", label: "Safety Observations Overdue", type: "number" },
  { name: "avgResolutionTimeNCR", label: "Average NCR Resolution Time (days)", type: "number" },
  { name: "totalNCRS", label: "Total NCRs", type: "number" },
  { name: "totalNCRClosed", label: "Total NCRs Closed", type: "number" },
  { name: "totalStopWorkNotices", label: "Total Stop Work Notices", type: "number" },
  { name: "internalHSEAudit", label: "Internal HSE Audits", type: "number" },
  { name: "sraExternalHSEAudit", label: "External HSE Audits", type: "number" },
  { name: "hseEnforcementAction", label: "HSE Enforcement Actions", type: "number" },
  { name: "tbtSessions", label: "TBT Sessions", type: "number" },
  { name: "tbtAttendees", label: "TBT Attendees", type: "number" },
  { name: "managementWalks", label: "Management Walks", type: "number" },
  { name: "managementMeetings", label: "Management Meetings", type: "number" },
  { name: "committeeMeetings", label: "Committee Meetings", type: "number" },
  { name: "hseMeetings", label: "HSE Meetings", type: "number" },
  { name: "awards", label: "Awards Received", type: "number" },
  { name: "campaigns", label: "Campaigns Conducted", type: "number" },
  { name: "ltifr", label: "LTIFR", type: "number" },
  { name: "ltisr", label: "LTISR", type: "number" },
  { name: "overallProjectPerformance", label: "Overall Project Performance", type: "number" },
  { name: "reportingMonthYear", label: "Reporting Month/Year", type: "string" }
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

  // Group fields into logical sections for better UI
  const sections = [
    {
      title: "Manpower & Hours",
      fields: fields.filter(f => ["weekEndingOn","trojanManhours","npcManhours","otherSubconsManhours","totalManhours","trojanManpower","npcManpower","otherSubconManpower","totalManpower"].includes(f.name))
    },
    {
      title: "Waste & Environment",
      fields: fields.filter(f => ["expectedWasteGeneration","actualWasteGeneration","wasteRecycledPercent","envSamplingAir","envSamplingNoise","fuelConsumption","nonHazWasteDisposalTonnes","nonHazWasteDisposalL","hazWasteDisposalSolidTonnes","hazWasteDisposalLiquidL","waterConsumption"].includes(f.name))
    },
    {
      title: "Incidents & Safety",
      fields: fields.filter(f => ["level5","level4","level3","level2","level1","hipoIncidents","envIncidentMajor","envIncidentModerate","envIncidentMinor","totalLTI","fatalities","ptd","ppd","lostWorkdayCase","lostWorkdaysInjuries","lostWorkdaysIllness","noOfLostWorkDays","seriousDangerousOccurrence","rwdc","mtc","fac","equipmentPropertyDamages","fireIncidents","nearMiss","securityIncidents"].includes(f.name))
    },
    {
      title: "Training & Meetings",
      fields: fields.filter(f => ["totalTrainingHours","inductionAttendees","noOfAssessedTrainings","avgTrainingPerEmployee","externalTrainingHours","externalTrainingAttendees","internalTrainingHours","internalTrainingAttendees","drills","safetyInspectionsConducted","safetyObservationsRaised","safetyObservationsOpen","safetyObservationsClosed","safetyObservationsOverdue","tbtSessions","tbtAttendees","managementWalks","managementMeetings","committeeMeetings","hseMeetings","awards","campaigns"].includes(f.name))
    },
    {
      title: "NCR & Audits",
      fields: fields.filter(f => ["avgResolutionTimeNCR","totalNCRS","totalNCRClosed","totalStopWorkNotices","internalHSEAudit","sraExternalHSEAudit","hseEnforcementAction"].includes(f.name))
    },
    {
      title: "Performance Metrics",
      fields: fields.filter(f => ["ltifr","ltisr","overallProjectPerformance","reportingMonthYear"].includes(f.name))
    }
  ];

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Master Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {sections.map(section => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">{section.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.fields.map(field => (
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
            </div>
          ))}
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
