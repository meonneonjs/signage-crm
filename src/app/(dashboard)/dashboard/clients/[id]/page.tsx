"use client"

import { Client } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"
import Link from "next/link"
import { PencilIcon } from "@heroicons/react/24/outline"
import { useToast } from "@/components/ui/use-toast"

interface PageProps {
  params: {
    id: string
  }
}

export default function ClientPage({ params }: PageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [client, setClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadClient = useCallback(async () => {
    try {
      const response = await fetch(`/api/clients/${params.id}`)
      if (!response.ok) throw new Error('Failed to load client')
      const data = await response.json()
      setClient(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load client'))
    } finally {
      setIsLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    loadClient()
  }, [loadClient])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this client?')) return
    
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/clients/${params.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete client')
      toast({
        title: "Success",
        description: "Client deleted successfully",
      })
      router.push('/dashboard/clients')
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete client'))
      setIsDeleting(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!client) return <div>Client not found</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{client.name}</h1>
        <div className="space-x-2">
          <button
            onClick={() => router.push(`/dashboard/clients/${params.id}/edit`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isDeleting}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold">Contact Information</h2>
          <p>Email: {client.email}</p>
          <p>Phone: {client.phone || 'N/A'}</p>
        </div>
        <div>
          <h2 className="font-semibold">Address</h2>
          <p>{client.address || 'N/A'}</p>
        </div>
      </div>

      {client.projects && client.projects.length > 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Projects
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {client.projects.map((project: any) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {project.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(project.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(project.endDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
} 