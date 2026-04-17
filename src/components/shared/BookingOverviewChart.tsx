"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingOverviewChartProps {
  data: { status: string; count: number }[];
}

const BookingOverviewChart = ({ data }: BookingOverviewChartProps) => {
  return (
    <Card className="col-span-1 border-none shadow-premium-subtle">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Bookings by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="status" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#888888', fontSize: 12 }}
                textAnchor="middle"
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#888888', fontSize: 12 }}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
                }}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]} 
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingOverviewChart;
