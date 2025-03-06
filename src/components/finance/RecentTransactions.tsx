'use client';

import { Avatar } from '@/components/ui/avatar';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const transactions = [
  {
    id: '1',
    name: 'Client A Payment',
    email: 'client.a@example.com',
    amount: 2500.00,
    status: 'completed',
    type: 'income',
    date: 'Mar 5, 2024',
  },
  {
    id: '2',
    name: 'Software License',
    email: 'billing@software.com',
    amount: 99.00,
    status: 'completed',
    type: 'expense',
    date: 'Mar 4, 2024',
  },
  {
    id: '3',
    name: 'Client B Payment',
    email: 'client.b@example.com',
    amount: 1800.00,
    status: 'pending',
    type: 'income',
    date: 'Mar 3, 2024',
  },
  {
    id: '4',
    name: 'Office Supplies',
    email: 'office@supplies.com',
    amount: 245.50,
    status: 'completed',
    type: 'expense',
    date: 'Mar 2, 2024',
  },
];

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <div className={`p-2 ${
              transaction.type === 'income' 
                ? 'bg-green-100' 
                : 'bg-red-100'
            } rounded-full`}>
              {transaction.type === 'income' ? (
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-600" />
              )}
            </div>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.email}</p>
          </div>
          <div className="ml-auto text-right">
            <p className={`text-sm font-medium ${
              transaction.type === 'income'
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">{transaction.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 