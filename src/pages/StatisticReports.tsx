import Layout from "@/components/Layout";
import ProjectStatus from "@/components/ProjectStatus";
import TrainingChart from "@/components/TrainingChart";
import ChartCard from "@/components/ChartCard";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const StatisticReports = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Statistic Reports
        </h1>
        <p className="text-muted-foreground">
          Comprehensive statistical analysis and reporting
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Overall Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center gap-1 mb-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < 4 ? "fill-warning text-warning" : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-2xl font-bold text-foreground">S</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">14</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-success mb-2">72.8%</div>
                <div className="text-sm text-muted-foreground">Completion</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-sm text-muted-foreground mb-2">Total Attendees</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-foreground">000</div>
                    <div className="text-xs text-muted-foreground">Internal</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">000</div>
                    <div className="text-xs text-muted-foreground">External</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <TrainingChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Training Hours">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Hours</span>
                <span className="font-bold text-foreground">000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="font-bold text-success">000</span>
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Monthly Performance">
            <div className="h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">87.5%</div>
                <div className="text-sm text-muted-foreground">Average Monthly Score</div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
};

export default StatisticReports;