import diceData from '~~/assets/dice.json'
import unitsData from '~~/assets/pt/units.json'

export default eventHandler(async (event) => {
  // const poolSize = [29, 22, 18, 12, 10]

  interface Dice {
    [key: string]: {
      apiName: string
      cost: Cost
      trait_data: {
        apiName: string
        units: {
          apiName: string
          set: string
          unit: string
        }[]
      }[]
    }
  }

  const dice = diceData as Dice
  const units = unitsData as any

  const levelChances = [
    [100],
    [100],
    [75, 25],
    [55, 30, 15],
    [45, 33, 20, 2],
    [25, 40, 30, 5],
    [19, 30, 35, 15, 1],
    [16, 20, 35, 25, 4],
    [9, 15, 30, 30, 16],
    [5, 10, 20, 40, 25],
    [1, 2, 12, 50, 35]
  ]

  const { search } : { search?: string} = getQuery(event)

  if (!search || search === 'help') {
    return 'Digite "!dados [nome do campeão] no [nível]" para obter informações sobre os dados viciados do campeão. Exemplo: !dados jinx no 6 | Essa api é mantida pelo Anlonio, para mais informações acesse: anlonio.games'
  }

  const { champion, _level } = search.match(/(?<champion>.+) no (?<_level>\d+)/i)?.groups || {
    champion: '',
    _level: ''
  }

  const level = parseInt(_level)

  const levelChance = levelChances[level - 1]

  if (isNaN(level)) {
    return 'Digite "!dados [nome do campeão] no [nível]" para obter informações sobre os dados viciados do campeão. Exemplo: !dados jinx no 6'
  }

  if (level < 1 || level > 11) {
    return 'Digite "!dados [nome do campeão] no [nível]" para obter informações sobre os dados viciados do campeão. Exemplo: !dados jinx no 6'
  }

  if (!champion || !level) {
    return 'Digite "!dados [nome do campeão] no [nível]" para obter informações sobre os dados viciados do campeão. Exemplo: !dados jinx no 6'
  }

  const unit = await getUnitData(event.context.prisma, champion)

  if (!unit) {
    return 'Campeão não encontrado. Digite "!dados [nome do campeão] no [nível]" para obter informações sobre os dados viciados do campeão. Exemplo: !dados jinx no 6'
  }

  const costChance = levelChance[unit.cost - 1]

  if (!unit) {
    return 'Campeão não encontrado. Digite "!dados [nome do campeão] no [nível]" para obter informações sobre os dados viciados do campeão. Exemplo: !dados jinx no 6'
  }

  const diceDataUnit = dice[unit.nameSlug]

  const possibleUnits = diceDataUnit.trait_data.reduce((acc: Set<string>, cur) => {
    cur.units.map(unit => unit.apiName).forEach(unit => acc.add(unit))
    return acc
  }, new Set<string>())

  const championsChances: {
    name: string
    chance: string
  }[] = []
  possibleUnits.forEach((unit) => {
    const unitData = dice[unit]
    const possibleUnits = unitData.trait_data.reduce((acc: Set<string>, cur) => {
      cur.units.map(unit => unit.apiName).forEach(unit => acc.add(unit))
      return acc
    }, new Set<string>())
    let costCount = 0
    possibleUnits.forEach((unit) => {
      const unitData = dice[unit]
      if (unitData.cost === diceDataUnit.cost) {
        costCount++
      }
    })

    championsChances.push({
      name: units[unit],
      chance: (costChance / costCount).toFixed(2)
    })
  })

  interface ChampionChance {
    value: string
      champions: string[]
  }
  const championsPerChance: ChampionChance[] = championsChances.reduce((acc:any[], cur) => {
    let chance: ChampionChance = acc.find(c => c.value === cur.chance)

    if (!chance) {
      chance = {
        value: cur.chance,
        champions: []
      }
      chance.champions.push(cur.name)
      acc.push(chance)
    } else {
      chance.champions.push(cur.name)
    }
    return acc
  }, []).sort((a, b) => parseFloat(b.value) - parseFloat(a.value))

  let prompt = `/me Chance de vir ${unit.name} usando Dados Viciados no nível ${level} em: `
  championsPerChance.forEach((chance) => {
    prompt += `${chance.champions.map(champion => champion).join(', ')}: ${chance.value}% | `
  })

  return prompt
})
