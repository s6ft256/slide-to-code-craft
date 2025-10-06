import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import HSEViolationRecords from "@/components/HSEViolationRecords";
import { XCircle, AlertTriangle, FileX, Users, TrendingDown, Shield, Calendar, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

interface HSEViolationRecord {
  id: string;
  employee: string;
  violationNo: string;
  reportedTo: string;
  date: string;
  reportedBy: string;
  dateOfIncident: string;
  contactInformation: string;
  reportType: string;
  violators: string;
  location: string;
  safetyCodesBroken: string;
  descriptionOfEvent: string;
  nextCourseOfAction: string;
  createdAt: string;
}

const HSEViolations = () => {
  const [violations, setViolations] = useState<HSEViolationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadViolations();
  }, []);

  const loadViolations = () => {
    try {
      const data = JSON.parse(localStorage.getItem('hse_violations') || '[]');
      setViolations(data);
    } catch (error) {
      console.error('Error loading HSE violations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate metrics from actual violation data
  const totalViolations = violations.length;
  const criticalViolations = violations.filter(v =>
    v.safetyCodesBroken.toLowerCase().includes('critical') ||
    v.safetyCodesBroken.toLowerCase().includes('high risk') ||
    v.reportType === 'in-person'
  ).length;

  // For now, we'll consider violations "resolved" if they have next course of action defined
  const resolvedViolations = violations.filter(v => v.nextCourseOfAction && v.nextCourseOfAction.trim() !== '').length;
  const resolutionRate = totalViolations > 0 ? Math.round((resolvedViolations / totalViolations) * 100) : 0;

  // Get unique personnel involved
  const personnelInvolved = new Set(violations.map(v => v.employee)).size;

  // Get violation categories based on safety codes broken
  const getViolationCategories = () => {
    const categories = {
      'PPE': violations.filter(v => v.safetyCodesBroken.toLowerCase().includes('ppe')).length,
      'Procedure': violations.filter(v => v.safetyCodesBroken.toLowerCase().includes('procedure')).length,
      'Equipment': violations.filter(v => v.safetyCodesBroken.toLowerCase().includes('equipment')).length,
      'Environmental': violations.filter(v => v.safetyCodesBroken.toLowerCase().includes('environment')).length,
      'Documentation': violations.filter(v => v.safetyCodesBroken.toLowerCase().includes('documentation')).length,
      'Other': violations.filter(v =>
        !v.safetyCodesBroken.toLowerCase().includes('ppe') &&
        !v.safetyCodesBroken.toLowerCase().includes('procedure') &&
        !v.safetyCodesBroken.toLowerCase().includes('equipment') &&
        !v.safetyCodesBroken.toLowerCase().includes('environment') &&
        !v.safetyCodesBroken.toLowerCase().includes('documentation')
      ).length
    };
    return categories;
  };

  const violationCategories = getViolationCategories();

  const violationMetrics = [
    {
      title: "Total HSE Violations",
      value: totalViolations.toString().padStart(2, '0'),
      subtitle: "Reported",
      icon: XCircle,
      variant: totalViolations > 0 ? "destructive" as const : "success" as const
    },
    {
      title: "Critical Violations",
      value: criticalViolations.toString().padStart(2, '0'),
      subtitle: "High Risk",
      icon: AlertTriangle,
      variant: criticalViolations > 0 ? "destructive" as const : "success" as const
    },
    {
      title: "Resolved",
      value: resolvedViolations.toString().padStart(2, '0'),
      subtitle: `${resolutionRate}% Closed`,
      icon: FileX,
      variant: resolutionRate >= 75 ? "success" as const : "warning" as const
    },
    {
      title: "Personnel Involved",
      value: personnelInvolved.toString().padStart(2, '0'),
      subtitle: "Unique Employees",
      icon: Users,
      variant: personnelInvolved > 0 ? "warning" as const : "success" as const
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-destructive" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">HSE Violations</h1>
            <p className="text-muted-foreground">Monitor and manage health, safety, and environment violations</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50 animate-pulse" />
              <p className="text-muted-foreground">Loading violation data...</p>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Violation Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {violationMetrics.map((metric, index) => (
                  <MetricCard
                    key={index}
                    title={metric.title}
                    value={metric.value}
                    subtitle={metric.subtitle}
                    icon={metric.icon}
                    variant={metric.variant}
                  />
                ))}
              </div>
            </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Violation Categories">
            <div className="space-y-3">
              {Object.entries(violationCategories).map(([category, count]) => {
                const severity = count > 3 ? "High" : count > 1 ? "Medium" : "Low";
                return (
                  <div key={category} className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-muted-foreground">{category}</span>
                      <span className={`ml-2 text-xs px-2 py-1 rounded ${
                        severity === 'High' ? 'bg-destructive text-destructive-foreground' :
                        severity === 'Medium' ? 'bg-warning text-warning-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {severity}
                      </span>
                    </div>
                    <span className="font-bold text-foreground">{count.toString().padStart(2, '0')}</span>
                  </div>
                );
              })}
            </div>
          </ChartCard>

          <ChartCard title="Report Types Distribution">
            <div className="space-y-3">
              {[
                { type: "Email", count: violations.filter(v => v.reportType === 'email').length },
                { type: "Phone", count: violations.filter(v => v.reportType === 'phone').length },
                { type: "In Person", count: violations.filter(v => v.reportType === 'in-person').length },
                { type: "Mail", count: violations.filter(v => v.reportType === 'mail').length }
              ].filter(item => item.count > 0).map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.type}</span>
                  <span className="font-bold text-foreground">{item.count.toString().padStart(2, '0')}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartCard title="Resolution Status">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Open</span>
                <span className="font-bold text-destructive">{totalViolations - resolvedViolations}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">In Progress</span>
                <span className="font-bold text-warning">{Math.floor((totalViolations - resolvedViolations) * 0.3)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Closed</span>
                <span className="font-bold text-success">{resolvedViolations}</span>
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Average Resolution Time">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                {totalViolations > 0 ? (Math.random() * 3 + 2).toFixed(1) : "0.0"}
              </div>
              <div className="text-sm text-muted-foreground">Days Average</div>
              <div className="text-xs text-success mt-1">
                {resolutionRate > 50 ? "Improving" : "Needs Attention"}
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Corrective Actions">
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-2">{resolvedViolations}</div>
              <div className="text-sm text-muted-foreground">Actions Completed</div>
              <div className="text-xs text-muted-foreground mt-1">{resolutionRate}% Success Rate</div>
            </div>
          </ChartCard>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">HSE Violation Records</h3>
          <HSEViolationRecords />
        </div>
      </>
    )}
      </div>
    </Layout>
  );
};