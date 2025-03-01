"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ClientForm from "@/components/clients/ClientForm"
import { createClient } from "@/services/clientService"

export default function NewClientPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await createClient(data)
      router.push("/dashboard/clients")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add New Client</h1>
        <p className="mt-2 text-sm text-gray-600">
          Fill in the form below to create a new client.
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <ClientForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  )
} 