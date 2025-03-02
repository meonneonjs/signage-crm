import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  try {
    // Create default admin user
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@signage-crm.com' },
      update: {},
      create: {
        email: 'admin@signage-crm.com',
        name: 'Admin User',
        password: await hash('admin123', 10),
        role: 'ADMIN',
      },
    })

    console.log('Database initialized with admin user:', adminUser.email)
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main() 