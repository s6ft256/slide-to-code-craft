import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const fields = [
  { name: "srNo", label: "Sr.No", type: "number" },
  { name: "dateOfTraining", label: "Date of Training", type: "date" },
  { name: "noOfAttendees", label: "No of attendees", type: "number" },
  { name: "trainingCourseTitle", label: "Training/Course Title", type: "string" },
  { name: "score", label: "Score", type: "number" },
  { name: "internalExternal", label: "Internal /External", type: "string" },
  { name: "trainingProvider", label: "Training Provider", type: "string" },
  { name: "trainingDurationHrs", label: "Training Duration (in hrs)", type: "number" },
  { name: "trainingHours", label: "Training hours", type: "number" },
  { name: "empIdEid", label: "EMP ID / EID", type: "string" },
  { name: "name", label: "Name", type: "string" },
  { name: "designation", label: "Designation", type: "string" },
  { name: "company", label: "Company", type: "string" },
  { name: "certificateReference", label: "Certificate Reference", type: "string" },
  { name: "trainingCertificateValidity", label: "Training / Certificate Validity", type: "string" }
];

import type { Database } from "@/integrations/supabase/types";

type TrainingCompetencyInsert = Database["public"]["Tables"]["training_competency_register"]["Insert"];

export default function TrainingCompetencyForm({ onSubmit }: { onSubmit?: (data: TrainingCompetencyInsert) => void }) {
  const initialForm = Object.fromEntries(fields.map(f => [f.name, ""]));
  const [form, setForm] = useState<Record<string, string | number>>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, value } = e.target;
    const fieldDef = fields.find(f => f.name === name);
    let newValue: string | number = value;
    if (fieldDef?.type === "number") {
      newValue = value === "" ? "" : Number(value);
    }
    setForm(f => ({ ...f, [name]: newValue }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const supabaseData: Record<string, string | number | null> = {};
    const fieldMapping: Record<string, string> = {
      srNo: "srno",
      dateOfTraining: "dateoftraining",
      noOfAttendees: "noofattendees",
      trainingCourseTitle: "trainingcoursetitle",
      score: "score",
      internalExternal: "internalexternal",
      trainingProvider: "trainingprovider",
      trainingDurationHrs: "trainingdurationhrs",
      trainingHours: "traininghours",
      empIdEid: "empideid",
      name: "name",
      designation: "designation",
      company: "company",
      certificateReference: "certificatereference",
      trainingCertificateValidity: "trainingcertificatevalidity",
    };

    for (const field of fields) {
      const supabaseField = fieldMapping[field.name];
  const val = form[field.name];
      if (field.type === "number") {
        supabaseData[supabaseField] = val === "" ? null : Number(val);
      } else if (field.type === "date") {
        supabaseData[supabaseField] = val === "" ? null : String(val);
      } else {
        supabaseData[supabaseField] = val === "" ? null : val;
      }
    }
    try {
      const { error: supabaseError } = await supabase
  .from("training_competency_register")
  .insert([supabaseData as import("@/integrations/supabase/types").Database["public"]["Tables"]["training_competency_register"]["Insert"]]);
      if (supabaseError) {
        setError(supabaseError.message);
      } else {
        setSuccess(true);
        if (onSubmit) onSubmit(form);
        setForm(initialForm);
      }
    } catch (err) {
      setError((err as Error).message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4" onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.name} className="flex flex-col">
          <label className="font-medium mb-1" htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type === "date" ? "date" : field.type}
            value={String(form[field.name] ?? "")}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
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
