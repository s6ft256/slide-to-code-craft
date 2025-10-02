import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Eye, Edit, Download, Plus } from "lucide-react";
import AddInductionForm from "./AddInductionForm";
import TrainingCompetencyForm from "@/components/TrainingCompetencyForm";
import TrainingCompetencyRecords from "@/components/TrainingCompetencyRecords";
import EventForm from "@/components/EventForm";
import EventRecords from "@/components/EventRecords";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const InductionForm = () => {
  const [activeTab, setActiveTab] = useState("trainings");
  const [trainingTab, setTrainingTab] = useState("records");
  const [eventTab, setEventTab] = useState("records");
  const [inductionType, setInductionType] = useState("internal");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [inductionData, setInductionData] = useState<any[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const loadInductionData = () => {
      try {
        const storedData = JSON.parse(localStorage.getItem('induction_records') || '[]');
        setInductionData(storedData);
      } catch (error) {
        console.error('Error loading induction data:', error);
        setInductionData([]);
      }
    };

    loadInductionData();
    
    // Refresh data when form is closed (when new data might be added)
    if (!showAddForm) {
      loadInductionData();
    }
  }, [showAddForm]);

  const getStatusColors = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return { statusColor: 'bg-green-100 text-green-800', rowColor: 'bg-white' };
      case 'due':
      case 'due in 10 days':
        return { statusColor: 'bg-yellow-100 text-yellow-800', rowColor: 'bg-yellow-50' };
      case 'expired':
        return { statusColor: 'bg-red-100 text-red-800', rowColor: 'bg-red-50' };
      case 'inactive':
        return { statusColor: 'bg-gray-100 text-gray-800', rowColor: 'bg-gray-50' };
      default:
        return { statusColor: 'bg-gray-100 text-gray-800', rowColor: 'bg-white' };
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      return date.toLocaleDateString('en-GB');
    } catch {
      return 'N/A';
    }
  };

  const mappedInductionData = inductionData.map((record) => {
    const colors = getStatusColors(record.status);
    return {
      sno: record.sno || 'N/A',
      idno: record.idno || 'N/A',
      name: record.name || 'N/A',
      designation: record.designation || 'N/A',
      company: record.company || 'N/A',
      inductedon: formatDate(record.inductedon),
      nextinduction: formatDate(record.nextinduction),
      status: record.status || 'N/A',
      statusColor: colors.statusColor,
      rowColor: colors.rowColor,
    };
  });

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <Button
              variant={activeTab === "trainings" ? "default" : "ghost"}
              onClick={() => setActiveTab("trainings")}
              className="px-6"
            >
              Trainings
            </Button>
            <Button
              variant={activeTab === "events" ? "default" : "ghost"}
              onClick={() => setActiveTab("events")}
              className="px-6"
            >
              Events
            </Button>
            <Button
              variant={activeTab === "training-competency" ? "default" : "ghost"}
              onClick={() => setActiveTab("training-competency")}
              className="px-6"
            >
              Training & Competency Register
            </Button>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>{showAddForm ? "View Records" : "Add New Record"}</span>
          </Button>
        </div>
        <CardTitle className="text-xl font-bold mt-4">INDUCTIONS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {activeTab === "training-competency" ? (
          <div>
            <div className="flex gap-2 mb-4">
              <Button
                variant={trainingTab === "records" ? "default" : "ghost"}
                onClick={() => setTrainingTab("records")}
                className="px-6"
              >Records</Button>
              <Button
                variant={trainingTab === "add" ? "default" : "ghost"}
                onClick={() => setTrainingTab("add")}
                className="px-6"
              >Add New Record</Button>
            </div>
            {trainingTab === "records" && <TrainingCompetencyRecords />}
            {trainingTab === "add" && <TrainingCompetencyForm />}
          </div>
        ) : activeTab === "events" ? (
          <div className="mt-4">
            <div className="flex gap-2 mb-4">
              <Button
                variant={eventTab === "records" ? "default" : "ghost"}
                onClick={() => setEventTab("records")}
                className="px-6"
              >Records</Button>
              <Button
                variant={eventTab === "add" ? "default" : "ghost"}
                onClick={() => setEventTab("add")}
                className="px-6"
              >Add New Event Record</Button>
            </div>
            {eventTab === "records" && <EventRecords />}
            {eventTab === "add" && <EventForm />}
          </div>
        ) : showAddForm ? (
          <AddInductionForm onClose={() => setShowAddForm(false)} />
        ) : (
          <>
            {/* Search Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Employee Name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-40"
                />
                <Input
                  placeholder="Employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-32"
                />
                <div className="flex space-x-2">
                  <Button
                    variant={inductionType === "internal" ? "default" : "outline"}
                    onClick={() => setInductionType("internal")}
                    size="sm"
                  >
                    INTERNAL
                  </Button>
                  <Button
                    variant={inductionType === "external" ? "default" : "outline"}
                    onClick={() => setInductionType("external")}
                    size="sm"
                  >
                    EXTERNAL
                  </Button>
                </div>
                <Button size="sm" variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              {/* Summary Stats */}
              <div className="flex space-x-4 text-sm">
                <div className="text-center">
                  <div className="text-muted-foreground">Total Entries</div>
                  <div className="bg-pink-100 text-pink-800 px-2 py-1 rounded">Autofill</div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground">Overdue Re-inductions</div>
                  <div className="bg-pink-100 text-pink-800 px-2 py-1 rounded">Autofill</div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground">Upcoming Re-inductions</div>
                  <div className="bg-pink-100 text-pink-800 px-2 py-1 rounded">Autofill</div>
                </div>
              </div>
            </div>
            {/* Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-center font-semibold">S.NO.</TableHead>
                    <TableHead className="text-center font-semibold">ID NO.</TableHead>
                    <TableHead className="text-center font-semibold">NAME</TableHead>
                    <TableHead className="text-center font-semibold">DESIGNATION</TableHead>
                    <TableHead className="text-center font-semibold">COMPANY</TableHead>
                    <TableHead className="text-center font-semibold">INDUCTED ON</TableHead>
                    <TableHead className="text-center font-semibold">NEXT INDUCTION</TableHead>
                    <TableHead className="text-center font-semibold">SIGNATURE</TableHead>
                    <TableHead className="text-center font-semibold">DETAILS</TableHead>  
                    <TableHead className="text-center font-semibold">STATUS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mappedInductionData.map((row) => (
                    <TableRow key={row.sno} className={row.rowColor}>
                      <TableCell className="text-center font-medium">{row.sno}</TableCell>
                      <TableCell className="text-center">{row.idno}</TableCell>
                      <TableCell className="text-center">{row.name}</TableCell>
                      <TableCell className="text-center">{row.designation}</TableCell>
                      <TableCell className="text-center">{row.company}</TableCell>
                      <TableCell className="text-center">{row.inductedon}</TableCell>
                      <TableCell className="text-center">{row.nextinduction}</TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4 text-blue-600" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${row.statusColor} font-medium`}>
                          {row.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end space-x-2">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                Medical Info
              </Button>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                Documents Info
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InductionForm;