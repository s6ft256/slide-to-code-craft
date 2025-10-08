import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  variant?: "default" | "success" | "warning" | "destructive";
  className?: string;
}

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend = "neutral", 
  variant = "default",
  className 
}: MetricCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success-light/50";
      case "warning":
        return "border-warning/20 bg-warning-light/50";
      case "destructive":
        return "border-destructive/20 bg-destructive-light/50";
      default:
        return "border-border bg-card";
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case "success":
        return "text-success bg-success-light";
      case "warning":
        return "text-warning bg-warning-light";
      case "destructive":
        return "text-destructive bg-destructive-light";
      default:
        return "text-primary bg-accent-light";
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return variant === "destructive" ? "text-destructive" : "text-success";
      case "down":
        return variant === "success" ? "text-destructive" : "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={cn("shadow-soft hover:shadow-medium transition-smooth", getVariantClasses(), className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {subtitle && (
                <p className={cn("text-sm font-medium", getTrendColor())}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", getIconClasses())}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;