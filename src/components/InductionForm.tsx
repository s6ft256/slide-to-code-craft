import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Eye, Edit, Download } from "lucide-react";
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
  const [inductionType, setInductionType] = useState("internal");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const inductionData = [
    {
      sno: "01",
      idNo: "xxxx",
      name: "xxxx",
      designation: "xxxx",
      company: "xxxx",
      inductedOn: "DD/MM/YYYY",
      nextInduction: "DD/MM/YYYY",
      status: "ACTIVE",
      statusColor: "bg-green-100 text-green-800",
      rowColor: "bg-white"
    },
    {
      sno: "02",
      idNo: "xxxx",
      name: "xxxx", 
      designation: "xxxx",
      company: "xxxx",
      inductedOn: "DD/MM/YYYY",
      nextInduction: "DD/MM/YYYY",
      status: "ACTIVE",
      statusColor: "bg-green-100 text-green-800",
      rowColor: "bg-white"
    },
    {
      sno: "03",
      idNo: "xxxx",
      name: "xxxx",
      designation: "xxxx", 
      company: "xxxx",
      inductedOn: "DD/MM/YYYY",
      nextInduction: "DD/MM/YYYY",
      status: "DUE IN 10 DAYS",
      statusColor: "bg-yellow-100 text-yellow-800",
      rowColor: "bg-yellow-50"
    },
    {
      sno: "04",
      idNo: "xxxx",
      name: "xxxx",
      designation: "xxxx",
      company: "xxxx", 
      inductedOn: "DD/MM/YYYY",
      nextInduction: "DD/MM/YYYY",
      status: "EXPIRED",
      statusColor: "bg-red-100 text-red-800",
      rowColor: "bg-red-50"
    },
    {
      sno: "05",
      idNo: "xxxx",
      name: "xxxx",
      designation: "xxxx",
      company: "xxxx",
      inductedOn: "DD/MM/YYYY", 
      nextInduction: "DD/MM/YYYY",
      status: "INACTIVE",
      statusColor: "bg-gray-100 text-gray-800",
      rowColor: "bg-gray-50"
    }
  ];

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
          </div>
        </div>
        <CardTitle className="text-xl font-bold mt-4">INDUCTIONS</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
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
              {inductionData.map((row) => (
                <TableRow key={row.sno} className={row.rowColor}>
                  <TableCell className="text-center font-medium">{row.sno}</TableCell>
                  <TableCell className="text-center">{row.idNo}</TableCell>
                  <TableCell className="text-center">{row.name}</TableCell>
                  <TableCell className="text-center">{row.designation}</TableCell>
                  <TableCell className="text-center">{row.company}</TableCell>
                  <TableCell className="text-center">{row.inductedOn}</TableCell>
                  <TableCell className="text-center">{row.nextInduction}</TableCell>
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

        {/* Bottom Action Buttons */}
        <div className="flex justify-end space-x-2">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
            Medical Info
          </Button>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
            Documents Info
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InductionForm;