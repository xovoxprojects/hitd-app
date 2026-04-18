import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new Proxy({} as PrismaClient, {
    get(target, prop) {
      if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new PrismaClient({ log: ["query"] })
      }
      return (globalForPrisma.prisma as any)[prop]
    }
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

