'use server'

import { prisma } from './db'

export interface Client {
  id: string
  name: string
  email: string
  phone: string
}

export async function getClients(): Promise<Client[]> {
  return prisma.client.findMany()
}

export async function getClient(id: string): Promise<Client | null> {
  return prisma.client.findUnique({
    where: { id }
  })
}

export async function createClient(data: Omit<Client, 'id'>): Promise<Client> {
  return prisma.client.create({
    data
  })
}

export async function updateClient(id: string, data: Partial<Omit<Client, 'id'>>): Promise<Client> {
  return prisma.client.update({
    where: { id },
    data
  })
}

export async function deleteClient(id: string): Promise<Client> {
  return prisma.client.delete({
    where: { id }
  })
} 