import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

// Adapter
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
})
// Factory to create new prisma client instance
function prismaClientSingleton(){
  return new PrismaClient({
    adapter
  })
}

// Contract
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// Global for prisma persists hot reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

// check
const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// conditional for development env
if(process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
