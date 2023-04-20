import { PrismaClient } from '@prisma/client'

export const getUnitData = cachedFunction((prisma: PrismaClient, search) => {
  return prisma.tftUnits.findFirst({
    where: {
      OR: [
        {
          aliases: {
            contains: ',' + search.trim() + ',',
            mode: 'insensitive'
          }
        },
        {
          aliases: {
            startsWith: search.trim() + ',',
            mode: 'insensitive'
          }
        },
        {
          aliases: {
            endsWith: ',' + search.trim(),
            mode: 'insensitive'
          }
        }
      ]
    }
  })
}, {
  maxAge: 60 * 60 * 24 * 7,
  name: 'getUnitData',
  getKey (_, search) {
    return search
  }
})
