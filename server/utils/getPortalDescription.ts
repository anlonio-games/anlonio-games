import portals from '@/assets/portals.json'

type Portal = typeof portals[0]

export function getPortalDescription (portal: Portal) {
  const description = portal.description
  if (!portal.effectAmounts) { return description }

  portal.effectAmounts.forEach((effectAmount) => {
    description.replaceAll(`@${effectAmount.match}@`, '' + effectAmount.value ?? '')
    description.replaceAll(`@${effectAmount.match}*100@`, '' + ((effectAmount.value ?? 0) * 100).toFixed(2))
  })

  return description
}
