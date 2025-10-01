import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const fields = [
  { name: "srNo", label: "Sr.no", type: "number" },
  { name: "reference", label: "Reference", type: "string" },
  { name: "issuedDate", label: "Issued Date", type: "date" },
  { name: "location", label: "Location", type: "string" },
  { name: "areaSection", label: "Area/Section", type: "string" },
  { name: "subject", label: "Subject", type: "string" },
  { name: "description", label: "Description", type: "string" },
  { name: "source", label: "Source", type: "string" },
  { name: "typeOfNCR", label: "Type of NCR (SVR/SWN/MAJOR/MINOR)", type: "string" },
  { name: "typeInternalExternal", label: "Type (Internal /External)", type: "string" },
  { name: "responsibleCompanyName", label: "Responsible Company Name", type: "string" },
  { name: "responsibleDept", label: "Responsible Dept", type: "string" },
  { name: "proposedDateOfClosure", label: "Proposed date of closure", type: "date" },
  { name: "actualDateOfClosure", label: "Actual date of closure", type: "date" },
  { name: "status", label: "Status", type: "string" },
  { name: "daysToClose", label: "Days to Close", type: "number" },
  { name: "remarks", label: "Remarks", type: "string" }
];

import { Database } from "@/integrations/supabase/types";

type CNRRecord = Database["public"]["Tables"]["cnr_tracker"]["Insert"];

export default function CNRTrackerForm({ onSubmit }: { onSubmit?: (data: CNRRecord) => void }) {
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
      reference: "reference",
      issuedDate: "issueddate",
      location: "location",
      areaSection: "areasection",
      subject: "subject",
      description: "description",
      source: "source",
      typeOfNCR: "typeofncr",
      typeInternalExternal: "typeinternalexternal",
      responsibleCompanyName: "responsiblecompanyname",
      responsibleDept: "responsibledept",
      proposedDateOfClosure: "proposeddateofclosure",
      actualDateOfClosure: "actualdateofclosure",
      status: "status",
      daysToClose: "daystoclose",
      remarks: "remarks",
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
        .from("cnr_tracker")
        .insert([supabaseData as CNRRecord]);
      if (supabaseError) {
        setError(supabaseError.message);
      } else {
        setSuccess(true);
        if (onSubmit) onSubmit(form);
        setForm(initialForm);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
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
