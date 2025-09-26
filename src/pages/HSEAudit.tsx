import Layout from "@/components/Layout";
import ProjectStatus from "@/components/ProjectStatus";
import ChartCard from "@/components/ChartCard";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const HSEAudit = () => {
  const auditData = [
    { name: 'CATEGORY 1', open: 4.3, closed: 2.4 },
    { name: 'CATEGORY 2', open: 6.5, closed: 4.4 },
    { name: 'CATEGORY 3', open: 3.5, closed: 1.8 },
    { name: 'CATEGORY 4', open: 4.5, closed: 2.8 },
  ];

  const closureData = [
    { name: 'Open', value: 43, color: '#ef4444' },
    { name: 'Closed', value: 57, color: '#22c55e' },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          HSE Audit
        </h1>
        <p className="text-muted-foreground">
          HSE audit management and tracking system
        </p>
      </div>

      <div className="space-y-8">
        <ProjectStatus />

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">HSE Audit Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">00</div>
                <div className="text-sm text-muted-foreground">Internal Audits</div>
                <div className="text-xs text-muted-foreground mt-1">000 Total Audits</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">00</div>
                <div className="text-sm text-muted-foreground">External Audits</div>
                <div className="text-xs text-muted-foreground mt-1">000 Total NCRs</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">00</div>
                <div className="text-sm text-muted-foreground">Overdue SORs</div>
                <div className="text-xs text-muted-foreground mt-1">000</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Observation Closure">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={auditData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis />
                  <Bar dataKey="open" fill="hsl(var(--destructive))" name="Open" />
                  <Bar dataKey="closed" fill="hsl(var(--success))" name="Closed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Audit Closure Rate">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={closureData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {closureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Audit Status Summary</h3>
          <div className="grid grid-cols-3 gap-6">
            <ChartCard title="Audit Closure">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-2">85%</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </ChartCard>

            <ChartCard title="NCRs Closure">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning mb-2">72%</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
            </ChartCard>

            <ChartCard title="Overall Progress">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">78%</div>
                <div className="text-sm text-muted-foreground">Average</div>
              </div>
            </ChartCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HSEAudit;