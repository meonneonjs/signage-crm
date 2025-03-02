'use client';

import { ClientWithStats } from './types';
import Link from 'next/link';

interface ClientListProps {
  clients: ClientWithStats[];
}

export default function ClientList({ clients }: ClientListProps) {
  return (
    <div className="divide-y divide-gray-200">
      {clients.map((client) => (
        <Link 
          key={client.id} 
          href={`/dashboard/clients/${client.id}`}
          className="block hover:bg-gray-50"
        >
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="truncate text-sm font-medium text-blue-600">{client.name}</p>
              <div className="ml-2 flex flex-shrink-0">
                <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  {client._count.projects} projects
                </p>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  {client.email}
                </p>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <p>
                  Joined {new Date(client.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 