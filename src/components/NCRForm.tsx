import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const NCRForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    srNo: "",
    reference: "",
    issuedDate: undefined as Date | undefined,
    location: "",
    areaSection: "",
    subject: "",
    description: "",
    source: "",
    typeOfNCR: "",
    type: "",
    responsibleCompanyName: "",
    responsibleDept: "",
    proposedDateOfClosure: undefined as Date | undefined,
    actualDateOfClosure: undefined as Date | undefined,
    status: "Open",
    daysToClose: "",
    remarks: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  // Generate Sr.No
  useEffect(() => {
    const generateSrNo = () => {
      const existingData = JSON.parse(localStorage.getItem('ncr_register') || '[]');
      const nextSrNo = (existingData.length + 1).toString().padStart(3, '0');
      setFormData(prev => ({ ...prev, srNo: nextSrNo }));
    };
    generateSrNo();
  }, []);

  const handleInputChange = (field: string, value: string) => {
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
      if (!formData.reference || !formData.subject || !formData.description || !formData.typeOfNCR || !formData.type) {
        throw new Error("Please fill in all required fields");
      }

      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem('ncr_register') || '[]');
      const newRecord = {
        ...formData,
        issuedDate: formData.issuedDate ? format(formData.issuedDate, 'yyyy-MM-dd') : null,
        proposedDateOfClosure: formData.proposedDateOfClosure ? format(formData.proposedDateOfClosure, 'yyyy-MM-dd') : null,
        actualDateOfClosure: formData.actualDateOfClosure ? format(formData.actualDateOfClosure, 'yyyy-MM-dd') : null,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      existingData.push(newRecord);
      localStorage.setItem('ncr_register', JSON.stringify(existingData));

      // Dispatch custom event to notify dashboard of localStorage changes
      window.dispatchEvent(new CustomEvent('localStorageUpdate', { detail: { key: 'ncr_register' } }));

      setSuccess(true);
      toast({
        title: "Success",
        description: "NCR record added successfully!",
      });

      // Reset form
      setFormData({
        srNo: "",
        reference: "",
        issuedDate: undefined,
        location: "",
        areaSection: "",
        subject: "",
        description: "",
        source: "",
        typeOfNCR: "",
        type: "",
        responsibleCompanyName: "",
        responsibleDept: "",
        proposedDateOfClosure: undefined,
        actualDateOfClosure: undefined,
        status: "Open",
        daysToClose: "",
        remarks: ""
      });

      // Close form after a short delay
      setTimeout(() => {
        onClose();
      }, 1500);

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
        <CardTitle>Add New NCR Record</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Reference */}
            <div className="space-y-2">
              <Label htmlFor="reference" className="text-sm font-medium">
                Reference <span className="text-red-500">*</span>
              </Label>
              <Input
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={(e) => handleInputChange('reference', e.target.value)}
                placeholder="Enter reference number"
                required
              />
            </div>

            {/* Issued Date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Issued Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.issuedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.issuedDate ? (
                      format(formData.issuedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.issuedDate}
                    onSelect={(date) => handleDateChange('issuedDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Enter location"
              />
            </div>

            {/* Area/Section */}
            <div className="space-y-2">
              <Label htmlFor="areaSection" className="text-sm font-medium">
                Area/Section
              </Label>
              <Input
                id="areaSection"
                name="areaSection"
                value={formData.areaSection}
                onChange={(e) => handleInputChange('areaSection', e.target.value)}
                placeholder="Enter area/section"
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">
                Subject <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Enter subject"
                required
              />
            </div>

            {/* Source */}
            <div className="space-y-2">
              <Label htmlFor="source" className="text-sm font-medium">
                Source
              </Label>
              <Input
                id="source"
                name="source"
                value={formData.source}
                onChange={(e) => handleInputChange('source', e.target.value)}
                placeholder="Enter source"
              />
            </div>

            {/* Type of NCR */}
            <div className="space-y-2">
              <Label htmlFor="typeOfNCR" className="text-sm font-medium">
                Type of NCR <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.typeOfNCR} onValueChange={(value) => handleInputChange('typeOfNCR', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select NCR type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SVR">SVR</SelectItem>
                  <SelectItem value="SWN">SWN</SelectItem>
                  <SelectItem value="MAJOR">MAJOR</SelectItem>
                  <SelectItem value="MINOR">MINOR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium">
                Type <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Internal">Internal</SelectItem>
                  <SelectItem value="External">External</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Responsible Company Name */}
            <div className="space-y-2">
              <Label htmlFor="responsibleCompanyName" className="text-sm font-medium">
                Responsible Company Name
              </Label>
              <Input
                id="responsibleCompanyName"
                name="responsibleCompanyName"
                value={formData.responsibleCompanyName}
                onChange={(e) => handleInputChange('responsibleCompanyName', e.target.value)}
                placeholder="Enter company name"
              />
            </div>

            {/* Responsible Dept */}
            <div className="space-y-2">
              <Label htmlFor="responsibleDept" className="text-sm font-medium">
                Responsible Dept
              </Label>
              <Input
                id="responsibleDept"
                name="responsibleDept"
                value={formData.responsibleDept}
                onChange={(e) => handleInputChange('responsibleDept', e.target.value)}
                placeholder="Enter department"
              />
            </div>

            {/* Proposed date of closure */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Proposed date of closure</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.proposedDateOfClosure && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.proposedDateOfClosure ? (
                      format(formData.proposedDateOfClosure, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.proposedDateOfClosure}
                    onSelect={(date) => handleDateChange('proposedDateOfClosure', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Actual date of closure */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Actual date of closure</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.actualDateOfClosure && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.actualDateOfClosure ? (
                      format(formData.actualDateOfClosure, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.actualDateOfClosure}
                    onSelect={(date) => handleDateChange('actualDateOfClosure', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Days to Close */}
            <div className="space-y-2">
              <Label htmlFor="daysToClose" className="text-sm font-medium">
                Days to Close
              </Label>
              <Input
                id="daysToClose"
                name="daysToClose"
                type="number"
                value={formData.daysToClose}
                onChange={(e) => handleInputChange('daysToClose', e.target.value)}
                placeholder="Enter days"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the NCR in detail"
              rows={4}
              required
            />
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remarks" className="text-sm font-medium">
              Remarks
            </Label>
            <Textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
              placeholder="Additional remarks or notes"
              rows={3}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add NCR Record"}
            </Button>
          </div>

          {error && (
            <div className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm mt-2 p-2 bg-green-50 rounded">
              NCR record added successfully!
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default NCRForm;