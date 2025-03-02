"use client"

import { type Client } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import ClientForm from "@/components/clients/ClientForm"
import { getClient, updateClient } from "@/services/clientService"

interface PageProps {
  params: {
    id: string
  }
}

export default function EditClientPage({ params }: PageProps) {
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<Error | null>(null)

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

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await updateClient(params.id, data)
      router.push(`/dashboard/clients/${params.id}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!client) return <div>Client not found</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Client: {client.name}</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update the client information using the form below.
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <ClientForm
            initialData={client}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  )
} 