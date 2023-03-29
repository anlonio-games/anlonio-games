import jsonAugment from '~~/assets/json_agument.json'
import jsonAugmentData from '~~/assets/json_augment_data.json'

export const convertAugmentsJson = () => {
  const augments = []

  const onlyDescriptions = []
  const onlyNames = []
  for (const [key, value] of Object.entries(jsonAugment)) {
    if (!key.includes('_desc')) {
      onlyNames.push({
        key,
        value
      })
    } else {
      onlyDescriptions.push({
        key,
        value
      })
    }
  }

  for (const [key, value] of Object.entries(jsonAugmentData)) {
    const desc = onlyDescriptions.find(desc => desc.key === `${key}_desc`)
    const nameLang = onlyNames.find(name => name.key === key)
    const hero = Object.entries(value).find(([key, _]) => key === 'hero')?.[1] as string[]
    let aliases = nameLang?.value
    if (hero) {
      aliases += ', ' + hero.join(', ')
    }
    augments.push({
      name: value.name,
      rank: value.rank,
      effects: JSON.stringify(value.effects),
      desciption: desc?.value ?? '',
      aliases,
      nameSlug: key
    })
  }

  return augments
}
