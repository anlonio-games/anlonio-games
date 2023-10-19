import { currentPatch } from '../../../../helper'

export default eventHandler(async (event) => {
  const { search }: { search?: string } = getQuery(event)

  console.info('search', search)

  if (!search || search === 'help') {
    return `Patch atual: ${currentPatch} | Digite !aprimoramento [nome do aprimoramento] para obter informações sobre o aprimoramento. Exemplo: !aprimoramento Itens de Pandora | Essa api é mantida pelo Anlonio Games.`
  }

  if (search.length < 3) {
    return 'Texto muito curto. Digite !aprimoramento [nome do aprimoramento] para obter informações sobre o aprimoramento.'
  }

  const prisma = event.context.prisma

  const augment = await getAugData(prisma, search)

  if (!augment) {
    return await getAugFindDetails(prisma, search)
  }

  // build name
  const { name, rank, description } = await getAugText(augment) || {}

  return `${name} (${rank}) -> ${description}` // !stats ${name}
})
