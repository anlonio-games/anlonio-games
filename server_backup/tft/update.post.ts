import ptTraits from '~~/assets/pt/traits.json'
import ptUnits from '~~/assets/pt/units.json'
import ptItems from '~~/assets/pt/items.json'
import ptAugments from '~~/assets/pt/augments.json'
import ptCommon from '~~/assets/pt/common.json'

import enTraits from '~~/assets/en/traits.json'
import enUnits from '~~/assets/en/units.json'
import enItems from '~~/assets/en/items.json'
import enAugments from '~~/assets/en/augments.json'
import enCommon from '~~/assets/en/common.json'

import esTraits from '~~/assets/es/traits.json'
import esUnits from '~~/assets/es/units.json'
import esItems from '~~/assets/es/items.json'
import esAugments from '~~/assets/es/augments.json'
import esCommon from '~~/assets/es/common.json'

export default eventHandler(async (event) => {
  interface Body {
    augments: Augment[]
    items: Item[]
    units: Unit[]
    traits: Trait[]
  }

  function getValue<T extends string> (obj: Record<T, any>, key: T) {
    return obj[key]
  }

  const { augments, items, units, traits } : Body = await readBody(event)

  const traitsData = []
  for (const [key, value] of Object.entries(traits)) {
    const aliases = [
      getValue(enTraits, key),
      getValue(ptTraits, key),
      getValue(esTraits, key)
    ]

    traitsData.push({
      name: value.name,
      effects: JSON.stringify(value.effects),
      nameSlug: key,
      aliases: aliases.join(',')
    })
  }

  try {
    await event.context.prisma.tftTraits.createMany({
      data: traitsData
    })
  } catch (error) {
    console.error(error)
  }

  const unitsData = []
  for (const [key, value] of Object.entries(units)) {
    const aliases = [
      getValue(enUnits, key),
      getValue(ptUnits, key),
      getValue(esUnits, key)
    ]

    unitsData.push({
      name: value.name,
      cost: value.cost,
      stats: JSON.stringify(value.stats),
      ability: JSON.stringify(value.ability),
      nameSlug: key,
      aliases: aliases.join(',')
    })
  }

  try {
    await event.context.prisma.tftUnits.createMany({
      data: unitsData
    })
  } catch (error) {
    console.error(error)
  }

  const itemsData = []
  for (const [key, value] of Object.entries(items)) {
    const aliases = [
      getValue(enItems, key),
      getValue(ptItems, key),
      getValue(esItems, key)
    ]

    itemsData.push({
      externalId: value.id,
      name: value.name,
      effects: JSON.stringify(value.effects),
      from: JSON.stringify(value.from),
      nameSlug: key,
      aliases: aliases.join(',')
    })
  }

  try {
    await event.context.prisma.tftItems.createMany({
      data: itemsData
    })
  } catch (error) {
    console.error(error)
  }

  const augmentsData = []
  for (const [key, value] of Object.entries(augments)) {
    const aliases = [
      getValue(enAugments, key),
      getValue(ptAugments, key),
      getValue(esAugments, key)
    ]

    const isHero = !!value?.hero

    const ranks: any = {
      1: 'Silver',
      2: 'Gold',
      3: 'Prismatic'
    }

    if (!isHero) {
      if (value.name.endsWith('I')) {
        const augEn: string = getValue(enAugments, key)
        const augPt: string = getValue(ptAugments, key)
        const augEs: string = getValue(esAugments, key)

        aliases.push(...[
          augEn.substring(0, augEn.lastIndexOf(' ')) + ' ' + getValue(enCommon, ranks[value.rank]),
          augPt.substring(0, augPt.lastIndexOf(' ')) + ' ' + getValue(ptCommon, ranks[value.rank]),
          augEs.substring(0, augEs.lastIndexOf(' ')) + ' ' + getValue(esCommon, ranks[value.rank])
        ])
      }
    } else {
      aliases.push(...[
        getValue(enUnits, value?.hero?.[0] || '') + ' ' + getValue(enCommon, value?.hero?.[1] || ''),
        getValue(ptUnits, value?.hero?.[0] || '') + ' ' + getValue(ptCommon, value?.hero?.[1] || ''),
        getValue(esUnits, value?.hero?.[0] || '') + ' ' + getValue(esCommon, value?.hero?.[1] || '')
      ])

      if (value?.hero?.[1] === 'support') {
        aliases.push(getValue(enUnits, value?.hero?.[0] || '') + ' ' + 'Supp')
        aliases.push(getValue(enUnits, value?.hero?.[0] || '') + ' ' + 'Sup')
      }
    }

    augmentsData.push({
      externalId: value.id,
      name: value.name,
      heroName: value?.hero?.[0] || null,
      heroType: value?.hero?.[1] || null,
      rank: value.rank,
      effects: JSON.stringify(value.effects),
      nameSlug: key,
      aliases: aliases.join(',')
    })
  }
  try {
    await event.context.prisma.tftAugments.createMany({
      data: augmentsData
    })
  } catch (error) {
    console.error(error)
  }
  return true
})
