import jsonAugments from '~~/assets/pt/aguments.json'

export const getAugmentName = (name: string) => {
  return Object.entries(jsonAugments).find(([key, _]) => key === name)?.[1] ?? name
}
