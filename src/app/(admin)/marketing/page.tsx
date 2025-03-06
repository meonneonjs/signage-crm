import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, BarChart3, Mail, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Marketing Dashboard - AtellierCRM',
  description: 'Manage your marketing campaigns, analyze performance, and engage with your audience.',
};

export default function MarketingDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Marketing</h2>
        <div className="flex items-center space-x-2">
          <Button>Create Campaign</Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,350</div>
                <p className="text-xs text-muted-foreground">
                  +180 new subscribers
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.8%</div>
                <p className="text-xs text-muted-foreground">
                  +2.4% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Campaigns pending
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>
                  Campaign engagement metrics over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add Chart Component Here */}
                <div className="h-[200px] flex items-center justify-center border rounded">
                  Performance Chart
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>
                  Your latest marketing campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Add Campaign List Component Here */}
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Spring Collection Launch</p>
                      <p className="text-sm text-muted-foreground">
                        Sent 2 days ago • 45% open rate
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Customer Feedback Survey</p>
                      <p className="text-sm text-muted-foreground">
                        Sent 5 days ago • 52% open rate
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-4">
          {/* Campaigns content */}
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>
                Manage your ongoing marketing campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add Campaigns Management UI Here */}
              <div className="h-[400px] flex items-center justify-center border rounded">
                Campaigns Management Interface
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          {/* Analytics content */}
          <Card>
            <CardHeader>
              <CardTitle>Marketing Analytics</CardTitle>
              <CardDescription>
                Detailed insights and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add Analytics Dashboard Here */}
              <div className="h-[400px] flex items-center justify-center border rounded">
                Analytics Dashboard
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audience" className="space-y-4">
          {/* Audience content */}
          <Card>
            <CardHeader>
              <CardTitle>Audience Segments</CardTitle>
              <CardDescription>
                Manage your subscriber lists and segments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add Audience Management UI Here */}
              <div className="h-[400px] flex items-center justify-center border rounded">
                Audience Management Interface
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 