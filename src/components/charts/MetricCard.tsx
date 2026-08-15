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
        return "border-success/30 bg-gradient-to-br from-success-light/60 to-success-light/30 hover:from-success-light/70 hover:to-success-light/40";
      case "warning":
        return "border-warning/30 bg-gradient-to-br from-warning-light/60 to-warning-light/30 hover:from-warning-light/70 hover:to-warning-light/40";
      case "destructive":
        return "border-destructive/30 bg-gradient-to-br from-destructive-light/60 to-destructive-light/30 hover:from-destructive-light/70 hover:to-destructive-light/40";
      default:
        return "border-border/30 bg-gradient-to-br from-card/80 to-card/40 hover:from-card/90 hover:to-card/50";
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case "success":
        return "text-success bg-success-light/80 shadow-sm";
      case "warning":
        return "text-warning bg-warning-light/80 shadow-sm";
      case "destructive":
        return "text-destructive bg-destructive-light/80 shadow-sm";
      default:
        return "text-primary bg-primary/10 shadow-sm";
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