import { PrismaClient } from '@prisma/client'
import AugmentsJSON from '~~/assets/pt/augments.json'
import CommonJSON from '~~/assets/pt/common.json'

export const getAugFindDetails = cachedFunction(async (prisma: PrismaClient, search) => {
  const Augments = AugmentsJSON as any
  const Common = CommonJSON as any

  const ranks: any = {
    1: 'Silver',
    2: 'Gold',
    3: 'Prismatic'
  }

  const augments = await prisma.tftAugments.findMany({
    where: {
      aliases: {
        contains: search.trim(),
        mode: 'insensitive'
      }
    }
  })
  if (augments.length > 0) {
    const augmentsList = augments.map((augment: any) => {
      augment.name = Augments[augment.nameSlug] || 'NOT_FOUND'
      const rank = Common[ranks[augment.rank]]
      augment.name = augment.name.toUpperCase()
      return `${augment.name} (${rank})`
    }).join(', ')
    return `Nenhum resultado exato encontrado. digite um (Sem os parênteses, caso tenha) do(s) resultado(s) para mais detalhes: ${augmentsList}`
  }

  return 'Nenhum aprimoramento foi encontrado.'
}, {
  maxAge: 60 * 60 * 24 * 7,
  name: 'getAugFindDetails',
  getKey (_, search) {
    return search
  }
})
