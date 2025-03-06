"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { RequirePermission } from "@/hooks/use-permissions"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PerformanceMetric {
  id: string
  path: string
  query: Record<string, string>
  metrics: {
    pageLoadTime: number
    firstContentfulPaint: number
    largestContentfulPaint: number
    timeToInteractive: number
    domContentLoaded: number
    memoryUsage?: number
    networkRequests: number
  }
  timestamp: string
}

export default function PerformancePage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<"1h" | "24h" | "7d">("24h")

  useEffect(() => {
    fetchMetrics()
  }, [timeRange])

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`/api/monitoring/metrics?timeRange=${timeRange}`)
      if (!response.ok) throw new Error("Failed to fetch metrics")
      const data = await response.json()
      setMetrics(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load performance metrics.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const calculateAverage = (key: keyof PerformanceMetric["metrics"]) => {
    if (metrics.length === 0) return 0
    const sum = metrics.reduce((acc, metric) => acc + metric.metrics[key], 0)
    return sum / metrics.length
  }

  const formatTime = (ms: number) => {
    return `${Math.round(ms)}ms`
  }

  const chartData = metrics.map((metric) => ({
    timestamp: new Date(metric.timestamp).toLocaleTimeString(),
    pageLoadTime: metric.metrics.pageLoadTime,
    firstContentfulPaint: metric.metrics.firstContentfulPaint,
    largestContentfulPaint: metric.metrics.largestContentfulPaint,
    timeToInteractive: metric.metrics.timeToInteractive,
  }))

  return (
    <RequirePermission permission="manage:settings">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Performance Monitoring</h3>
          <p className="text-sm text-muted-foreground">
            Monitor and analyze application performance metrics.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Page Load Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatTime(calculateAverage("pageLoadTime"))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    First Contentful Paint
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatTime(calculateAverage("firstContentfulPaint"))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Largest Contentful Paint
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatTime(calculateAverage("largestContentfulPaint"))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Time to Interactive
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatTime(calculateAverage("timeToInteractive"))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>
                  Page load performance metrics over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="pageLoadTime"
                        stroke="#8884d8"
                        name="Page Load Time"
                      />
                      <Line
                        type="monotone"
                        dataKey="firstContentfulPaint"
                        stroke="#82ca9d"
                        name="First Contentful Paint"
                      />
                      <Line
                        type="monotone"
                        dataKey="largestContentfulPaint"
                        stroke="#ffc658"
                        name="Largest Contentful Paint"
                      />
                      <Line
                        type="monotone"
                        dataKey="timeToInteractive"
                        stroke="#ff7300"
                        name="Time to Interactive"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Performance Metrics</CardTitle>
                <CardDescription>
                  View detailed performance data for each page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.map((metric) => (
                    <div
                      key={metric.id}
                      className="rounded-lg border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{metric.path}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(metric.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div>
                          <p className="text-sm font-medium">Page Load Time</p>
                          <p className="text-sm text-muted-foreground">
                            {formatTime(metric.metrics.pageLoadTime)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">First Contentful Paint</p>
                          <p className="text-sm text-muted-foreground">
                            {formatTime(metric.metrics.firstContentfulPaint)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Largest Contentful Paint</p>
                          <p className="text-sm text-muted-foreground">
                            {formatTime(metric.metrics.largestContentfulPaint)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Time to Interactive</p>
                          <p className="text-sm text-muted-foreground">
                            {formatTime(metric.metrics.timeToInteractive)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Error Tracking</CardTitle>
                <CardDescription>
                  Monitor and analyze application errors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Error tracking integration coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RequirePermission>
  )
} 