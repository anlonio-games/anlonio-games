import { Prisma } from '@prisma/client'

export default eventHandler(async (event) => {
  const { search } : { search?: string} = getQuery(event)

  const t: any = {
    hero: 'hero',
    silver: 'silver',
    gold: 'gold',
    prismatic: 'prismatic',
    heróico: 'hero',
    heroico: 'hero',
    heroi: 'hero',
    herói: 'hero',
    prata: 'silver',
    ouro: 'gold',
    prismático: 'prismatic',
    prismatico: 'prismatic',
    s: 'silver',
    g: 'gold',
    p: 'prismatic',
    h: 'hero'
  }

  const tr = {
    hero: 'Heróico',
    silver: 'Prata',
    gold: 'Ouro',
    prismatic: 'Prismático'
  }

  const firstChance = await event.context.prisma.tftAugmentChances.groupBy({
    by: ['first'],
    _sum: {
      chance: true
    }
  })
  const augChance = (aug: string) => {
    const chance = firstChance.find(chance => chance.first === aug)
    return chance ? chance._sum.chance || 0 : 0
  }

  if (search === 'help') {
    return `/me Heróico ${augChance('hero')}% Prata ${augChance('silver')}% Ouro ${augChance('gold')}% Prismático ${augChance('prismatic')}% | Exemplo de uso: !proximo prata ouro.`
  }

  let augmentsArg: string[] = []
  if ((search?.length || 0) <= 3) {
    augmentsArg = search?.split('').filter(aug => aug !== ' ') || []
  } else {
    augmentsArg = search?.split(' ') || []
  }

  if (augmentsArg?.length > 3) {
    return '/me Máximo de 3 aprimoramentos escolhidos.'
  }

  let augments: Prisma.EnumaugmentRankFilter[]
  try {
    augments = augmentsArg.map((aug):Prisma.EnumaugmentRankFilter => {
      // check if aug is valid
      if (!t[aug]) {
        throw new Error(`Aprimoramento ${aug} não encontrado.`)
      }
      return {
        equals: t[aug]
      }
    })
  } catch (e: any) {
    return `/me ${e.message}`
  }

  const secondChance = await event.context.prisma.tftAugmentChances.groupBy({
    where: {
      first: augments[0]
    },
    by: ['second'],
    _sum: {
      chance: true
    }
  })

  const augSecondChance = (aug: string) => {
    const chance = secondChance.find(chance => chance.second === aug)
    return chance ? chance._sum.chance || 0 : 0
  }

  if (augments.length === 1) {
    let r = '/me '
    secondChance.forEach((chance) => {
      r += `${tr[chance.second]} ${((chance?._sum?.chance || 0) / augChance(augments[0] as string) * 100).toFixed(2)}% `
    })
    return r
  }

  if (augments.length === 2) {
    const thirdChance = await event.context.prisma.tftAugmentChances.groupBy({
      where: {
        first: augments[0],
        second: augments[1]
      },
      by: ['third'],
      _sum: {
        chance: true
      }
    })

    let r = '/me '
    thirdChance.forEach((chance) => {
      r += `${tr[chance.third]} ${((chance?._sum?.chance || 0) / augSecondChance(augments[1] as string) * 100).toFixed(2)}% `
    })
    return r
  }

  if (augments.length === 3) {
    const chance = await event.context.prisma.tftAugmentChances.findFirstOrThrow({
      where: {
        first: augments[0],
        second: augments[1],
        third: augments[2]
      }
    })
    let r = '/me '
    r += ` ${tr[chance.first]} ${tr[chance.second]} ${tr[chance.third]} ${chance.chance.toFixed(2)}%`
    return r
  }

  return augments
})
