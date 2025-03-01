'use client'

import { useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table'
import { ChevronUpIcon, ChevronDownIcon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

type Client = {
  id: string
  name: string
  email: string
  phone: string | null
  address: string | null
  createdAt: Date
}

const columnHelper = createColumnHelper<Client>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => (
      <div className="flex items-center">
        <Link 
          href={`/dashboard/clients/${info.row.original.id}`}
          className="text-indigo-600 hover:text-indigo-900"
        >
          {info.getValue()}
        </Link>
      </div>
    ),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('address', {
    header: 'Address',
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (info) => info.getValue().toLocaleDateString(),
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: (info) => (
      <div className="flex items-center gap-x-3">
        <Link
          href={`/dashboard/clients/${info.row.original.id}/edit`}
          className="text-gray-400 hover:text-indigo-600"
        >
          <PencilIcon className="h-5 w-5" />
        </Link>
        <button
          onClick={() => handleDelete(info.row.original.id)}
          className="text-gray-400 hover:text-red-600"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    ),
  }),
]

// Sample data - replace with actual data from your database
const sampleData: Client[] = [
  {
    id: '1',
    name: 'Acme Corp',
    email: 'contact@acme.com',
    phone: '(555) 123-4567',
    address: '123 Business Ave',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'TechStart Inc',
    email: 'info@techstart.com',
    phone: '(555) 987-6543',
    address: '456 Innovation Blvd',
    createdAt: new Date('2024-02-15'),
  },
]

const handleDelete = async (id: string) => {
  if (confirm('Are you sure you want to delete this client?')) {
    // TODO: Implement delete functionality
    console.log('Delete client:', id)
  }
}

export default function ClientTable({ searchQuery }: { searchQuery: string }) {
  const [sorting, setSorting] = useState<SortingState>([])
  
  // Filter data based on search query
  const filteredData = sampleData.filter((client) =>
    Object.values(client).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="ring-1 ring-gray-300 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                >
                  {header.column.getCanSort() ? (
                    <button
                      className="group inline-flex"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="ml-2 flex-none rounded">
                        {{
                          asc: <ChevronUpIcon className="h-5 w-5" />,
                          desc: <ChevronDownIcon className="h-5 w-5" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    </button>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 