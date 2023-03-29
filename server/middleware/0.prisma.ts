import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}

declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}

export default eventHandler((event) => {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  event.context.prisma = prisma
})
