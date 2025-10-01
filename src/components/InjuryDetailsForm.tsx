import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const fields = [
	{ name: "srNo", label: "Sr.no", type: "number" },
	{ name: "incidentRef", label: "Incident Ref", type: "string" },
	{ name: "incidentDate", label: "Incident Date", type: "date" },
	{ name: "typeOfInjury", label: "Type of Injury", type: "string" },
	{ name: "bodyPartInjured", label: "Body part Injured", type: "string" },
	{
		name: "natureOfInjuryIllness",
		label: "Nature of Injury / Illness",
		type: "string",
	},
	{
		name: "mechanismOfInjuryIllness",
		label: "Mechanism of Injury / Illness",
		type: "string",
	},
	{
		name: "agencySourceOfInjuryIllness",
		label: "Agency / Source of Injury / Illness",
		type: "string",
	},
	{ name: "emiratesIdOfIP", label: "Emirates ID of IP", type: "string" },
	{ name: "employeeIdOfIP", label: "Employee ID of IP", type: "string" },
	{ name: "ipName", label: "IP Name", type: "string" },
	{ name: "trade", label: "Trade", type: "string" },
	{ name: "ipStatus", label: "IP Status", type: "string" },
	{ name: "isLTI", label: "Is it an LTI ?", type: "checkbox" },
	{ name: "backToWorkDate", label: "Back to work date", type: "date" },
	{ name: "timeOffDays", label: "Time Off (Days)", type: "number" },
	{ name: "weekEndingOn", label: "Week Ending On", type: "date" },
];

import type { Database } from "@/integrations/supabase/types";

type InjuryDetailsInsert = Database["public"]["Tables"]["injury_details"]["Insert"];

export default function InjuryDetailsForm({
	onSubmit,
}: {
	onSubmit?: (data: InjuryDetailsInsert) => void;
}) {
	const initialForm: InjuryDetailsInsert = Object.fromEntries(
		fields.map((f) => [f.name, f.type === "checkbox" ? false : ""])
	) as InjuryDetailsInsert;

	const [form, setForm] = useState<InjuryDetailsInsert>(initialForm);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, type, value, checked } = e.target;
		const fieldDef = fields.find((f) => f.name === name);
		let newValue: string | number | boolean = value;
		if (fieldDef?.type === "checkbox") {
			newValue = checked;
		} else if (fieldDef?.type === "number") {
			newValue = value === "" ? "" : Number(value);
		}
		setForm((f) => ({ ...f, [name]: newValue }));
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(false);

		const supabaseData: InjuryDetailsInsert = { ...form };

		try {
			const { error: supabaseError } = await supabase
				.from("injury_details")
				.insert([supabaseData]);

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
		<form
			className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
			onSubmit={handleSubmit}
		>
			{fields.map((field) => (
				<div key={field.name} className="flex flex-col">
					<label
						className="font-medium mb-1"
						htmlFor={field.name}
					>
						{field.label}
					</label>
					{field.type === "checkbox" ? (
						<div className="flex gap-4 items-center">
							<label className="flex items-center gap-1">
								<input
									id={field.name}
									name={field.name}
									type="checkbox"
									checked={form[field.name] === true}
									onChange={() =>
										setForm((f) => ({ ...f, [field.name]: true }))
									}
									className="border rounded"
								/>{" "}
								Yes
							</label>
							<label className="flex items-center gap-1">
								<input
									id={field.name + "_no"}
									name={field.name + "_no"}
									type="checkbox"
									checked={form[field.name] === false}
									onChange={() =>
										setForm((f) => ({ ...f, [field.name]: false }))
									}
									className="border rounded"
								/>{" "}
								No
							</label>
						</div>
					) : (
						<input
							id={field.name}
							name={field.name}
							type={
								field.type === "date" ? "date" : field.type
							}
							value={String(form[field.name] ?? "")}
							onChange={handleChange}
							className="border rounded px-2 py-1"
						/>
					)}
				</div>
			))}
			<button
				type="submit"
				className="col-span-full bg-blue-600 text-white py-2 rounded mt-4"
				disabled={loading}
			>
				{loading ? "Saving..." : "Save"}
			</button>
			{error && (
				<div className="col-span-full text-red-600 mt-2">{error}</div>
			)}
			{success && (
				<div className="col-span-full text-green-600 mt-2">
					Saved successfully!
				</div>
			)}
		</form>
	);
}
