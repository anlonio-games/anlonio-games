import mapEncodedStats from '~~/assets/map_encoded_stats.json'

export const getEffectName = (effect: string) => {
  if (effect.includes('{')) {
    return Object.entries(mapEncodedStats).find(([key, _]) => key === effect)?.[1] ?? 'Unknown'
  }
  return effect
}
