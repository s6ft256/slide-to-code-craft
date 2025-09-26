import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const ltiData = [
  { month: 'JAN', ltiFree: 32, postLTI: 1 },
  { month: 'FEB', ltiFree: 32, postLTI: 4 },
  { month: 'MAR', ltiFree: 28, postLTI: 12 },
  { month: 'APR', ltiFree: 12, postLTI: 5 },
  { month: 'MAY', ltiFree: 15, postLTI: 28 },
  { month: 'JUN', ltiFree: 12, postLTI: 24 },
  { month: 'JUL', ltiFree: 26, postLTI: 11 },
  { month: 'AUG', ltiFree: 14, postLTI: 12 },
  { month: 'SEP', ltiFree: 15, postLTI: 11 },
  { month: 'OCT', ltiFree: 21, postLTI: 18 },
  { month: 'NOV', ltiFree: 22, postLTI: 4 },
  { month: 'DEC', ltiFree: 27, postLTI: 1 },
];

const LTIChart = () => {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">LTI Free Days vs Post LTI</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ltiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Line 
                type="monotone" 
                dataKey="ltiFree" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="LTI Free"
              />
              <Line 
                type="monotone" 
                dataKey="postLTI" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                name="Post LTI"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LTIChart;