interface ItemEffects {
  [key: string]: number
}

interface Item {
  id: bigint
  name: string
  effects: any
  from: number[]
}
