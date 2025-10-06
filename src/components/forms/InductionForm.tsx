import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TrainingForm from "./TrainingForm";
import TrainingCompetencyForm from "./TrainingCompetencyForm";
import EventForm from "./EventForm";

const InductionForm = () => {
  const [activeTab, setActiveTab] = useState("trainings");

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
            <TrainingCompetencyForm />
          </div>
        ) : activeTab === "events" ? (
          <div className="mt-4">
            <EventForm />
          </div>
        ) : activeTab === "trainings" ? (
          <div className="mt-4">
            <TrainingForm onClose={() => {}} />
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