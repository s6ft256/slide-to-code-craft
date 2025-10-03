import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Eye, Edit, Download } from "lucide-react";
import AddInductionForm from "./AddInductionForm";
import TrainingForm from "./TrainingForm";
import TrainingRecords from "./TrainingRecords";
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
        ) : activeTab === "trainings" ? (
          <div className="mt-4">
            <div className="flex gap-2 mb-4">
              <Button
                variant={trainingTab === "records" ? "default" : "ghost"}
                onClick={() => setTrainingTab("records")}
                className="px-6"
              >Records</Button>
              <Button
                variant={trainingTab === "add" ? "default" : "ghost"}
                onClick={() => setTrainingTab(trainingTab === "add" ? "records" : "add")}
                className="px-6"
              >
                {trainingTab === "add" ? "View Records" : "Add New Record"}
              </Button>
            </div>
            {trainingTab === "records" && <TrainingRecords />}
            {trainingTab === "add" && <TrainingForm onClose={() => setTrainingTab("records")} />}
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            Select a tab to view content
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InductionForm;