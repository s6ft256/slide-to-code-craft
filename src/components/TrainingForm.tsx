import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const TrainingForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    designation: "",
    company: "",
    dateOfInduction: undefined as Date | undefined,
    location: "",
    trainingProvider: "",
    refresherBefore: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      dateOfInduction: date
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate required fields
      if (!formData.empId || !formData.name || !formData.designation || !formData.company) {
        throw new Error("Please fill in all required fields");
      }

      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem('training_records') || '[]');
      const newRecord = {
        ...formData,
        dateOfInduction: formData.dateOfInduction ? format(formData.dateOfInduction, 'yyyy-MM-dd') : null,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      existingData.push(newRecord);
      localStorage.setItem('training_records', JSON.stringify(existingData));

      setSuccess(true);
      toast({
        title: "Success",
        description: "Training record added successfully!",
      });

      // Reset form
      setFormData({
        empId: "",
        name: "",
        designation: "",
        company: "",
        dateOfInduction: undefined,
        location: "",
        trainingProvider: "",
        refresherBefore: ""
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Training Record</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* EMP ID / EID */}
            <div className="space-y-2">
              <Label htmlFor="empId" className="text-sm font-medium">
                EMP ID / EID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="empId"
                name="empId"
                value={formData.empId}
                onChange={(e) => handleInputChange('empId', e.target.value)}
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
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Designation */}
            <div className="space-y-2">
              <Label htmlFor="designation" className="text-sm font-medium">
                Designation <span className="text-red-500">*</span>
              </Label>
              <Input
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                placeholder="Enter designation"
                required
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">
                Company <span className="text-red-500">*</span>
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>

            {/* Date of Induction */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Date of Induction</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dateOfInduction && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfInduction ? (
                      format(formData.dateOfInduction, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfInduction}
                    onSelect={handleDateChange}
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
                placeholder="Enter training provider"
              />
            </div>

            {/* Refresher to be carried out before */}
            <div className="space-y-2">
              <Label htmlFor="refresherBefore" className="text-sm font-medium">
                Refresher to be carried out before
              </Label>
              <Input
                id="refresherBefore"
                name="refresherBefore"
                value={formData.refresherBefore}
                onChange={(e) => handleInputChange('refresherBefore', e.target.value)}
                placeholder="Enter refresher date or period"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
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

export default TrainingForm;