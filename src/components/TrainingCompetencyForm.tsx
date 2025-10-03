import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type TrainingCompetencyRecord = {
  srNo: string;
  dateOfTraining: Date | undefined;
  trainingCourseTitle: string;
  trainingProvider: string;
  trainingDurationHrs: string;
  trainingHours: string;
  internalExternal: string;
  empIdEid: string;
  name: string;
  designation: string;
  company: string;
  score: string;
  noOfAttendees: string;
  certificateReference: string;
  trainingCertificateValidity: string;
};

const TrainingCompetencyForm = ({ onSubmit }: { onSubmit?: (data: TrainingCompetencyRecord) => void }) => {
  const [formData, setFormData] = useState<TrainingCompetencyRecord>({
    srNo: "",
    dateOfTraining: undefined,
    trainingCourseTitle: "",
    trainingProvider: "",
    trainingDurationHrs: "",
    trainingHours: "",
    internalExternal: "",
    empIdEid: "",
    name: "",
    designation: "",
    company: "",
    score: "",
    noOfAttendees: "",
    certificateReference: "",
    trainingCertificateValidity: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  // Generate Sr.No
  useEffect(() => {
    const generateSrNo = () => {
      const existingData = JSON.parse(localStorage.getItem('training_competency_register') || '[]');
      const nextSrNo = (existingData.length + 1).toString().padStart(3, '0');
      setFormData(prev => ({ ...prev, srNo: nextSrNo }));
    };
    generateSrNo();
  }, []);

  const handleInputChange = (field: keyof TrainingCompetencyRecord, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      dateOfTraining: date
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate required fields
      if (!formData.trainingCourseTitle || !formData.name || !formData.empIdEid) {
        throw new Error("Please fill in all required fields");
      }

      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem('training_competency_register') || '[]');
      const newRecord = {
        ...formData,
        dateOfTraining: formData.dateOfTraining ? format(formData.dateOfTraining, 'yyyy-MM-dd') : null,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      existingData.push(newRecord);
      localStorage.setItem('training_competency_register', JSON.stringify(existingData));

      // Dispatch custom event to notify dashboard of localStorage changes
      window.dispatchEvent(new CustomEvent('localStorageUpdate', { detail: { key: 'training_competency_register' } }));

      setSuccess(true);
      toast({
        title: "Success",
        description: "Training record added successfully!",
      });

      // Reset form
      setFormData({
        srNo: "",
        dateOfTraining: undefined,
        trainingCourseTitle: "",
        trainingProvider: "",
        trainingDurationHrs: "",
        trainingHours: "",
        internalExternal: "",
        empIdEid: "",
        name: "",
        designation: "",
        company: "",
        score: "",
        noOfAttendees: "",
        certificateReference: "",
        trainingCertificateValidity: ""
      });

      if (onSubmit) onSubmit(formData);

    } catch (err) {
      setError((err as Error).message);
      toast({
        title: "Error",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Training & Competency Record</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sr.No */}
              <div className="space-y-2">
                <Label htmlFor="srNo" className="text-sm font-medium">
                  Sr.No
                </Label>
                <Input
                  id="srNo"
                  name="srNo"
                  value={formData.srNo}
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              {/* Date of Training */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Date of Training</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dateOfTraining && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfTraining ? (
                        format(formData.dateOfTraining, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfTraining}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Training/Course Title */}
              <div className="space-y-2">
                <Label htmlFor="trainingCourseTitle" className="text-sm font-medium">
                  Training/Course Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="trainingCourseTitle"
                  name="trainingCourseTitle"
                  value={formData.trainingCourseTitle}
                  onChange={(e) => handleInputChange('trainingCourseTitle', e.target.value)}
                  placeholder="Enter training course title"
                  required
                />
              </div>
            </div>
          </div>

          {/* Training Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Training Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Training Provider */}
              <div className="space-y-2">
                <Label htmlFor="trainingProvider" className="text-sm font-medium">
                  Training Provider
                </Label>
                <Input
                  id="trainingProvider"
                  name="trainingProvider"
                  value={formData.trainingProvider}
                  onChange={(e) => handleInputChange('trainingProvider', e.target.value)}
                  placeholder="Enter training provider name"
                />
              </div>

              {/* Training Duration (in hrs) */}
              <div className="space-y-2">
                <Label htmlFor="trainingDurationHrs" className="text-sm font-medium">
                  Training Duration (hrs)
                </Label>
                <Input
                  id="trainingDurationHrs"
                  name="trainingDurationHrs"
                  type="number"
                  value={formData.trainingDurationHrs}
                  onChange={(e) => handleInputChange('trainingDurationHrs', e.target.value)}
                  placeholder="Enter duration in hours"
                />
              </div>

              {/* Training Hours */}
              <div className="space-y-2">
                <Label htmlFor="trainingHours" className="text-sm font-medium">
                  Training Hours
                </Label>
                <Input
                  id="trainingHours"
                  name="trainingHours"
                  type="number"
                  value={formData.trainingHours}
                  onChange={(e) => handleInputChange('trainingHours', e.target.value)}
                  placeholder="Enter training hours"
                />
              </div>

              {/* Internal/External */}
              <div className="space-y-2">
                <Label htmlFor="internalExternal" className="text-sm font-medium">
                  Internal/External
                </Label>
                <Select value={formData.internalExternal} onValueChange={(value) => handleInputChange('internalExternal', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Internal">Internal</SelectItem>
                    <SelectItem value="External">External</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Participant Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Participant Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* EMP ID/EID */}
              <div className="space-y-2">
                <Label htmlFor="empIdEid" className="text-sm font-medium">
                  EMP ID/EID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="empIdEid"
                  name="empIdEid"
                  value={formData.empIdEid}
                  onChange={(e) => handleInputChange('empIdEid', e.target.value)}
                  placeholder="Enter employee ID"
                  required
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter participant name"
                  required
                />
              </div>

              {/* Designation */}
              <div className="space-y-2">
                <Label htmlFor="designation" className="text-sm font-medium">
                  Designation
                </Label>
                <Input
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  placeholder="Enter designation"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">
                  Company
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
            </div>
          </div>

          {/* Assessment & Certification Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Assessment & Certification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Score */}
              <div className="space-y-2">
                <Label htmlFor="score" className="text-sm font-medium">
                  Score
                </Label>
                <Input
                  id="score"
                  name="score"
                  type="number"
                  value={formData.score}
                  onChange={(e) => handleInputChange('score', e.target.value)}
                  placeholder="Enter score"
                />
              </div>

              {/* No of attendees */}
              <div className="space-y-2">
                <Label htmlFor="noOfAttendees" className="text-sm font-medium">
                  No of Attendees
                </Label>
                <Input
                  id="noOfAttendees"
                  name="noOfAttendees"
                  type="number"
                  value={formData.noOfAttendees}
                  onChange={(e) => handleInputChange('noOfAttendees', e.target.value)}
                  placeholder="Enter number of attendees"
                />
              </div>

              {/* Certificate Reference */}
              <div className="space-y-2">
                <Label htmlFor="certificateReference" className="text-sm font-medium">
                  Certificate Reference
                </Label>
                <Input
                  id="certificateReference"
                  name="certificateReference"
                  value={formData.certificateReference}
                  onChange={(e) => handleInputChange('certificateReference', e.target.value)}
                  placeholder="Enter certificate reference"
                />
              </div>

              {/* Training/Certificate Validity */}
              <div className="space-y-2">
                <Label htmlFor="trainingCertificateValidity" className="text-sm font-medium">
                  Training/Certificate Validity
                </Label>
                <Input
                  id="trainingCertificateValidity"
                  name="trainingCertificateValidity"
                  value={formData.trainingCertificateValidity}
                  onChange={(e) => handleInputChange('trainingCertificateValidity', e.target.value)}
                  placeholder="Enter validity period"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Training Record"}
            </Button>
          </div>

          {error && (
            <div className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm mt-2 p-2 bg-green-50 rounded">
              Training record added successfully!
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default TrainingCompetencyForm;
