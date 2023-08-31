export default eventHandler(async (event) => {
  const { search } : { search?: string} = getQuery(event)

  console.info('search', search)

  if (!search || search === 'help') {
    return 'Patch atual: 13.17 | Digite !aug [nome do aprimoramento] para obter informações sobre o aprimoramento. Exemplo: !aug jinx carry | Essa api é mantida pelo Anlonio, para mais informações acesse: https://anlonio.games'
  }

  if (search.length < 3) {
    return 'Texto muito curto. Digite !aug [nome do aprimoramento] para obter informações sobre o aprimoramento.'
  }

  const prisma = event.context.prisma

  const augment = await getAugData(prisma, search)

  if (!augment) {
    return await getAugFindDetails(prisma, search)
  }

  // build name
  const { name, rank, description } = await getAugText(augment) || {}

  return `${name} (${rank}) ⋮-> ${description} Para estatísticas, espere o set 9.5` // !stats ${name}
})
