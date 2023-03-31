import jsonAugment from '~~/assets/pt/aguments.json'
import jsonData from '~~/assets/pt/data.json'

export const getCodedEffects = () => {
  // const augments = []

  const onlyDescriptions = []
  for (const [key, value] of Object.entries(jsonAugment)) {
    if (!key.includes('_desc')) {
      continue
    }

    onlyDescriptions.push({
      key,
      value
    })
  }

  const codedVars: { possibleValues: string[][]; varName: string }[] = []

  const jsonAugmentData = jsonData.augments

  for (const [key, value] of Object.entries(jsonAugmentData)) {
    const desc = onlyDescriptions.find(desc => desc.key === `${key}_desc`)

    const vars = desc?.value.match(/@[^@]+@/g)

    if (vars) {
      vars.forEach((v) => {
        const varName = v.replace(/@/g, '').replace('*100', '')

        let flag = false
        const effects: string[] = []
        Object.keys(value.effects).forEach((effectKey) => {
          if (effectKey.includes('{')) {
            effects.push(effectKey)
          }
          if (varName === effectKey) {
            flag = true
          }
        })

        if (!flag) {
          const codedVar = codedVars.find(codedVar => codedVar.varName === varName)
          if (codedVar) {
            codedVar.possibleValues.push(effects)
          } else {
            codedVars.push({
              possibleValues: [effects],
              varName
            })
          }
        }
      })
    }

    // augments.push({
    //   name: value.name,
    //   effects: value.effects,
    //   desciption: desc?.value ?? '',
    //   aliases: '',
    //   nameSlug: key
    // })
  }

  const result: { varName: string; possibleValues: string[] }[] = []

  codedVars.forEach((codedVar) => {
    const possibleValuesFlat = codedVar.possibleValues.flat()
    const uniquePossibleValues = [...new Set(possibleValuesFlat)]

    const possibleValues: string[] = []
    uniquePossibleValues.forEach((possibleValue) => {
      let flag = true
      codedVar.possibleValues.forEach((possibleValues) => {
        if (!possibleValues.includes(possibleValue)) {
          flag = false
        }
      })
      if (flag) {
        possibleValues.push(possibleValue)
      }
    })
    result.push({
      varName: codedVar.varName,
      possibleValues
    })
  })

  // remove already known coded vars

  const returnObj: { sure: {name:string, value:string}[], maybe: {name:string, possibleValues: string[]}[]} = {
    sure: [],
    maybe: []
  }

  const removeKnown = () => {
    for (const r of result) {
      if (r.possibleValues.length === 1) {
        returnObj.sure.push({
          name: r.varName,
          value: r.possibleValues[0]
        })
        result.splice(result.findIndex(i => i.varName === r.varName), 1)
        const value = r.possibleValues[0]
        result.forEach((r) => {
          r.possibleValues = r.possibleValues.filter(v => v !== value)
        })
        removeKnown()
        break
      }
    }
  }

  removeKnown()

  for (const r of result) {
    returnObj.maybe.push({
      name: r.varName,
      possibleValues: r.possibleValues
    })
  }

  return returnObj
}
