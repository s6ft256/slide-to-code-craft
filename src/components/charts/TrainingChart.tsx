import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const trainingData = [
  { name: 'TRAINING 1', value: 4.3 },
  { name: 'TRAINING 2', value: 2.5 },
  { name: 'TRAINING 3', value: 3.5 },
  { name: 'TRAINING 4', value: 4.5 },
  { name: 'TRAINING 5', value: 1.2 },
  { name: 'TRAINING 6', value: 2.5 },
  { name: 'TRAINING 7', value: 1.2 },
  { name: 'TRAINING 8', value: 1.5 },
  { name: 'TRAINING 9', value: 4.4 },
  { name: 'TRAINING 10', value: 1.6 },
];

const TrainingChart = () => {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">Training Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trainingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis />
              <Bar dataKey="value" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingChart;