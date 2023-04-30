import Mustache from 'mustache'
import AugmentsJSON from '~~/assets/pt/augments.json'
import CommonJSON from '~~/assets/pt/common.json'
import UnitsJSON from '~~/assets/pt/units.json'

export const getAugText = cachedFunction((augment) => {
  const Augments = AugmentsJSON as any
  const Common = CommonJSON as any
  const Units = UnitsJSON as any

  const ranks: any = {
    1: 'Silver',
    2: 'Gold',
    3: 'Prismatic'
  }

  let name = Augments[augment.nameSlug] || 'NOT_FOUND'

  let rank = Common[ranks[augment.rank]]
  name = name.toUpperCase()
  if (augment?.heroName) {
    rank = Units[augment.heroName] + ' ' + Common[augment?.heroType || '']
  }

  // build description
  const descriptionTemplate: string = Augments[augment.nameSlug + '_desc'] || 'NOT_FOUND'
  const effects: any = {}
  for (const [key, value] of Object.entries(JSON.parse(augment.effects?.toString() as string))) {
    const effect = getEffectName(key).toLocaleLowerCase()
    if (Object.keys(effects).includes(effect)) {
      continue
    }
    const descAux = descriptionTemplate.toLocaleLowerCase()
    if (descAux.includes(effect + '*100')) {
      effects[effect] = ((value as number) * 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    } else {
      effects[effect] = value
    }
  }
  const desc = descriptionTemplate
    .replaceAll('<TFTKeyword>', '')
    .replaceAll('</TFTKeyword>', '')
    .replaceAll('*100', '').replace(/@[^@]+@/g, function (match) {
      return match.toLowerCase()
    })
  const description = Mustache.render(desc, effects, {}, ['@', '@'])

  return {
    name,
    rank,
    description
  }
}, {
  maxAge: 60 * 60 * 24 * 7,
  name: 'getAugText',
  getKey (augment) {
    return augment.nameSlug
  }
})
