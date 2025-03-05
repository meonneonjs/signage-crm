"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Building2,
  Activity,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

interface DashboardStats {
  totalUsers: number
  totalOrganizations: number
  activeUsers: number
  totalRevenue: number
  userGrowth: number
  revenueGrowth: number
}

interface OrganizationData {
  name: string
  users: number
  revenue: number
  status: "active" | "inactive"
}

interface UserActivityData {
  date: string
  newUsers: number
  activeUsers: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrganizations: 0,
    activeUsers: 0,
    totalRevenue: 0,
    userGrowth: 0,
    revenueGrowth: 0,
  })

  const [organizations, setOrganizations] = useState<OrganizationData[]>([])
  const [userActivity, setUserActivity] = useState<UserActivityData[]>([])

  useEffect(() => {
    // TODO: Fetch real data from API
    // Simulated data for now
    setStats({
      totalUsers: 1234,
      totalOrganizations: 56,
      activeUsers: 890,
      totalRevenue: 45678,
      userGrowth: 12.5,
      revenueGrowth: 8.3,
    })

    setOrganizations([
      { name: "Acme Corp", users: 45, revenue: 12000, status: "active" },
      { name: "Globex Corp", users: 32, revenue: 8500, status: "active" },
      { name: "Initech", users: 28, revenue: 7200, status: "active" },
      { name: "TechCorp", users: 15, revenue: 3800, status: "inactive" },
    ])

    setUserActivity([
      { date: "2024-01", newUsers: 65, activeUsers: 420 },
      { date: "2024-02", newUsers: 78, activeUsers: 450 },
      { date: "2024-03", newUsers: 92, activeUsers: 480 },
      { date: "2024-04", newUsers: 85, activeUsers: 510 },
      { date: "2024-05", newUsers: 95, activeUsers: 540 },
    ])
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Dashboard Overview</h3>
        <p className="text-sm text-muted-foreground">
          Monitor your platform's performance and key metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.userGrowth > 0 ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              {Math.abs(stats.userGrowth)}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrganizations}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeUsers} active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.revenueGrowth > 0 ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              {Math.abs(stats.revenueGrowth)}% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                Monthly new users and active users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="newUsers"
                      stroke="#8884d8"
                      name="New Users"
                    />
                    <Line
                      type="monotone"
                      dataKey="activeUsers"
                      stroke="#82ca9d"
                      name="Active Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organizations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Overview</CardTitle>
              <CardDescription>
                Top organizations by user count and revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={organizations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#8884d8" name="Users" />
                    <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 