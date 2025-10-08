import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, GraduationCap, Clock, CheckCircle } from "lucide-react";

interface TrainingData {
  id: string;
  name: string;
  completedEmployees: number;
  totalEmployees: number;
  completionRate: number;
  status: 'Completed' | 'In Progress' | 'Pending';
  deadline?: string;
}

interface TrainingChartProps {
  data?: TrainingData[];
  title?: string;
  showDetails?: boolean;
}

const TrainingChart: React.FC<TrainingChartProps> = ({
  data = [],
  title = "Training Progress",
  showDetails = true
}) => {
  // Default sample data if none provided
  const defaultData: TrainingData[] = [
    {
      id: '1',
      name: 'HSE Induction',
      completedEmployees: 45,
      totalEmployees: 50,
      completionRate: 90,
      status: 'In Progress',
      deadline: '2025-10-15'
    },
    {
      id: '2', 
      name: 'Safety Training',
      completedEmployees: 38,
      totalEmployees: 40,
      completionRate: 95,
      status: 'Completed'
    },
    {
      id: '3',
      name: 'Emergency Response',
      completedEmployees: 15,
      totalEmployees: 30,
      completionRate: 50,
      status: 'In Progress',
      deadline: '2025-10-20'
    }
  ];

  const trainingData = data.length > 0 ? data : defaultData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-3 w-3" />;
      case 'In Progress':
        return <Clock className="h-3 w-3" />;
      default:
        return <Users className="h-3 w-3" />;
    }
  };

  const totalCompletionRate = trainingData.length > 0 
    ? Math.round(trainingData.reduce((acc, item) => acc + item.completionRate, 0) / trainingData.length)
    : 0;

  const totalCompleted = trainingData.reduce((acc, item) => acc + item.completedEmployees, 0);
  const totalEmployees = trainingData.reduce((acc, item) => acc + item.totalEmployees, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <GraduationCap className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
        {showDetails && (
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{totalCompleted}/{totalEmployees} Completed</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">{totalCompletionRate}% Overall</span>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{totalCompletionRate}%</span>
            </div>
            <Progress value={totalCompletionRate} className="h-2" />
          </div>

          {/* Individual Training Items */}
          {showDetails && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Training Modules</h4>
              {trainingData.map((training) => (
                <div key={training.id} className="space-y-2 p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{training.name}</span>
                      <Badge className={getStatusColor(training.status)} variant="secondary">
                        {getStatusIcon(training.status)}
                        <span className="ml-1">{training.status}</span>
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {training.completedEmployees}/{training.totalEmployees}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{training.completionRate}%</span>
                    </div>
                    <Progress value={training.completionRate} className="h-1" />
                  </div>

                  {training.deadline && (
                    <div className="text-xs text-muted-foreground">
                      Deadline: {new Date(training.deadline).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Chart Visualization (Simple Bar Chart) */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Completion Rates</h4>
            <div className="space-y-2">
              {trainingData.map((training) => (
                <div key={`chart-${training.id}`} className="flex items-center space-x-3">
                  <div className="w-20 text-xs truncate">{training.name}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${training.completionRate}%` }}
                    />
                  </div>
                  <div className="w-12 text-xs text-right">{training.completionRate}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingChart;