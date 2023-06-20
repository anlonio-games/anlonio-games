import AugmentsJSON from '~~/assets/pt/augments.json'
import CommonJSON from '~~/assets/pt/common.json'

export const getAugText = cachedFunction((augment) => {
  const Augments = AugmentsJSON as any
  const Common = CommonJSON as any

  const ranks: any = {
    1: 'Silver',
    2: 'Gold',
    3: 'Prismatic'
  }

  let name = Augments[augment.nameSlug] || 'NOT_FOUND'

  const rank = Common[ranks[augment.rank]]
  name = name.toUpperCase()

  // build description
  const description = Augments[augment.nameSlug + '_desc'] || 'NOT_FOUND'

  return {
    name,
    rank,
    description
  }
}, {
  maxAge: 60 * 60 * 24 * 7,
  name: 'getAugText',
  getKey (augment) {
    return augment.nameSlug
  }
})
