"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Clock,
  AlertTriangle,
  Download,
  Calendar,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/date-range-picker";

// Mock data for charts (replace with real data later)
const productionData = {
  totalOutput: "157,892",
  efficiency: "94.5%",
  downtime: "3.2%",
  qualityScore: "98.7%",
};

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Production Reports</h1>
          <p className="text-muted-foreground">
            Analyze production metrics and generate insights
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <DateRangePicker />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <BarChart3 className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Output</p>
              <h3 className="text-2xl font-bold">{productionData.totalOutput}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Efficiency Rate</p>
              <h3 className="text-2xl font-bold">{productionData.efficiency}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-orange-100 p-3">
              <Clock className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Downtime</p>
              <h3 className="text-2xl font-bold">{productionData.downtime}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-100 p-3">
              <AlertTriangle className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quality Score</p>
              <h3 className="text-2xl font-bold">{productionData.qualityScore}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Production Trends</h3>
            <Select defaultValue="weekly">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[300px] w-full">
            {/* Add Chart Component Here */}
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Production Trend Chart
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Equipment Utilization</h3>
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select line" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lines</SelectItem>
                <SelectItem value="line1">Line 1</SelectItem>
                <SelectItem value="line2">Line 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[300px] w-full">
            {/* Add Chart Component Here */}
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Equipment Utilization Chart
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Quality Control</h3>
            <Select defaultValue="defects">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="defects">Defects</SelectItem>
                <SelectItem value="yield">Yield</SelectItem>
                <SelectItem value="rework">Rework</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[300px] w-full">
            {/* Add Chart Component Here */}
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Quality Control Chart
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Downtime Analysis</h3>
            <Select defaultValue="causes">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="causes">By Cause</SelectItem>
                <SelectItem value="equipment">By Equipment</SelectItem>
                <SelectItem value="shift">By Shift</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[300px] w-full">
            {/* Add Chart Component Here */}
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Downtime Analysis Chart
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 