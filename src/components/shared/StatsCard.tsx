import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  iconName: keyof typeof Icons;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard = ({ title, value, iconName, description, trend }: StatsCardProps) => {
  const Icon = Icons[iconName] as LucideIcon;

  return (
    <Card className="overflow-hidden border-none shadow-premium-subtle transition-all duration-300 hover:shadow-premium-hover">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="rounded-full bg-primary/10 p-2 transition-colors duration-300 group-hover:bg-primary/20">
            {Icon && <Icon className="h-4 w-4 text-primary" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {(description || trend) && (
          <p className="mt-1 text-xs text-muted-foreground">
            {trend && (
              <span className={trend.isPositive ? "text-emerald-500 font-medium" : "text-rose-500 font-medium"}>
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}% 
              </span>
            )}
            {" "}{description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
