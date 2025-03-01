export interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt: Date
  updatedAt: Date
  projects?: Project[]
}

export interface Project {
  id: string
  name: string
  status: string
  startDate: Date
  endDate: Date
  clientId: string
}

export async function getClients(): Promise<Client[]> {
  const response = await fetch('/api/clients')
  if (!response.ok) {
    throw new Error('Failed to fetch clients')
  }
  return response.json()
}

export async function getClient(id: string): Promise<Client> {
  const response = await fetch(`/api/clients/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch client')
  }
  return response.json()
}

export async function createClient(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
  const response = await fetch('/api/clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create client')
  }
  return response.json()
}

export async function updateClient(id: string, data: Partial<Client>): Promise<Client> {
  const response = await fetch(`/api/clients/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update client')
  }
  return response.json()
}

export async function deleteClient(id: string): Promise<void> {
  const response = await fetch(`/api/clients/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete client')
  }
} 