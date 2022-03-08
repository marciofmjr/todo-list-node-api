import { PrismaClient } from '@prisma/client'

let database: PrismaClient

const getPrismaInstance = () => {
  const prisma = new PrismaClient()
  return prisma
}

if (process.env.NODE_ENV === 'production') {
  database = getPrismaInstance()
} else {
  if (!global.database) {
    global.database = getPrismaInstance()
  }

  database = global.database
}

export default database
