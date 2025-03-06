'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Download, Filter } from 'lucide-react';
import { cn } from "@/lib/utils";

interface DetailedReportProps {
  data: any;
  type: 'sales' | 'production' | 'customers';
}

export function DetailedReport({ data, type }: DetailedReportProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const handleExport = () => {
    // Convert data to CSV format
    const headers = Object.keys(data[0] || {}).join(',');
    const rows = data.map((row: any) => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;

    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_report_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getFilterOptions = () => {
    switch (type) {
      case 'sales':
        return ['all', 'by_rep', 'by_product', 'by_region'];
      case 'production':
        return ['all', 'by_status', 'by_type', 'by_team'];
      case 'customers':
        return ['all', 'by_satisfaction', 'by_loyalty', 'by_value'];
      default:
        return ['all'];
    }
  };

  const getSortOptions = () => {
    switch (type) {
      case 'sales':
        return ['date', 'value', 'rep_name', 'product'];
      case 'production':
        return ['date', 'efficiency', 'team', 'status'];
      case 'customers':
        return ['date', 'satisfaction', 'projects', 'value'];
      default:
        return ['date'];
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Detailed {type.charAt(0).toUpperCase() + type.slice(1)} Report</span>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Filter By</label>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select filter" />
                </SelectTrigger>
                <SelectContent>
                  {getFilterOptions().map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select sorting" />
                </SelectTrigger>
                <SelectContent>
                  {getSortOptions().map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                    {type === 'sales' && (
                      <>
                        <th className="h-12 px-4 text-left align-middle font-medium">Representative</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Product</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Value</th>
                      </>
                    )}
                    {type === 'production' && (
                      <>
                        <th className="h-12 px-4 text-left align-middle font-medium">Project</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Efficiency</th>
                      </>
                    )}
                    {type === 'customers' && (
                      <>
                        <th className="h-12 px-4 text-left align-middle font-medium">Customer</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Projects</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Satisfaction</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="p-4">{format(new Date(item.date), 'PP')}</td>
                      {type === 'sales' && (
                        <>
                          <td className="p-4">{item.representative}</td>
                          <td className="p-4">{item.product}</td>
                          <td className="p-4 text-right">${item.value.toFixed(2)}</td>
                        </>
                      )}
                      {type === 'production' && (
                        <>
                          <td className="p-4">{item.project}</td>
                          <td className="p-4">{item.status}</td>
                          <td className="p-4 text-right">{item.efficiency}%</td>
                        </>
                      )}
                      {type === 'customers' && (
                        <>
                          <td className="p-4">{item.customer}</td>
                          <td className="p-4">{item.projects}</td>
                          <td className="p-4 text-right">{item.satisfaction}/5</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 