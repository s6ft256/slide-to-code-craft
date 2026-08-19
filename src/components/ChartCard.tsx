import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ChartCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  children?: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  variant = 'default',
  children
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-success/20 bg-success-light/50';
      case 'warning':
        return 'border-warning/20 bg-warning-light/50';
      case 'destructive':
        return 'border-destructive/20 bg-destructive-light/50';
      default:
        return 'border-border bg-card';
    }
  };

  return (
    <Card className={`${getVariantStyles()} transition-all duration-200 hover:shadow-md`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-4 w-4 text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Main Value */}
          <div className="text-2xl font-bold">{value}</div>
          
          {/* Subtitle and Trend */}
          <div className="flex items-center justify-between">
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {trend && trendValue && (
              <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
                {getTrendIcon()}
                <span className="text-xs font-medium">{trendValue}</span>
              </div>
            )}
          </div>

          {/* Custom Content (Charts, etc.) */}
          {children && (
            <div className="mt-4">
              {children}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;