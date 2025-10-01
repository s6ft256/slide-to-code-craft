import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSerialNumber } from "@/hooks/use-serial-number";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

// Database schema type
// Match exact Supabase schema
interface IncidentReportDB {
  id?: number;
  srno: string | null;
  incidentdate: string | null;
  time: string | null;
  reportref: string | null;
  section: string | null;
  details: string | null; // This will store the additional details as a JSON string
}

// Additional details type
interface IncidentDetails {
  description: string;
  location: string;
  incident_owner: string;
  company_name: string;
  event_category: string;
  incident_type: string;
  injuries: number;
  impact_details: string[];
  severity: string;
  potential_severity: string;
  activity: string;
  incident_subtype: string;
  immediate_cause: string;
  contributory_factors: string[];
  root_cause: string;
  system_deficiency: string;
  date_reported: string;
  reported_24hrs: boolean;
  final_report_date: string;
  reported_ontime: boolean;
  review_required: boolean;
  review_held: boolean;
  raised_date: string;
  open_date: string;
  closed_date: string | null;
  closed_ontime: boolean;
  status: string;
}

// Combined form data type
interface FormData extends IncidentReportDB {
  additionalDetails: IncidentDetails;
}

const getCurrentDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const initialIncidentDetails: IncidentDetails = {
  description: "",
  location: "",
  incident_owner: "",
  company_name: "",
  event_category: "",
  incident_type: "",
  injuries: 0,
  impact_details: [],
  severity: "",
  potential_severity: "",
  activity: "",
  incident_subtype: "",
  immediate_cause: "",
  contributory_factors: ["", "", "", ""],
  root_cause: "",
  system_deficiency: "",
  date_reported: getCurrentDateString(),
  reported_24hrs: true,
  final_report_date: "",
  reported_ontime: true,
  review_required: false,
  review_held: false,
  raised_date: getCurrentDateString(),
  open_date: getCurrentDateString(),
  closed_date: null,
  closed_ontime: false,
  status: "Open"
};

const initialFormData: FormData = {
  srno: "",
  incidentdate: "",
  time: "",
  reportref: "",
  section: "",
  details: "",
  additionalDetails: initialIncidentDetails
};

interface IncidentReportFormProps {
  onSuccess?: () => void;
}

type IncidentInsert = Database["public"]["Tables"]["incident_reports"]["Insert"];

const IncidentReportForm = ({ onSuccess }: IncidentReportFormProps) => {
  const { getNextSerialNumber } = useSerialNumber('incident_report' as const);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeSerialNumber = async () => {
      const nextSN = await getNextSerialNumber();
      if (nextSN) {
        setFormData(prev => ({ ...prev, srno: nextSN }));
      }
    };
    initializeSerialNumber();
  }, [getNextSerialNumber]);

  const validateForm = () => {
    // Validate required fields
    if (!formData.srno) {
      throw new Error("Serial number is required");
    }
    if (!formData.incidentdate) {
      throw new Error("Incident date is required");
    }
    if (!formData.time) {
      throw new Error("Incident time is required");
    }
    if (!formData.section) {
      throw new Error("Section is required");
    }
    if (!formData.additionalDetails.description) {
      throw new Error("Incident description is required");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      validateForm();

      // Prepare the database submission
      // Ensure all fields match database schema exactly
      const submissionData: IncidentReportDB = {
        srno: formData.srno || null,
        incidentdate: formData.incidentdate || null,
        time: formData.time || null,
        reportref: formData.reportref || null,
        section: formData.section || null,
        details: formData.additionalDetails ? JSON.stringify(formData.additionalDetails) : null
      };

      console.log('Submitting to Supabase:', submissionData); // Debug log

      console.log('Submitting data:', submissionData); // Debug log

      console.log('Making Supabase request to incident_report table');
      const { data, error } = await supabase
        .from('incident_report')
        .insert([submissionData])
        .select();

      console.log('Supabase response - data:', data); // Debug log
      console.log('Supabase response - error:', error); // Debug log

      if (error) {
        console.error('Detailed Supabase error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(`Database error: ${error.message}`);
      }

      if (!data || data.length === 0) {
        console.warn('No data returned after successful insert');
      } else {
        console.log('Successfully inserted record:', data[0]);
      }

      if (!result.data || result.data.length === 0) {
        throw new Error('No data returned after insert');
      }

      console.log('Submission successful:', result.data);

      toast({
        title: "Success",
        description: "Incident report submitted successfully",
        variant: "success",
      });

      if (onSuccess) {
        onSuccess();
      } else {
        // Reset form if not navigating away
        const nextSN = await getNextSerialNumber();
        setFormData({
          ...initialFormData,
          srno: nextSN || ""
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMessage = "Failed to submit incident report. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = String((error as { message: string }).message);
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof IncidentReportDB | keyof IncidentDetails, value: string | number | boolean | string[] | null) => {
    if (field in initialFormData) {
      // Handle main form fields
      setFormData(prev => ({ ...prev, [field]: value }));
    } else {
      // Handle additional details
      setFormData(prev => ({
        ...prev,
        additionalDetails: {
          ...prev.additionalDetails,
          [field]: value
        }
      }));
    }
  };

  const handleImpactChange = (item: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalDetails: {
        ...prev.additionalDetails,
        impact_details: checked
          ? [...prev.additionalDetails.impact_details, item]
          : prev.additionalDetails.impact_details.filter(i => i !== item)
      }
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">
            Incident Report Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="srno">Sr. No</Label>
                <Input 
                  id="srno" 
                  value={formData.srno} 
                  readOnly 
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor="incidentdate">Incident Date</Label>
                <Input 
                  id="incidentdate" 
                  type="date"
                  value={formData.incidentdate}
                  onChange={(e) => handleChange("incidentdate", e.target.value)}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time" 
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="reportref">Report Reference</Label>
                <Input 
                  id="reportref"
                  value={formData.reportref}
                  onChange={(e) => handleChange("reportref", e.target.value)}
                  placeholder="Enter report reference" 
                />
              </div>
              <div>
                <Label htmlFor="section">Section</Label>
                <Select
                  value={formData.section}
                  onValueChange={(value) => handleChange("section", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location"
                  value={formData.additionalDetails.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Enter location" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Incident Owner</Label>
                <RadioGroup
                  value={formData.additionalDetails.incident_owner}
                  onValueChange={(value) => handleChange("incident_owner", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tcg" id="tcg" />
                    <Label htmlFor="tcg">TCG</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="company_name">Company Name</Label>
                <Input 
                  id="company_name"
                  value={formData.additionalDetails.company_name}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                  placeholder="Enter company name" 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                value={formData.additionalDetails.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe the incident"
                required
                rows={3} 
              />
            </div>

            <Separator />

            {/* Event Classification */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Event Classification</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="event_category">Event Category</Label>
                  <Select
                    value={formData.additionalDetails.event_category}
                    onValueChange={(value) => handleChange("event_category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="operational">Operational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="incident_type">Event Type</Label>
                  <Select
                    value={formData.additionalDetails.incident_type}
                    onValueChange={(value) => handleChange("incident_type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Near Miss">Near Miss</SelectItem>
                      <SelectItem value="Minor Injury">Minor Injury</SelectItem>
                      <SelectItem value="Major Injury">Major Injury</SelectItem>
                      <SelectItem value="Property Damage">Property Damage</SelectItem>
                      <SelectItem value="Environmental">Environmental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="injuries">Number of Injuries</Label>
                  <Input 
                    id="injuries"
                    type="number"
                    min="0"
                    value={formData.additionalDetails.injuries}
                    onChange={(e) => handleChange("injuries", parseInt(e.target.value))}
                    placeholder="0" 
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Impact Assessment */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Impact Assessment</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "No harm/damage",
                  "No treatment",
                  "Assets/Property/Equipment Damage",
                  "Serious Dangerous Occurrence (SDO)",
                  "Fire/Explosion",
                  "Spills/release/Discharge to land",
                  "Spills/release/Discharge to water",
                  "Release/Discharge to Atmosphere",
                  "Vegetation Removal/Harm",
                  "Damage to Heritage Site",
                  "Environmental Noise/Vibration",
                  "Stolen Assets"
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.replace(/[^a-zA-Z0-9]/g, '')}
                      checked={formData.additionalDetails.impact_details.includes(item)}
                      onCheckedChange={(checked) => 
                        handleImpactChange(item, checked as boolean)
                      }
                    />
                    <Label htmlFor={item.replace(/[^a-zA-Z0-9]/g, '')} className="text-sm">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Severity Assessment */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Severity Assessment</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="severity">Severity (Actual)</Label>
                  <Select
                    value={formData.additionalDetails.severity}
                    onValueChange={(value) => handleChange("severity", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select actual severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="severityPotential">Severity (Potential)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select potential severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Activity and Causes */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Activity & Cause Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="activity">Activity</Label>
                  <Input 
                    id="activity"
                    value={formData.additionalDetails.activity}
                    onChange={(e) => handleChange("activity", e.target.value)}
                    placeholder="Describe the activity" 
                  />
                </div>
                <div>
                  <Label htmlFor="incident_subtype">Type</Label>
                  <Input 
                    id="incident_subtype"
                    value={formData.additionalDetails.incident_subtype}
                    onChange={(e) => handleChange("incident_subtype", e.target.value)}
                    placeholder="Enter type" 
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="immediate_cause">Immediate Cause</Label>
                <Textarea 
                  id="immediate_cause"
                  value={formData.additionalDetails.immediate_cause}
                  onChange={(e) => handleChange("immediate_cause", e.target.value)}
                  placeholder="Describe the immediate cause"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[0, 1].map((index) => (
                  <div key={`contributory${index + 1}`}>
                    <Label htmlFor={`contributory${index + 1}`}>
                      Immediate/Contributory {index + 1}
                    </Label>
                    <Input
                      id={`contributory${index + 1}`}
                      value={formData.additionalDetails.contributory_factors[index]}
                      onChange={(e) => {
                        const newFactors = [...formData.additionalDetails.contributory_factors];
                        newFactors[index] = e.target.value;
                        handleChange("contributory_factors", newFactors);
                      }}
                      placeholder={`Contributory factor ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[2, 3].map((index) => (
                  <div key={`contributory${index + 1}`}>
                    <Label htmlFor={`contributory${index + 1}`}>
                      Immediate/Contributory {index + 1}
                    </Label>
                    <Input
                      id={`contributory${index + 1}`}
                      value={formData.additionalDetails.contributory_factors[index]}
                      onChange={(e) => {
                        const newFactors = [...formData.additionalDetails.contributory_factors];
                        newFactors[index] = e.target.value;
                        handleChange("contributory_factors", newFactors);
                      }}
                      placeholder={`Contributory factor ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="root_cause">Root/Basic Cause</Label>
                  <Textarea 
                    id="root_cause"
                    value={formData.additionalDetails.root_cause}
                    onChange={(e) => handleChange("root_cause", e.target.value)}
                    placeholder="Describe the root cause"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="system_deficiency">System Deficiency</Label>
                  <Textarea 
                    id="system_deficiency"
                    value={formData.additionalDetails.system_deficiency}
                    onChange={(e) => handleChange("system_deficiency", e.target.value)}
                    placeholder="Describe system deficiency"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Reporting Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Reporting Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="date_reported">Date Reported</Label>
                  <Input 
                    id="date_reported"
                    type="date"
                    value={formData.additionalDetails.date_reported}
                    onChange={(e) => handleChange("date_reported", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="reported_24hrs">Reported within 24hrs?</Label>
                  <RadioGroup
                    value={formData.additionalDetails.reported_24hrs ? "yes" : "no"}
                    onValueChange={(value) => handleChange("reported_24hrs", value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="reported-yes" />
                      <Label htmlFor="reported-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="reported-no" />
                      <Label htmlFor="reported-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="final_report_date">Date of Final Report</Label>
                  <Input 
                    id="final_report_date"
                    type="date"
                    value={formData.additionalDetails.final_report_date}
                    onChange={(e) => handleChange("final_report_date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="reported_ontime">Reported on Time</Label>
                  <RadioGroup
                    value={formData.additionalDetails.reported_ontime ? "yes" : "no"}
                    onValueChange={(value) => handleChange("reported_ontime", value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="ontime-yes" />
                      <Label htmlFor="ontime-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="ontime-no" />
                      <Label htmlFor="ontime-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <Separator />

            {/* Event Review */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Event Review</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="review_required">Event Review Required</Label>
                  <RadioGroup
                    value={formData.additionalDetails.review_required ? "yes" : "no"}
                    onValueChange={(value) => handleChange("review_required", value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="review-required-yes" />
                      <Label htmlFor="review-required-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="review-required-no" />
                      <Label htmlFor="review-required-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="review_held">Event Review Held</Label>
                  <RadioGroup
                    value={formData.additionalDetails.review_held ? "yes" : "no"}
                    onValueChange={(value) => handleChange("review_held", value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="review-held-yes" />
                      <Label htmlFor="review-held-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="review-held-no" />
                      <Label htmlFor="review-held-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <Separator />

            {/* Status Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Status</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <Label htmlFor="raised_date">Raised</Label>
                  <Input 
                    id="raised_date"
                    type="date"
                    value={formData.additionalDetails.raised_date}
                    onChange={(e) => handleChange("raised_date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="open_date">Open</Label>
                  <Input 
                    id="open_date"
                    type="date"
                    value={formData.additionalDetails.open_date}
                    onChange={(e) => handleChange("open_date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="closed_date">Closed</Label>
                  <Input 
                    id="closed_date"
                    type="date"
                    value={formData.additionalDetails.closed_date || ''}
                    onChange={(e) => handleChange("closed_date", e.target.value || null)}
                  />
                </div>
                <div>
                  <Label htmlFor="closed_ontime">Closed on Time</Label>
                  <RadioGroup
                    value={formData.additionalDetails.closed_ontime ? "yes" : "no"}
                    onValueChange={(value) => handleChange("closed_ontime", value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="closed-ontime-yes" />
                      <Label htmlFor="closed-ontime-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="closed-ontime-no" />
                      <Label htmlFor="closed-ontime-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Report'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentReportForm;