import { Prisma } from '@prisma/client'

export type Client = Prisma.ClientGetPayload<{
  include: {
    projects: true
  }
}>

export interface ClientFormProps {
  initialData?: Partial<Client>
  onSubmit: (data: Partial<Client>) => Promise<void>
  isSubmitting?: boolean
} 