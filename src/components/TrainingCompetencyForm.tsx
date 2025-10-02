import React, { useState } from "react";

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

type TrainingCompetencyRecord = Record<string, string | number>;

export default function TrainingCompetencyForm({ onSubmit }: { onSubmit?: (data: TrainingCompetencyRecord) => void }) {
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
    try {
      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem('training_competency_register') || '[]');
      const newRecord = { ...form, id: Date.now().toString(), createdAt: new Date().toISOString() };
      existingData.push(newRecord);
      localStorage.setItem('training_competency_register', JSON.stringify(existingData));
      
      setSuccess(true);
      if (onSubmit) onSubmit(form);
      setForm(initialForm);
    } catch (err) {
      setError((err as Error).message || "Failed to save data");
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
