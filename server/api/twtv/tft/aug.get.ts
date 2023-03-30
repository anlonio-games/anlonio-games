import { Prisma } from '@prisma/client'
import Mustache from 'mustache'

export default eventHandler(async (event) => {
  const { search } : { type?: string, search?: string} = getQuery(event)
  const andName: Prisma.Enumerable<Prisma.tftAugmentsWhereInput> = []
  const andOthers : Prisma.Enumerable<Prisma.tftAugmentsWhereInput> = []
  if (search) {
    search.split(' ').forEach((word) => {
      andName.push({ name: { contains: word as string, mode: 'insensitive' } })
      andOthers.push({
        OR: [
          { aliases: { contains: word as string, mode: 'insensitive' } },
          { nameSlug: { contains: word as string, mode: 'insensitive' } }
        ]
      })
    })
  }

  const augments = await event.context.prisma.tftAugments.findMany({
    where: {
      OR: [
        {
          AND: andName
        },
        {
          AND: andOthers
        }
      ]
    },
    take: 4
  })

  let response = ''

  for (let i = 0; i < augments.length; i++) {
    const augment = augments[i]
    const last = i === augments.length - 1

    augment.name = getAugmentName(augment.nameSlug)
    const effects: any = {}
    for (const [key, value] of Object.entries(JSON.parse(augment.effects?.toString() as string))) {
      if (augment.desciption.includes(key + '*100')) {
        effects[key.toLowerCase()] = ((value as number) * 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
      } else {
        effects[key.toLowerCase()] = value
      }
    }
    const desc = augment.desciption.replace('*100', '').replace(/@[^@]+@/g, function (match) {
      return match.toLowerCase()
    })
    const description = Mustache.render(desc, effects, {}, ['@', '@'])
    const ranks: any = {
      1: 'Prata',
      2: 'Ouro',
      3: 'Prismático'
    }
    const isHero = augment.aliases?.includes('carry') ? 'Carry' : augment.aliases?.includes('support') ? 'Support' : false
    let rank = isHero ?? ranks[augment.rank]
    augment.name = augment.name.toUpperCase()
    if (isHero) {
      const heroName: any = augment.aliases.split(', ').find((alias: string) => alias.includes('_'))?.split('_')?.[1]
      rank = `${heroName} ${rank}`
    }
    response += `${augment.name} (${rank}) -> ${description} ${last ? '' : ' | '}`
  }
  if (response) {
    return response
  } else {
    return 'Nenhum aprimoramento foi encontrado'
  }
})
