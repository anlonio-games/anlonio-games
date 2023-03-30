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

  const augment = await event.context.prisma.tftAugments.findFirst({
    where: {
      OR: [
        {
          AND: andName
        },
        {
          AND: andOthers
        }
      ]
    }
  })

  if (!augment) {
    return 'Nenhum aprimoramento foi encontrado'
  }

  augment.name = getAugmentName(augment.nameSlug)
  const effects: any = {}
  for (const [key, value] of Object.entries(JSON.parse(augment.effects?.toString() as string))) {
    const effect = getEffectName(key).toLocaleLowerCase()
    const descAux = augment.desciption.toLocaleLowerCase()
    if (descAux.includes(effect + '*100')) {
      effects[effect] = ((value as number) * 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    } else {
      effects[effect] = value
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
  let rank = isHero || ranks[augment.rank]
  augment.name = augment.name.toUpperCase()
  if (isHero) {
    const heroName: any = augment.aliases.split(', ').find((alias: string) => alias.includes('_'))?.split('_')?.[1]
    rank = `${heroName} ${rank}`
  }
  return `${augment.name} (${rank}) -> ${description}}`
})
