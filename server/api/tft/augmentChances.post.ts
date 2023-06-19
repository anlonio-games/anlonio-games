import { Prisma } from '@prisma/client'

export default eventHandler(async (event) => {
  const augmentsChances: Prisma.tftAugmentChancesCreateInput[] = [
    // { first: 'silver', second: 'silver', third: 'gold', chance: 5 },
    // { first: 'silver', second: 'silver', third: 'prismatic', chance: 5 },
    // { first: 'silver', second: 'gold', third: 'gold', chance: 12 },
    // { first: 'gold', second: 'silver', third: 'gold', chance: 18 },
    // { first: 'gold', second: 'gold', third: 'prismatic', chance: 3 },
    // { first: 'gold', second: 'silver', third: 'prismatic', chance: 2 },
    // { first: 'prismatic', second: 'silver', third: 'gold', chance: 4 },
    // { first: 'prismatic', second: 'prismatic', third: 'prismatic', chance: 1 },
    // { first: 'silver', second: 'prismatic', third: 'silver', chance: 0 },
    // { first: 'prismatic', second: 'gold', third: 'gold', chance: 2 },
    // { first: 'gold', second: 'silver', third: 'silver', chance: 0 },
    // { first: 'silver', second: 'gold', third: 'prismatic', chance: 5 },
    // { first: 'gold', second: 'gold', third: 'gold', chance: 22 },
    // { first: 'prismatic', second: 'silver', third: 'prismatic', chance: 1 },
    // { first: 'silver', second: 'prismatic', third: 'prismatic', chance: 1 },
    // { first: 'gold', second: 'prismatic', third: 'gold', chance: 10 },
    // { first: 'gold', second: 'prismatic', third: 'prismatic', chance: 1 },
    // { first: 'prismatic', second: 'gold', third: 'prismatic', chance: 1 },
    // { first: 'gold', second: 'prismatic', third: 'silver', chance: 6 },
    { first: 'silver', second: 'gold', third: 'silver', chance: 0 }
  ]

  return await event.context.prisma.tftAugmentChances.createMany({
    data: augmentsChances
  })
})
