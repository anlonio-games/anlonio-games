import { PrismaClient } from '@prisma/client'

export const getAugData = cachedFunction((prisma: PrismaClient, search) => {
  return prisma.tftAugments.findFirst({
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
  name: 'getAugData',
  getKey (_, search) {
    return search
  }
})
