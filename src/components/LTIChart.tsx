import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { useIncidentMetrics } from "@/hooks/use-incident-metrics";
import { useMemo } from "react";
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";

const LTIChart = () => {
  const { metrics } = useIncidentMetrics();

  const chartData = useMemo(() => {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());
    
    // Generate all days of the month
    const days = eachDayOfInterval({ start, end });

    // Convert metrics data into a map for easier lookup
    const dateMap = new Map(
      metrics.monthlyData.dates.map((date, index) => [
        date,
        metrics.monthlyData.counts[index],
      ])
    );

    // Create data points for each day
    return days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      return {
        date: format(day, 'dd'),
        incidentCount: dateMap.get(dateStr) || 0,
        safetyScore: Math.max(10 - (dateMap.get(dateStr) || 0) * 2, 0) // Calculate safety score inversely proportional to incidents
      };
    });
  }, [metrics.monthlyData]);

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">Daily Incident Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="incidentCount" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                name="Incidents"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="safetyScore" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="Safety Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LTIChart;