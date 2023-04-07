export const getAugStats = cachedFunction(async () => {
  interface PickStats {
    count: number
    place: number
    top4: number
    win: number
  }

  interface AugStats {
    id: string
    count: number
    avgPlace: number
    top4: number
    win: number
    pick1: PickStats
    pick2: PickStats
    pick3: PickStats
  }

  const data: any = await $fetch('https://tactics.tools/_next/data/TDwHIqTIMZ5I4W2gq0xvV/en/augments.json')
  return data.pageProps.augsData.singles as AugStats[]
}, {
  maxAge: 60 * 30,
  name: 'getAugStats'
})
