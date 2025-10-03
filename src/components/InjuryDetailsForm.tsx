import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type InjuryDetailsRecord = {
  srNo: string;
  incidentRef: string;
  incidentDate: Date | undefined;
  typeOfInjury: string;
  bodyPartInjured: string;
  natureOfInjuryIllness: string;
  mechanismOfInjuryIllness: string;
  agencySourceOfInjuryIllness: string;
  emiratesIdOfIP: string;
  employeeIdOfIP: string;
  ipName: string;
  trade: string;
  ipStatus: string;
  isLTI: boolean;
  backToWorkDate: Date | undefined;
  timeOffDays: string;
  weekEndingOn: Date | undefined;
};

const InjuryDetailsForm = ({ onSubmit }: { onSubmit?: (data: InjuryDetailsRecord) => void }) => {
  const [formData, setFormData] = useState<InjuryDetailsRecord>({
    srNo: "",
    incidentRef: "",
    incidentDate: undefined,
    typeOfInjury: "",
    bodyPartInjured: "",
    natureOfInjuryIllness: "",
    mechanismOfInjuryIllness: "",
    agencySourceOfInjuryIllness: "",
    emiratesIdOfIP: "",
    employeeIdOfIP: "",
    ipName: "",
    trade: "",
    ipStatus: "",
    isLTI: false,
    backToWorkDate: undefined,
    timeOffDays: "",
    weekEndingOn: undefined
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  // Generate Sr.No
  useEffect(() => {
    const generateSrNo = () => {
      const existingData = JSON.parse(localStorage.getItem('injury_details') || '[]');
      const nextSrNo = (existingData.length + 1).toString().padStart(3, '0');
      setFormData(prev => ({ ...prev, srNo: nextSrNo }));
    };
    generateSrNo();
  }, []);

  const handleInputChange = (field: keyof InjuryDetailsRecord, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (field: string, date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate required fields
      if (!formData.incidentRef || !formData.ipName || !formData.emiratesIdOfIP) {
        throw new Error("Please fill in all required fields");
      }

      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem('injury_details') || '[]');
      const newRecord = {
        ...formData,
        incidentDate: formData.incidentDate ? format(formData.incidentDate, 'yyyy-MM-dd') : null,
        backToWorkDate: formData.backToWorkDate ? format(formData.backToWorkDate, 'yyyy-MM-dd') : null,
        weekEndingOn: formData.weekEndingOn ? format(formData.weekEndingOn, 'yyyy-MM-dd') : null,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      existingData.push(newRecord);
      localStorage.setItem('injury_details', JSON.stringify(existingData));

      setSuccess(true);
      toast({
        title: "Success",
        description: "Injury details record added successfully!",
      });

      // Reset form
      setFormData({
        srNo: "",
        incidentRef: "",
        incidentDate: undefined,
        typeOfInjury: "",
        bodyPartInjured: "",
        natureOfInjuryIllness: "",
        mechanismOfInjuryIllness: "",
        agencySourceOfInjuryIllness: "",
        emiratesIdOfIP: "",
        employeeIdOfIP: "",
        ipName: "",
        trade: "",
        ipStatus: "",
        isLTI: false,
        backToWorkDate: undefined,
        timeOffDays: "",
        weekEndingOn: undefined
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
        <CardTitle>Add New Injury Details Record</CardTitle>
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

              {/* Incident Ref */}
              <div className="space-y-2">
                <Label htmlFor="incidentRef" className="text-sm font-medium">
                  Incident Ref <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="incidentRef"
                  name="incidentRef"
                  value={formData.incidentRef}
                  onChange={(e) => handleInputChange('incidentRef', e.target.value)}
                  placeholder="Enter incident reference"
                  required
                />
              </div>

              {/* Incident Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Incident Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.incidentDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.incidentDate ? (
                        format(formData.incidentDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.incidentDate}
                      onSelect={(date) => handleDateChange('incidentDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Injury Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Injury Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Type of Injury */}
              <div className="space-y-2">
                <Label htmlFor="typeOfInjury" className="text-sm font-medium">
                  Type of Injury
                </Label>
                <Select value={formData.typeOfInjury} onValueChange={(value) => handleInputChange('typeOfInjury', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select injury type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cut/Laceration">Cut/Laceration</SelectItem>
                    <SelectItem value="Burn">Burn</SelectItem>
                    <SelectItem value="Fracture">Fracture</SelectItem>
                    <SelectItem value="Sprain/Strain">Sprain/Strain</SelectItem>
                    <SelectItem value="Contusion">Contusion</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Body part Injured */}
              <div className="space-y-2">
                <Label htmlFor="bodyPartInjured" className="text-sm font-medium">
                  Body Part Injured
                </Label>
                <Input
                  id="bodyPartInjured"
                  name="bodyPartInjured"
                  value={formData.bodyPartInjured}
                  onChange={(e) => handleInputChange('bodyPartInjured', e.target.value)}
                  placeholder="Enter body part"
                />
              </div>

              {/* Nature of Injury/Illness */}
              <div className="space-y-2">
                <Label htmlFor="natureOfInjuryIllness" className="text-sm font-medium">
                  Nature of Injury/Illness
                </Label>
                <Select value={formData.natureOfInjuryIllness} onValueChange={(value) => handleInputChange('natureOfInjuryIllness', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select nature" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Acute">Acute</SelectItem>
                    <SelectItem value="Chronic">Chronic</SelectItem>
                    <SelectItem value="Occupational">Occupational</SelectItem>
                    <SelectItem value="Non-occupational">Non-occupational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mechanism of Injury/Illness */}
              <div className="space-y-2">
                <Label htmlFor="mechanismOfInjuryIllness" className="text-sm font-medium">
                  Mechanism of Injury/Illness
                </Label>
                <Input
                  id="mechanismOfInjuryIllness"
                  name="mechanismOfInjuryIllness"
                  value={formData.mechanismOfInjuryIllness}
                  onChange={(e) => handleInputChange('mechanismOfInjuryIllness', e.target.value)}
                  placeholder="Enter mechanism"
                />
              </div>

              {/* Agency/Source of Injury/Illness */}
              <div className="space-y-2">
                <Label htmlFor="agencySourceOfInjuryIllness" className="text-sm font-medium">
                  Agency/Source of Injury/Illness
                </Label>
                <Input
                  id="agencySourceOfInjuryIllness"
                  name="agencySourceOfInjuryIllness"
                  value={formData.agencySourceOfInjuryIllness}
                  onChange={(e) => handleInputChange('agencySourceOfInjuryIllness', e.target.value)}
                  placeholder="Enter agency/source"
                />
              </div>
            </div>
          </div>

          {/* Injured Person Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Injured Person Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Emirates ID of IP */}
              <div className="space-y-2">
                <Label htmlFor="emiratesIdOfIP" className="text-sm font-medium">
                  Emirates ID of IP <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="emiratesIdOfIP"
                  name="emiratesIdOfIP"
                  value={formData.emiratesIdOfIP}
                  onChange={(e) => handleInputChange('emiratesIdOfIP', e.target.value)}
                  placeholder="Enter Emirates ID"
                  required
                />
              </div>

              {/* Employee ID of IP */}
              <div className="space-y-2">
                <Label htmlFor="employeeIdOfIP" className="text-sm font-medium">
                  Employee ID of IP
                </Label>
                <Input
                  id="employeeIdOfIP"
                  name="employeeIdOfIP"
                  value={formData.employeeIdOfIP}
                  onChange={(e) => handleInputChange('employeeIdOfIP', e.target.value)}
                  placeholder="Enter employee ID"
                />
              </div>

              {/* IP Name */}
              <div className="space-y-2">
                <Label htmlFor="ipName" className="text-sm font-medium">
                  IP Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ipName"
                  name="ipName"
                  value={formData.ipName}
                  onChange={(e) => handleInputChange('ipName', e.target.value)}
                  placeholder="Enter injured person name"
                  required
                />
              </div>

              {/* Trade */}
              <div className="space-y-2">
                <Label htmlFor="trade" className="text-sm font-medium">
                  Trade
                </Label>
                <Input
                  id="trade"
                  name="trade"
                  value={formData.trade}
                  onChange={(e) => handleInputChange('trade', e.target.value)}
                  placeholder="Enter trade/profession"
                />
              </div>

              {/* IP Status */}
              <div className="space-y-2">
                <Label htmlFor="ipStatus" className="text-sm font-medium">
                  IP Status
                </Label>
                <Select value={formData.ipStatus} onValueChange={(value) => handleInputChange('ipStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Terminated">Terminated</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Is it an LTI? */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Is it an LTI?</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isLTI"
                    checked={formData.isLTI}
                    onCheckedChange={(checked) => handleInputChange('isLTI', checked as boolean)}
                  />
                  <Label htmlFor="isLTI" className="text-sm font-normal">
                    Yes, this is a Lost Time Injury
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Recovery & Administrative Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Recovery & Administrative Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Back to work date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Back to Work Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.backToWorkDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.backToWorkDate ? (
                        format(formData.backToWorkDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.backToWorkDate}
                      onSelect={(date) => handleDateChange('backToWorkDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Off (Days) */}
              <div className="space-y-2">
                <Label htmlFor="timeOffDays" className="text-sm font-medium">
                  Time Off (Days)
                </Label>
                <Input
                  id="timeOffDays"
                  name="timeOffDays"
                  type="number"
                  value={formData.timeOffDays}
                  onChange={(e) => handleInputChange('timeOffDays', e.target.value)}
                  placeholder="Enter days off"
                />
              </div>

              {/* Week Ending On */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Week Ending On</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.weekEndingOn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.weekEndingOn ? (
                        format(formData.weekEndingOn, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.weekEndingOn}
                      onSelect={(date) => handleDateChange('weekEndingOn', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Injury Record"}
            </Button>
          </div>

          {error && (
            <div className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm mt-2 p-2 bg-green-50 rounded">
              Injury details record added successfully!
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default InjuryDetailsForm;
