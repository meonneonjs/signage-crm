"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DetailedReport } from "./_components/DetailedReport";
import { KPIMetrics } from "./_components/KPIMetrics";

// Demo data - replace with actual API calls
const demoKPIMetrics = {
  sales: [
    { label: 'Total Revenue', value: 125000, trend: 12.5, prefix: '$' },
    { label: 'Average Deal Size', value: 15000, trend: -2.3, prefix: '$' },
    { label: 'Win Rate', value: 68, trend: 5.7, suffix: '%' },
    { label: 'Active Deals', value: 24, trend: 8.9 },
  ],
  production: [
    { label: 'On-Time Delivery', value: 94, trend: 3.2, suffix: '%' },
    { label: 'Quality Score', value: 4.8, trend: 0.5, suffix: '/5' },
    { label: 'Production Efficiency', value: 87, trend: 6.1, suffix: '%' },
    { label: 'Active Projects', value: 32, trend: 15.4 },
  ],
  customers: [
    { label: 'Customer Satisfaction', value: 4.7, trend: 0.3, suffix: '/5' },
    { label: 'Retention Rate', value: 92, trend: 2.8, suffix: '%' },
    { label: 'Net Promoter Score', value: 76, trend: 5.4 },
    { label: 'Active Customers', value: 156, trend: 12.1 },
  ],
};

const demoDetailedData = {
  sales: [
    { date: '2024-03-01', representative: 'John Doe', product: 'Digital Display', value: 12500 },
    { date: '2024-03-02', representative: 'Sarah Smith', product: 'LED Sign', value: 8750 },
    { date: '2024-03-03', representative: 'Mike Johnson', product: 'Billboard', value: 15000 },
  ],
  production: [
    { date: '2024-03-01', project: 'City Center Display', status: 'In Progress', efficiency: 92 },
    { date: '2024-03-02', project: 'Mall Directory', status: 'Completed', efficiency: 88 },
    { date: '2024-03-03', project: 'Airport Signage', status: 'Planning', efficiency: 95 },
  ],
  customers: [
    { date: '2024-03-01', customer: 'Retail Corp', projects: 3, satisfaction: 4.8 },
    { date: '2024-03-02', customer: 'Tech Solutions', projects: 2, satisfaction: 4.5 },
    { date: '2024-03-03', customer: 'City Services', projects: 4, satisfaction: 4.9 },
  ],
};

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("sales");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date(),
  });
  const [data, setData] = useState({
    sales: null,
    production: null,
    customers: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          startDate: dateRange.startDate.toISOString(),
          endDate: dateRange.endDate.toISOString(),
        });

        const [salesData, productionData, customersData] = await Promise.all([
          fetch(`/api/analytics/sales?${params}`).then((res) => res.json()),
          fetch(`/api/analytics/production?${params}`).then((res) => res.json()),
          fetch(`/api/analytics/customers?${params}`).then((res) => res.json()),
        ]);

        setData({
          sales: salesData,
          production: productionData,
          customers: customersData,
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
        // Use demo data as fallback
        setData({
          sales: demoDetailedData.sales,
          production: demoDetailedData.production,
          customers: demoDetailedData.customers,
        });
      }
    };

    fetchData();
  }, [dateRange]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#1f2f5c]">Analytics & Reporting</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sales">Sales Performance</TabsTrigger>
          <TabsTrigger value="production">Production Metrics</TabsTrigger>
          <TabsTrigger value="customers">Customer Insights</TabsTrigger>
        </TabsList>

        {['sales', 'production', 'customers'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-6">
            <KPIMetrics metrics={demoKPIMetrics[tab as keyof typeof demoKPIMetrics]} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>{tab === 'sales' ? 'Revenue Trend' : 
                             tab === 'production' ? 'Efficiency Trend' : 
                             'Satisfaction Trend'}</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data[tab as keyof typeof data] || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey={tab === 'sales' ? 'value' : 
                                tab === 'production' ? 'efficiency' : 
                                'satisfaction'}
                        stroke="#8884d8"
                        name={tab === 'sales' ? 'Revenue' : 
                              tab === 'production' ? 'Efficiency' : 
                              'Satisfaction'}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{tab === 'sales' ? 'Sales by Product' : 
                             tab === 'production' ? 'Project Status' : 
                             'Customer Distribution'}</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data[tab as keyof typeof data] || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={tab === 'sales' ? 'product' : 
                                    tab === 'production' ? 'status' : 
                                    'customer'} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey={tab === 'sales' ? 'value' : 
                                tab === 'production' ? 'efficiency' : 
                                'projects'}
                        fill="#82ca9d"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{tab === 'sales' ? 'Representative Performance' : 
                             tab === 'production' ? 'Team Performance' : 
                             'Satisfaction Distribution'}</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data[tab as keyof typeof data] || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={tab === 'sales' ? 'representative' : 
                                    tab === 'production' ? 'project' : 
                                    'customer'} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey={tab === 'sales' ? 'value' : 
                                tab === 'production' ? 'efficiency' : 
                                'satisfaction'}
                        fill="#ffc658"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <DetailedReport
              type={tab as 'sales' | 'production' | 'customers'}
              data={demoDetailedData[tab as keyof typeof demoDetailedData]}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 