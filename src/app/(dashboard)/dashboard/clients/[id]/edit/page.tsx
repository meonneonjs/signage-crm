"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import ClientForm from "@/components/clients/ClientForm"
import { getClient, updateClient } from "@/services/clientService"

export default function EditClientPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [client, setClient] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadClient()
  }, [params.id])

  async function loadClient() {
    try {
      const data = await getClient(params.id)
      setClient(data)
    } catch (error) {
      notFound()
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await updateClient(params.id, data)
      router.push(`/dashboard/clients/${params.id}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!client) {
    notFound()
  }

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