import { Card } from '@tremor/react';

export default function TeamSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Team Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your team members and their roles
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <div className="p-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-base font-semibold text-gray-900">Team Members</h2>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all team members including their name, role, and status.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add team member
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                          Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Email
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Role
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
                          name: 'John Smith',
                          email: 'john@example.com',
                          role: 'Admin',
                          status: 'Active',
                        },
                        {
                          name: 'Sarah Johnson',
                          email: 'sarah@example.com',
                          role: 'Sales Manager',
                          status: 'Active',
                        },
                        {
                          name: 'Michael Brown',
                          email: 'michael@example.com',
                          role: 'Production Manager',
                          status: 'Active',
                        },
                      ].map((person) => (
                        <tr key={person.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {person.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              {person.status}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">Roles & Permissions</h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  name: 'Admin',
                  description: 'Full access to all features and settings',
                  permissions: ['Create/Edit/Delete Users', 'Manage Billing', 'Access All Reports', 'Manage Settings'],
                },
                {
                  name: 'Sales Manager',
                  description: 'Access to sales and client management features',
                  permissions: ['View/Edit Leads', 'View/Edit Deals', 'Access Sales Reports', 'Manage Team'],
                },
                {
                  name: 'Production Manager',
                  description: 'Access to production and project management features',
                  permissions: ['View/Edit Projects', 'Manage Production', 'Access Project Reports'],
                },
              ].map((role) => (
                <div key={role.name} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{role.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{role.description}</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Edit role
                    </button>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-xs font-medium text-gray-500">Permissions</h4>
                    <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {role.permissions.map((permission) => (
                        <li key={permission} className="text-sm text-gray-700">
                          • {permission}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 