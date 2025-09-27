import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const fields = [
  { name: "srNo", label: "Sr.No", type: "number" },
  { name: "sorNo", label: "SOR NO", type: "string" },
  { name: "reportRefNo", label: "Report Ref. No", type: "string" },
  { name: "dateOfIssue", label: "Date of issue", type: "date" },
  { name: "observations", label: "Observations", type: "string" },
  { name: "location", label: "Location", type: "string" },
  { name: "riskLevel", label: "Risk Level", type: "string" },
  { name: "recommendations", label: "Recommendations", type: "string" },
  { name: "contractor", label: "Contractor", type: "string" },
  { name: "actionBy", label: "Action by", type: "string" },
  { name: "ucUa", label: "UC/UA", type: "string" },
  { name: "category", label: "Category", type: "string" },
  { name: "dateClosed", label: "Date Closed", type: "date" },
  { name: "status", label: "Status", type: "string" }
];

export default function ObservationTrackerForm({ onSubmit }: { onSubmit?: (data: any) => void }) {
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

    // Map field names to match Supabase schema
    const fieldMapping: Record<string, string> = {
      srNo: "srno",
      sorNo: "sorno",
      reportRefNo: "reportrefno",
      dateOfIssue: "dateofissue",
      observations: "observations",
      location: "location",
      riskLevel: "risklevel",
      recommendations: "recommendations",
      contractor: "contractor",
      actionBy: "actionby",
      ucUa: "ucua",
      category: "category",
      dateClosed: "dateclosed",
      status: "status"
    };

    for (const field of fields) {
      const supabaseField = fieldMapping[field.name];
      let val = form[field.name];
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
  .from("observation_tracker")
  .insert([supabaseData as import("@/integrations/supabase/types").Database["public"]["Tables"]["observation_tracker"]["Insert"]]);
      if (supabaseError) {
        setError(supabaseError.message);
      } else {
        setSuccess(true);
        if (onSubmit) onSubmit(form);
        setForm(initialForm);
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
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
