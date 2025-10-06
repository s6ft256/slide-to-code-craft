import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Shield, Save } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface HSEViolationData {
  employee: string;
  violationNo: string;
  reportedTo: string;
  date: Date | undefined;
  reportedBy: string;
  dateOfIncident: Date | undefined;
  contactInformation: string;
  reportType: string;
  violators: string;
  location: string;
  safetyCodesBroken: string;
  descriptionOfEvent: string;
  nextCourseOfAction: string;
}

const HSEViolationForm = () => {
  const [formData, setFormData] = useState<HSEViolationData>({
    employee: "",
    violationNo: `VIO-${Date.now()}`,
    reportedTo: "",
    date: new Date(),
    reportedBy: "",
    dateOfIncident: undefined,
    contactInformation: "",
    reportType: "",
    violators: "",
    location: "",
    safetyCodesBroken: "",
    descriptionOfEvent: "",
    nextCourseOfAction: "",
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof HSEViolationData, value: string | Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.employee || !formData.reportedTo || !formData.reportedBy ||
          !formData.dateOfIncident || !formData.reportType || !formData.location ||
          !formData.safetyCodesBroken || !formData.descriptionOfEvent) {
        throw new Error("Please fill in all required fields");
      }

      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem('hse_violations') || '[]');
      const newRecord = {
        ...formData,
        date: formData.date?.toISOString(),
        dateOfIncident: formData.dateOfIncident?.toISOString(),
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };

      existingData.push(newRecord);
      localStorage.setItem('hse_violations', JSON.stringify(existingData));

      // Dispatch custom event to notify dashboard of localStorage changes
      window.dispatchEvent(new CustomEvent('localStorageUpdate', { detail: { key: 'hse_violations' } }));

      toast({
        title: "HSE Violation Recorded",
        description: `Violation ${formData.violationNo} has been recorded successfully.`,
        duration: 3000,
      });

      // Reset form with new violation number
      setFormData({
        employee: "",
        violationNo: `VIO-${Date.now() + 1}`,
        reportedTo: "",
        date: new Date(),
        reportedBy: "",
        dateOfIncident: undefined,
        contactInformation: "",
        reportType: "",
        violators: "",
        location: "",
        safetyCodesBroken: "",
        descriptionOfEvent: "",
        nextCourseOfAction: "",
      });

    } catch (error) {
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save HSE violation record",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          HSE Violation Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="employee">Employee <span className="text-red-500">*</span></Label>
                <Input
                  id="employee"
                  value={formData.employee}
                  onChange={(e) => handleInputChange('employee', e.target.value)}
                  placeholder="Enter employee name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="violationNo">Violation No</Label>
                <Input
                  id="violationNo"
                  value={formData.violationNo}
                  onChange={(e) => handleInputChange('violationNo', e.target.value)}
                  placeholder="Auto-generated violation number"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reportedTo">Reported to <span className="text-red-500">*</span></Label>
                <Input
                  id="reportedTo"
                  value={formData.reportedTo}
                  onChange={(e) => handleInputChange('reportedTo', e.target.value)}
                  placeholder="Supervisor / Department"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => handleInputChange('date', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reportedBy">Reported by <span className="text-red-500">*</span></Label>
                <Input
                  id="reportedBy"
                  value={formData.reportedBy}
                  onChange={(e) => handleInputChange('reportedBy', e.target.value)}
                  placeholder="Reporter's name and position"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Date of Incident <span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dateOfIncident && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfIncident ? format(formData.dateOfIncident, "PPP") : "Pick incident date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfIncident}
                      onSelect={(date) => handleInputChange('dateOfIncident', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactInformation">Contact Information</Label>
                <Input
                  id="contactInformation"
                  value={formData.contactInformation}
                  onChange={(e) => handleInputChange('contactInformation', e.target.value)}
                  placeholder="Phone, email, or office"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type <span className="text-red-500">*</span></Label>
                <Select value={formData.reportType} onValueChange={(value) => handleInputChange('reportType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mail">Mail</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="in-person">In Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Violation Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Violation Details</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="violators">Violator(s)</Label>
                <Textarea
                  id="violators"
                  value={formData.violators}
                  onChange={(e) => handleInputChange('violators', e.target.value)}
                  placeholder="List full names and roles of individuals who committed or witnessed the violation"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Specify exact location (site, area, floor, section, etc.)"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="safetyCodesBroken">Safety Code(s) Broken <span className="text-red-500">*</span></Label>
                <Textarea
                  id="safetyCodesBroken"
                  value={formData.safetyCodesBroken}
                  onChange={(e) => handleInputChange('safetyCodesBroken', e.target.value)}
                  placeholder="Identify specific safety rule(s), regulation(s), or company policy violated"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionOfEvent">Description of Event <span className="text-red-500">*</span></Label>
                <Textarea
                  id="descriptionOfEvent"
                  value={formData.descriptionOfEvent}
                  onChange={(e) => handleInputChange('descriptionOfEvent', e.target.value)}
                  placeholder="Describe in detail what occurred, including time, sequence of events, witnesses, and any immediate actions taken"
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nextCourseOfAction">Next Course of Action</Label>
                <Textarea
                  id="nextCourseOfAction"
                  value={formData.nextCourseOfAction}
                  onChange={(e) => handleInputChange('nextCourseOfAction', e.target.value)}
                  placeholder="Outline corrective actions, retraining, disciplinary measures, or preventive recommendations to avoid recurrence"
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {loading ? "Saving..." : "Save HSE Violation"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default HSEViolationForm;
