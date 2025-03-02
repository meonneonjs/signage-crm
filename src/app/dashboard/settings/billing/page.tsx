import { Card } from '@tremor/react';

export default function BillingSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Billing & Subscription</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription, payment methods, and billing history
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">Current Plan</h2>
            <div className="mt-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Professional Plan</h3>
                    <p className="mt-1 text-sm text-gray-500">$99/month</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change plan
                  </button>
                </div>
                <div className="mt-4">
                  <h4 className="text-xs font-medium text-gray-500">Features included:</h4>
                  <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li className="text-sm text-gray-700">• Unlimited users</li>
                    <li className="text-sm text-gray-700">• Advanced analytics</li>
                    <li className="text-sm text-gray-700">• Custom branding</li>
                    <li className="text-sm text-gray-700">• API access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">Payment Methods</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-12 bg-gray-100 rounded"></div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">•••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/24</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Default
                    </span>
                    <button className="text-sm text-gray-500 hover:text-gray-700">Edit</button>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="block w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400"
              >
                <span className="text-sm font-semibold text-gray-600">Add new payment method</span>
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">Billing History</h2>
            <div className="mt-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Description
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      date: 'Mar 1, 2024',
                      description: 'Professional Plan - Monthly',
                      amount: '$99.00',
                      status: 'Paid',
                    },
                    {
                      date: 'Feb 1, 2024',
                      description: 'Professional Plan - Monthly',
                      amount: '$99.00',
                      status: 'Paid',
                    },
                    {
                      date: 'Jan 1, 2024',
                      description: 'Professional Plan - Monthly',
                      amount: '$99.00',
                      status: 'Paid',
                    },
                  ].map((invoice) => (
                    <tr key={invoice.date}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0">
                        {invoice.date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {invoice.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {invoice.amount}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          {invoice.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 