'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, TabGroup, TabList, Tab, TabPanels, TabPanel, Grid, Metric, BarChart } from '@tremor/react';
import { CommissionService } from '@/lib/services/commission.service';
import CommissionHistory from '@/components/CommissionHistory';
import PaymentHistory from '@/components/PaymentHistory';

interface CommissionStats {
  totalCommissions: number;
  pendingAmount: number;
  paidAmount: number;
}

export default function CommissionDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [stats, setStats] = useState<CommissionStats>({
    totalCommissions: 0,
    pendingAmount: 0,
    paidAmount: 0,
  });
  const [commissions, setCommissions] = useState([]);
  const [payments, setPayments] = useState([]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // TODO: Replace with actual user ID from auth context
  const userId = 'user_id';

  useEffect(() => {
    fetchStats();
    fetchCommissions();
    fetchPayments();
  }, []);

  const fetchStats = async () => {
    try {
      const stats = await CommissionService.getUserCommissionStats(userId, currentYear, currentMonth);
      setStats(stats);
    } catch (error) {
      console.error('Error fetching commission stats:', error);
    }
  };

  const fetchCommissions = async () => {
    try {
      // TODO: Implement API endpoint to fetch commissions
      const response = await fetch(`/api/commissions?userId=${userId}`);
      const data = await response.json();
      setCommissions(data);
    } catch (error) {
      console.error('Error fetching commissions:', error);
    }
  };

  const fetchPayments = async () => {
    try {
      // TODO: Implement API endpoint to fetch payments
      const response = await fetch(`/api/commission-payments?userId=${userId}`);
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Title>Commission Dashboard</Title>
        <Text>Track your commission earnings and payments</Text>
      </div>

      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
        <Card>
          <Text>Total Commissions</Text>
          <Metric>{stats.totalCommissions}</Metric>
        </Card>
        <Card>
          <Text>Pending Amount</Text>
          <Metric>${stats.pendingAmount.toFixed(2)}</Metric>
        </Card>
        <Card>
          <Text>Paid Amount</Text>
          <Metric>${stats.paidAmount.toFixed(2)}</Metric>
        </Card>
      </Grid>

      <Card>
        <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
          <TabList>
            <Tab>Commission History</Tab>
            <Tab>Payment History</Tab>
            <Tab>Performance</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CommissionHistory commissions={commissions} />
            </TabPanel>
            <TabPanel>
              <PaymentHistory payments={payments} />
            </TabPanel>
            <TabPanel>
              <div className="mt-4">
                <Title>Monthly Performance</Title>
                <BarChart
                  data={[
                    {
                      month: 'Jan',
                      'Self Generated': 4000,
                      'Company Provided': 2400,
                      Override: 1000,
                    },
                    {
                      month: 'Feb',
                      'Self Generated': 3000,
                      'Company Provided': 1398,
                      Override: 800,
                    },
                    {
                      month: 'Mar',
                      'Self Generated': 2000,
                      'Company Provided': 9800,
                      Override: 1200,
                    },
                  ]}
                  index="month"
                  categories={['Self Generated', 'Company Provided', 'Override']}
                  colors={['blue', 'green', 'yellow']}
                  yAxisWidth={48}
                />
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  );
} 