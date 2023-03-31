interface AugmentEffects {
  [key: string]: number
}

type rank = 1 | 2 | 3

type hero = [string, string]

interface Augment {
  id: bigint
  effects: AugmentEffects
  name: string
  rank: number
  hero?: hero
}

interface Augments {
  [key: string]: Augment
}
