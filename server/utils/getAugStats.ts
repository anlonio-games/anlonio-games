import * as puppeteer from 'puppeteer'

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

  const fetchData = async () => {
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()
    await page.goto('https://tactics.tools/augments')

    const data = await page.evaluate(() => {
      return window.__NEXT_DATA__.props
    })

    await browser.close()

    return data
  }

  const stats = await fetchData()

  return stats.pageProps.augsData.singles as AugStats[]
}, {
  maxAge: 10 * 60 * 1000,
  name: 'getAugStats'
})
