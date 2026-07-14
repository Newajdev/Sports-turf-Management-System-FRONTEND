/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TooltipProps } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RevenueOverviewLineChartProps {
  data: {
    month: string;
    revenue: number;
  }[];
}

const RevenueOverviewLineChart = ({ data }: RevenueOverviewLineChartProps) => {
  const formatter: TooltipProps<number, string>["formatter"] = (value) => [
    `$${value ?? 0}`,
    "Revenue",
  ];

  return (
    <Card className="col-span-1 border-none shadow-premium-subtle md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Revenue Overview (Mock)
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#888888", fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#888888", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />

              <Tooltip
                cursor={{
                  stroke: "rgba(0,0,0,0.1)",
                  strokeWidth: 1,
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow:
                    "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
                }}
                formatter={(value: any) => [`$${value}`, "Revenue"]}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: "white",
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 0,
                  fill: "hsl(var(--primary))",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueOverviewLineChart;
