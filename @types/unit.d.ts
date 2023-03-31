interface UnitStats {
  hp: number
  mana: number
  initialMana: number
  damage: number
  armor: number
  magicResist: number
  critMultiplier: number
  critChance: number
  attackSpeed: number
  range: number
}

interface AbilityVariable {
  name: string
  value: number[]
}

interface Ability {
  variables: AbilityVariable[]
}

type Cost = 1 | 2 | 3 | 4 | 5

interface Unit {
  name: string
  cost: Cost
  stats: UnitStats
  ability: Ability
}
