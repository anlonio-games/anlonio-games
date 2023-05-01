export default eventHandler(async (event) => {
  const { search } : { search?: string} = getQuery(event)

  console.info('search', search)

  if (!search || search === 'help') {
    return 'Digite !aug [nome do aprimoramento] para obter informações sobre o aprimoramento. Exemplo: !aug jinx carry | Essa api é mantida pelo Anlonio, para mais informações acesse: anlonio.games'
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
  const { name, rank } = await getAugText(augment) || {}

  const stats = await getAugStats()

  const augStats = stats?.find(aug => aug.id === augment.nameSlug)

  if (!augStats) {
    return `${name} (${rank}) ⋮-> Nenhuma estatística encontrada.`
  }

  const statsData = {
    qtd: augStats.count.toLocaleString('pt-BR'),
    avg: augStats.avgPlace.toFixed(2),
    top4: (augStats.count > 0 ? augStats.top4 / augStats.count * 100 : 0).toFixed(2),
    win: (augStats.count > 0 ? augStats.win / augStats.count * 100 : 0).toFixed(2)
  }

  const prompt = `/me ${name} (${rank}) ⋮->
  TOTAL:
  Nº Partidas: ${statsData.qtd} ; Média de posição: ${statsData.avg} ; % Top 4: ${statsData.top4} % ; % vitória: ${statsData.win} % |`

  return prompt + ` Para dados completos, user !stats+. Para ver a descrição, digite !aug ${name}`
})
