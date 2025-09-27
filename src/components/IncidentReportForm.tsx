import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const IncidentReportForm = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
                <Label htmlFor="srNo">Sr. No</Label>
                <Input id="srNo" placeholder="Enter serial number" />
              </div>
              <div>
                <Label htmlFor="incidentDate">Incident Date</Label>
                <Input id="incidentDate" type="date" />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="reportRef">Report Reference</Label>
                <Input id="reportRef" placeholder="Enter report reference" />
              </div>
              <div>
                <Label htmlFor="section">Section</Label>
                <Select>
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
                <Input id="location" placeholder="Enter location" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="incidentOwner">Incident Owner</Label>
                <RadioGroup>
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
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" placeholder="Enter company name" />
              </div>
            </div>

            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea id="shortDescription" placeholder="Describe the incident briefly" rows={3} />
            </div>

            <Separator />

            {/* Event Classification */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Event Classification</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="eventCategory">Event Category</Label>
                  <Select>
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
                  <Label htmlFor="eventType">Event Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="injury">Injury</SelectItem>
                      <SelectItem value="near-miss">Near Miss</SelectItem>
                      <SelectItem value="property-damage">Property Damage</SelectItem>
                      <SelectItem value="environmental">Environmental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="numberOfInjuries">Number of Injuries</Label>
                  <Input id="numberOfInjuries" type="number" min="0" placeholder="0" />
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
                    <Checkbox id={item.replace(/[^a-zA-Z0-9]/g, '')} />
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
                  <Label htmlFor="severityActual">Severity (Actual)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select actual severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
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
                  <Input id="activity" placeholder="Describe the activity" />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input id="type" placeholder="Enter type" />
                </div>
              </div>

              <div>
                <Label htmlFor="immediateCause">Immediate Cause</Label>
                <Textarea id="immediateCause" placeholder="Describe the immediate cause" rows={2} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contributory1">Immediate/Contributory 1</Label>
                  <Input id="contributory1" placeholder="First contributory factor" />
                </div>
                <div>
                  <Label htmlFor="contributory2">Immediate/Contributory 2</Label>
                  <Input id="contributory2" placeholder="Second contributory factor" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contributory3">Immediate/Contributory 3</Label>
                  <Input id="contributory3" placeholder="Third contributory factor" />
                </div>
                <div>
                  <Label htmlFor="contributory4">Immediate/Contributory 4</Label>
                  <Input id="contributory4" placeholder="Fourth contributory factor" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="rootCause">Root/Basic Cause</Label>
                  <Textarea id="rootCause" placeholder="Describe the root cause" rows={2} />
                </div>
                <div>
                  <Label htmlFor="systemDeficiency">System Deficiency</Label>
                  <Textarea id="systemDeficiency" placeholder="Describe system deficiency" rows={2} />
                </div>
              </div>
            </div>

            <Separator />

            {/* Reporting Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Reporting Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="dateReported">Date Reported</Label>
                  <Input id="dateReported" type="date" />
                </div>
                <div>
                  <Label htmlFor="reportedWithin24hrs">Reported within 24hrs?</Label>
                  <RadioGroup>
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
                  <Label htmlFor="dateFinalReport">Date of Final Report</Label>
                  <Input id="dateFinalReport" type="date" />
                </div>
                <div>
                  <Label htmlFor="reportedOnTime">Reported on Time</Label>
                  <RadioGroup>
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
                  <Label htmlFor="eventReviewRequired">Event Review Required</Label>
                  <RadioGroup>
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
                  <Label htmlFor="eventReviewHeld">Event Review Held</Label>
                  <RadioGroup>
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
                  <Label htmlFor="raised">Raised</Label>
                  <Input id="raised" type="date" />
                </div>
                <div>
                  <Label htmlFor="open">Open</Label>
                  <Input id="open" type="date" />
                </div>
                <div>
                  <Label htmlFor="closed">Closed</Label>
                  <Input id="closed" type="date" />
                </div>
                <div>
                  <Label htmlFor="closedOnTime">Closed on Time</Label>
                  <RadioGroup>
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
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">
                Submit Report
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentReportForm;