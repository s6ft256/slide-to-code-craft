import React, { useState } from "react";

// List of all fields for the MASTER REGISTER form
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
  { name: "weeklyHSEInspectionScore", label: "Weekly HSE Inspection -Score", type: "number" },
  { name: "expectedWasteGeneration", label: "Expected Waste Generation (in tonnes)", type: "number" },
  { name: "actualWasteGeneration", label: "Actual Waste Generation (in tonnes)", type: "number" },
  { name: "wasteRecycledPercent", label: "Waste Recycled in %", type: "number" },
  { name: "envSamplingAir", label: "Environmental Sampling Conducted (Air)", type: "checkbox" },
  { name: "envSamplingNoise", label: "Environmental Sampling Conducted (Noise)", type: "checkbox" },
  { name: "fuelConsumption", label: "Fuel Consumption (Litres)", type: "number" },
  { name: "nonHazWasteDisposalTonnes", label: "Non- Hazardous Waste Disposal (tonnes)", type: "number" },
  { name: "nonHazWasteDisposalL", label: "Non- Hazardous Waste Disposal (l)", type: "number" },
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
  { name: "lostWorkdayCase", label: "Lost Workday Case ( LWDC)", type: "number" },
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
  { name: "internalTrainingsSessions", label: "Internal Trainings  ( No of sessions)", type: "number" },
  { name: "internalTrainingHours", label: "Internal  Training Hours", type: "number" },
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
  { name: "ncrsExternal", label: "NCRS  (External)", type: "number" },
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
  { name: "kpiNoOfAssessedTrainingPerEmployee", label: "KPI - No  of Assessed Training per employee", type: "number" },
  { name: "overallProjectPerformance", label: "Overall Project Performance", type: "number" },
  { name: "reportingMonthYear", label: "Reporting Month / Year", type: "string" }
];

export default function MasterRegisterForm({ onSubmit }: { onSubmit?: (data: Record<string, string | number | boolean>) => void }) {
  const initialForm = Object.fromEntries(fields.map(f => [f.name, f.type === "checkbox" ? false : ""]));
  const [form, setForm] = useState<Record<string, string | number | boolean>>(initialForm);

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4" onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.name} className="flex flex-col">
          <label className="font-medium mb-1" htmlFor={field.name}>{field.label}</label>
          {field.type === "checkbox" ? (
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-1">
                <input
                  id={field.name}
                  name={field.name}
                  type="checkbox"
                  checked={form[field.name] === true}
                  onChange={() => setForm(f => ({ ...f, [field.name]: true }))}
                  className="border rounded"
                /> Yes
              </label>
              <label className="flex items-center gap-1">
                <input
                  id={field.name + "_no"}
                  name={field.name + "_no"}
                  type="checkbox"
                  checked={form[field.name] === false}
                  onChange={() => setForm(f => ({ ...f, [field.name]: false }))}
                  className="border rounded"
                /> No
              </label>
            </div>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type === "date" ? "date" : field.type}
              value={String(form[field.name] ?? "")}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            />
          )}
        </div>
      ))}
      <button type="submit" className="col-span-full bg-blue-600 text-white py-2 rounded mt-4" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
      {error && <div className="col-span-full text-red-600 mt-2">{error}</div>}
      {success && <div className="col-span-full text-green-600 mt-2">Saved successfully!</div>}
    </form>
  );
}
