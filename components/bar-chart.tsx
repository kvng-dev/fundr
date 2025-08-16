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

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useMonthlyRevenue from "./useMonthlyData";

export const description = "Revenue bar chart (₦)";

// Monthly revenue data
const data = [
  { month: "Jan", revenue: 300000 },
  { month: "Feb", revenue: 450000 },
  { month: "Mar", revenue: 370000 },
  { month: "Apr", revenue: 280000 },
  { month: "May", revenue: 190000 },
  { month: "Jun", revenue: 120000 },
  { month: "Jul", revenue: 110000 },
  { month: "Aug", revenue: 115000 },
  { month: "Sep", revenue: 195000 },
  { month: "Oct", revenue: 150000 },
  { month: "Nov", revenue: 150000 },
  { month: "Dec", revenue: 0 },
];

export function RevenueBarChart() {
  const chartData = useMonthlyRevenue();
  return (
    <Card className="md:p-8 h-auto md:h-[600px] md:bg-muted-foreground/10">
      <CardHeader>
        <div className="md:flex items-center justify-between hidden">
          <div className="flex items-center gap-4 text-sm">
            <p>Showing data for</p>
            <select className="bg-white py-2 px-4 rounded text-gray-500">
              <option value="">Last 7 days</option>
              <option value="">Today</option>
              <option value="">Last 30 days</option>
            </select>
          </div>

          <div className="flex gap-8 items-center text-sm">
            <p>Today</p>
            <p className="bg-[#00C6FB0F] p-2">Last 7 days</p>
            <p>Last 30 days</p>
          </div>
        </div>
        <div className="md:hidden flex items-center justify-between">
          <p className="text-xl">Revenue</p>
          <select className="border border-muted-foreground/20 px-6 py-1 rounded-full text-gray-500 text-sm">
            <option value="">weekly</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="h-full bg-white rounded-sm md:py-8 md:px-3">
        <div style={{ width: "100%", height: 300 }}>
          <div className="h-full w-full">
            <div className="text-sm my-6 hidden md:block">
              <p>
                {" "}
                <span className="font-semibold">Revenue</span>{" "}
                <span className="text-green-300">+0.00%</span> vs Last 7 days
              </p>
              <p>
                <span className="text-2xl font-bold mr-3">
                  $
                  {data
                    .reduce((sum, item) => sum + item.revenue, 0)
                    .toLocaleString()}
                </span>
                in total value
              </p>
            </div>
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                barCategoryGap={20}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />
                <YAxis
                  className="text-xs"
                  axisLine={false}
                  tickLine={false}
                  domain={[1_000, 7_000]}
                  ticks={Array.from({ length: 7 }, (_, i) => (i + 1) * 1_000)}
                  tickFormatter={(value) => `$${(value / 1_000).toFixed(0)}k`}
                />

                <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                <Bar dataKey="revenue" fill="#FFC107" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
