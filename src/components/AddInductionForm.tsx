import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const AddInductionForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    sno: "",
    idNo: "",
    name: "",
    designation: "",
    company: "",
    inductedOn: undefined as Date | undefined,
    nextInduction: undefined as Date | undefined,
    status: ""
  });
  
  const [signature, setSignature] = useState<File | null>(null);
  const { toast } = useToast();

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

  const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSignature(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.idNo || !formData.company) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Induction record has been added successfully",
    });
    
    // Reset form
    setFormData({
      sno: "",
      idNo: "",
      name: "",
      designation: "",
      company: "",
      inductedOn: undefined,
      nextInduction: undefined,
      status: ""
    });
    setSignature(null);
    onClose();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Add New Induction Record</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* S.NO. */}
            <div className="space-y-2">
              <Label htmlFor="sno">S.NO. *</Label>
              <Input
                id="sno"
                value={formData.sno}
                onChange={(e) => handleInputChange("sno", e.target.value)}
                placeholder="Enter serial number"
                required
              />
            </div>

            {/* ID NO. */}
            <div className="space-y-2">
              <Label htmlFor="idNo">ID NO. *</Label>
              <Input
                id="idNo"
                value={formData.idNo}
                onChange={(e) => handleInputChange("idNo", e.target.value)}
                placeholder="Enter ID number"
                required
              />
            </div>

            {/* NAME */}
            <div className="space-y-2">
              <Label htmlFor="name">NAME *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>

            {/* DESIGNATION */}
            <div className="space-y-2">
              <Label htmlFor="designation">DESIGNATION</Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={(e) => handleInputChange("designation", e.target.value)}
                placeholder="Enter designation"
              />
            </div>

            {/* COMPANY */}
            <div className="space-y-2">
              <Label htmlFor="company">COMPANY *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>

            {/* STATUS */}
            <div className="space-y-2">
              <Label htmlFor="status">STATUS</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">ACTIVE</SelectItem>
                  <SelectItem value="inactive">INACTIVE</SelectItem>
                  <SelectItem value="expired">EXPIRED</SelectItem>
                  <SelectItem value="due">DUE IN 10 DAYS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* INDUCTED ON */}
            <div className="space-y-2">
              <Label>INDUCTED ON</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.inductedOn && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.inductedOn ? format(formData.inductedOn, "dd/MM/yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.inductedOn}
                    onSelect={(date) => handleDateChange("inductedOn", date)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* NEXT INDUCTION */}
            <div className="space-y-2">
              <Label>NEXT INDUCTION</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.nextInduction && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.nextInduction ? format(formData.nextInduction, "dd/MM/yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.nextInduction}
                    onSelect={(date) => handleDateChange("nextInduction", date)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* SIGNATURE */}
          <div className="space-y-2">
            <Label htmlFor="signature">SIGNATURE</Label>
            <div className="flex items-center space-x-2">
              <Button type="button" variant="outline" className="relative">
                <Upload className="mr-2 h-4 w-4" />
                Upload Signature
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSignatureUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </Button>
              {signature && (
                <span className="text-sm text-muted-foreground">
                  {signature.name}
                </span>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Induction Record
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddInductionForm;