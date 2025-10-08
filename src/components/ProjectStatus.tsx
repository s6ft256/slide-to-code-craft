import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface ProjectStatusProps {
  projectName?: string;
  status?: 'Active' | 'On Hold' | 'Completed' | 'Planning';
  progress?: number;
  lastUpdated?: string;
  metrics?: {
    safetyScore?: number;
    incidents?: number;
    daysWithoutLTI?: number;
  };
}

const ProjectStatus: React.FC<ProjectStatusProps> = ({
  projectName = "HSE Project Alpha",
  status = "Active",
  progress = 75,
  lastUpdated = new Date().toLocaleDateString(),
  metrics = {}
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'On Hold':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>{projectName}</span>
          <Badge className={getStatusColor(status)} variant="secondary">
            {getStatusIcon(status)}
            <span className="ml-1">{status}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-green-600">
                {metrics.safetyScore || 92}
              </p>
              <p className="text-xs text-muted-foreground">Safety Score</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-orange-600">
                {metrics.incidents || 0}
              </p>
              <p className="text-xs text-muted-foreground">Incidents</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-blue-600">
                {metrics.daysWithoutLTI || 45}
              </p>
              <p className="text-xs text-muted-foreground">Days No LTI</p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStatus;