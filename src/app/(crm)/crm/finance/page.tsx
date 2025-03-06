'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/components/finance/Overview';
import { RecentTransactions } from '@/components/finance/RecentTransactions';
import { Button } from '@/components/ui/button';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  CreditCard, 
  Wallet, 
  FileText,
  Download,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default function FinancePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Finance Dashboard</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,234.50</div>
                <p className="text-xs text-muted-foreground">
                  +4.3% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$32,997.39</div>
                <p className="text-xs text-muted-foreground">
                  +27.4% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,450.00</div>
                <p className="text-xs text-muted-foreground">
                  -12.5% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  You made 265 transactions this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>
                A list of all your transactions from all accounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Transaction list will go here */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Payment from Client A</p>
                      <p className="text-sm text-muted-foreground">Mar 5, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+$2,500.00</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-red-100 rounded-full">
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Software Subscription</p>
                      <p className="text-sm text-muted-foreground">Mar 4, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">-$99.00</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>
                Download and view your financial reports.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <Download className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Monthly Report - February 2024</p>
                      <p className="text-sm text-muted-foreground">PDF • 2.3 MB</p>
                    </div>
                  </div>
                  <Button variant="outline">Download</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <Download className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Q4 2023 Financial Statement</p>
                      <p className="text-sm text-muted-foreground">PDF • 4.1 MB</p>
                    </div>
                  </div>
                  <Button variant="outline">Download</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Invoices</h2>
              <p className="text-muted-foreground">Manage and track your invoices.</p>
            </div>
            <Link href="/crm/finance/invoices/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </Link>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>
                Manage and track your invoices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/crm/finance/invoices/INV-2024-001" className="block">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-4 w-4" />
                      <div>
                        <p className="font-medium">INV-2024-001</p>
                        <p className="text-sm text-muted-foreground">Client A • Due Mar 15</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$3,500.00</p>
                      <p className="text-sm text-green-600">Paid</p>
                    </div>
                  </div>
                </Link>
                
                <Link href="/crm/finance/invoices/INV-2024-002" className="block">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-4 w-4" />
                      <div>
                        <p className="font-medium">INV-2024-002</p>
                        <p className="text-sm text-muted-foreground">Client B • Due Mar 20</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$2,800.00</p>
                      <p className="text-sm text-amber-600">Pending</p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 