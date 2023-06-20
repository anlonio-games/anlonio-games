import statsData from '~~/assets/stats.json'

export const getAugStats = cachedFunction(() => {
  const stats = statsData as any
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

  return stats.pageProps.augsData.singles as AugStats[]
}, {
  maxAge: 60 * 30,
  name: 'getAugStats'
})
