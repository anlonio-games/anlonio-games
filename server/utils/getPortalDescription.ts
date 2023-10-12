interface Portal {
  name: string;
  description: string;
  short: string;
  region_subtitle: string;
  region: string;
  apiName: string;
  color: number[];
  effectAmounts?: {
    name: string;
    value: number;
    match: string;
  }[];
  corrected_color: string;
}

export function getPortalDescription (portal: Portal) {
  let description = portal.description.replaceAll('<br><br>', ' ')
  if (!portal.effectAmounts) { return description }

  portal.effectAmounts.forEach((effectAmount) => {
    description = description.replaceAll(`@${effectAmount.match}@`, '' + effectAmount.value ?? '')
    description = description.replaceAll(`@${effectAmount.match}*100@`, '' + ((effectAmount.value ?? 0) * 100).toFixed(2))
  })

  return description
}
