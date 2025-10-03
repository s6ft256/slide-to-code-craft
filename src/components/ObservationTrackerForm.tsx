import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useSerialNumber } from "@/hooks/use-serial-number";

type ObservationStatus = "Open" | "Closed";
type ObservationType = "Safe" | "At-Risk" | "Improvement" | "Other";

export interface ObservationRecord {
  id: string;
  srno: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:MM
  observer: string;
  location: string;
  type: ObservationType;
  description: string;
  actionTaken: string;
  assignedTo: string;
  status: ObservationStatus;
  createdAt: string; // ISO
}

const getCurrentDateString = () => new Date().toISOString().split("T")[0];
const getCurrentTimeString = () => {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
};

const INITIAL: Omit<ObservationRecord, "id" | "srno" | "createdAt"> = {
  date: getCurrentDateString(),
  time: getCurrentTimeString(),
  observer: "",
  location: "",
  type: "Safe",
  description: "",
  actionTaken: "",
  assignedTo: "",
  status: "Open",
};

interface Props {
  onSuccess?: () => void;
}

export default function ObservationTrackerForm({ onSuccess }: Props) {
  const { getNextSerialNumber } = useSerialNumber("observation_tracker");
  const { toast } = useToast();
  const [srno, setSrno] = useState("");
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const n = await getNextSerialNumber();
      if (!mounted) return;
      setSrno(n || "001");
      // ensure date/time are fresh on mount
      setForm(prev => ({ ...prev, date: getCurrentDateString(), time: getCurrentTimeString() }));
    })();
    return () => { mounted = false; };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // basic validation
      if (!form.date) throw new Error("Date is required");
      if (!form.time) throw new Error("Time is required");
      if (!form.observer.trim()) throw new Error("Observer name is required");
      if (!form.description.trim()) throw new Error("Description is required");

      const record: ObservationRecord = {
        id: Date.now().toString(),
        srno,
        ...form,
        createdAt: new Date().toISOString(),
      };
      const key = "observation_tracker";
      const list: ObservationRecord[] = JSON.parse(localStorage.getItem(key) || "[]");
      list.push(record);
      localStorage.setItem(key, JSON.stringify(list));

      toast({ title: "Saved", description: "Observation recorded successfully" });
      if (onSuccess) onSuccess();

      // reset with new serial no and fresh date/time
      (async () => {
        const n = await getNextSerialNumber();
        setSrno(n || "");
      })();
      setForm({ ...INITIAL, date: getCurrentDateString(), time: getCurrentTimeString() });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save observation";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Observation Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="obs-srno">Sr. No</Label>
              <Input id="obs-srno" name="srno" value={srno} readOnly className="bg-muted" />
            </div>
            <div>
              <Label htmlFor="obs-date">Date</Label>
              <Input id="obs-date" name="date" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="obs-time">Time</Label>
              <Input id="obs-time" name="time" type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="obs-observer">Observer</Label>
              <Input id="obs-observer" name="observer" value={form.observer} onChange={e => setForm({ ...form, observer: e.target.value })} placeholder="Your name" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="obs-location">Location</Label>
              <Input id="obs-location" name="location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Area / Zone" />
            </div>
            <div>
              <Label htmlFor="obs-type">Observation Type</Label>
              <Select value={form.type} onValueChange={(v: ObservationType) => setForm({ ...form, type: v })}>
                <SelectTrigger id="obs-type" aria-label="Observation Type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Safe">Safe</SelectItem>
                  <SelectItem value="At-Risk">At-Risk</SelectItem>
                  <SelectItem value="Improvement">Improvement</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="obs-status">Status</Label>
              <RadioGroup value={form.status} onValueChange={(v: ObservationStatus) => setForm({ ...form, status: v })}>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="obs-status-open" value="Open" />
                    <Label htmlFor="obs-status-open">Open</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="obs-status-closed" value="Closed" />
                    <Label htmlFor="obs-status-closed">Closed</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="obs-description">Observation Details</Label>
              <Textarea id="obs-description" name="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe what you observed" rows={3} required />
            </div>
            <div>
              <Label htmlFor="obs-action">Action Taken</Label>
              <Textarea id="obs-action" name="actionTaken" value={form.actionTaken} onChange={e => setForm({ ...form, actionTaken: e.target.value })} placeholder="Immediate corrective action (if any)" rows={3} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="obs-assigned">Assigned To</Label>
              <Input id="obs-assigned" name="assignedTo" value={form.assignedTo} onChange={e => setForm({ ...form, assignedTo: e.target.value })} placeholder="Person responsible" />
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-3">
            <Button type="reset" variant="outline" onClick={() => setForm({ ...INITIAL, date: getCurrentDateString(), time: getCurrentTimeString() })}>Clear</Button>
            <Button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Save Observation"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
