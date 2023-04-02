import Mustache from 'mustache'
import AugmentsJSON from '~~/assets/pt/augments.json'
import CommonJSON from '~~/assets/pt/common.json'
import UnitsJSON from '~~/assets/pt/units.json'

export default cachedEventHandler(async (event) => {
  const { search } : { search?: string} = getQuery(event)

  console.info('search', search)

  if (!search || search === 'help') {
    return 'Digite !aug [nome do aprimoramento] para obter informações sobre o aprimoramento. Exemplo: !aug jinx carry | Essa api é mantida pelo Anlonio, para mais informações acesse: anlonio.games'
  }

  if (search.length < 3) {
    return 'Texto muito curto. Digite !aug [nome do aprimoramento] para obter informações sobre o aprimoramento.'
  }

  const augment = await event.context.prisma.tftAugments.findFirst({
    where: {
      OR: [
        {
          aliases: {
            contains: search.trim() + ',',
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

  const Augments = AugmentsJSON as any
  const Common = CommonJSON as any
  const Units = UnitsJSON as any

  const ranks: any = {
    1: 'Silver',
    2: 'Gold',
    3: 'Prismatic'
  }

  if (!augment) {
    const augments = await event.context.prisma.tftAugments.findMany({
      where: {
        aliases: {
          contains: search.trim(),
          mode: 'insensitive'
        }
      }
    })

    if (augments.length > 0) {
      const augmentsList = augments.map((augment) => {
        augment.name = Augments[augment.nameSlug] || 'NOT_FOUND'
        let rank = Common[ranks[augment.rank]]
        augment.name = augment.name.toUpperCase()
        if (augment?.heroName) {
          rank = Units[augment.heroName] + ' ' + Common[augment?.heroType || '']
        }
        return `${augment.name} (${rank})`
      }).join(', ')
      return `Nenhum resultado exato encontrado. digite um (Sem os parênteses, caso tenha) do(s) resultado(s) para mais detalhes: ${augmentsList}`
    }

    return 'Nenhum aprimoramento foi encontrado.'
  }

  // build name
  augment.name = Augments[augment.nameSlug] || 'NOT_FOUND'

  let rank = Common[ranks[augment.rank]]
  augment.name = augment.name.toUpperCase()
  if (augment?.heroName) {
    rank = Units[augment.heroName] + ' ' + Common[augment?.heroType || '']
  }

  // build description
  const descriptionTemplate: string = Augments[augment.nameSlug + '_desc'] || 'NOT_FOUND'
  const effects: any = {}
  for (const [key, value] of Object.entries(JSON.parse(augment.effects?.toString() as string))) {
    const effect = getEffectName(key).toLocaleLowerCase()
    const descAux = descriptionTemplate.toLocaleLowerCase()
    if (descAux.includes(effect + '*100')) {
      effects[effect] = ((value as number) * 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    } else {
      effects[effect] = value
    }
  }
  const desc = descriptionTemplate.replaceAll('*100', '').replace(/@[^@]+@/g, function (match) {
    return match.toLowerCase()
  })
  const description = Mustache.render(desc, effects, {}, ['@', '@'])

  return `${augment.name} (${rank}) -> ${description}`
}, {
  maxAge: 60 * 60 * 24 * 7
})
