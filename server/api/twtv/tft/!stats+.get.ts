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
    top4: (augStats.count > 0 ? augStats.top4 / augStats.count * 100 : 0).toFixed(1),
    win: (augStats.count > 0 ? augStats.win / augStats.count * 100 : 0).toFixed(1)
  }

  let prompt = `${name} (${rank}) ⋮->
  TOTAL:
  Qtd: ${statsData.qtd} Avg: ${statsData.avg} Top4: ${statsData.top4} % Win: ${statsData.win} % |`

  if (augStats.pick1) {
    const pick1 = {
      qtd: augStats.pick1.count.toLocaleString('pt-BR'),
      avg: augStats.pick1.place.toFixed(2),
      top4: (augStats.pick1.count > 0 ? augStats.pick1.top4 / augStats.pick1.count * 100 : 0).toFixed(1),
      win: (augStats.pick1.count > 0 ? augStats.pick1.win / augStats.pick1.count * 100 : 0).toFixed(1)
    }
    prompt += ` 1ª Opção:
    Qtd: ${pick1.qtd} Avg: ${pick1.avg} Top4: ${pick1.top4} % Win: ${pick1.win} % |`
  }

  if (augStats.pick2) {
    const pick2 = {
      qtd: augStats.pick2.count.toLocaleString('pt-BR'),
      avg: augStats.pick2.place.toFixed(2),
      top4: (augStats.pick2.count > 0 ? augStats.pick2.top4 / augStats.pick2.count * 100 : 0).toFixed(1),
      win: (augStats.pick2.count > 0 ? augStats.pick2.win / augStats.pick2.count * 100 : 0).toFixed(1)
    }
    prompt += ` 2ª Opção:
  Qtd: ${pick2.qtd} Avg: ${pick2.avg} Top4: ${pick2.top4} % Win: ${pick2.win} % |`
  }

  if (augStats.pick3) {
    const pick3 = {
      // count with millions separator
      qtd: augStats.pick3.count.toLocaleString('pt-BR'),
      avg: augStats.pick3.place.toFixed(2),
      top4: (augStats.pick3.count > 0 ? augStats.pick3.top4 / augStats.pick3.count * 100 : 0).toFixed(2),
      win: (augStats.pick3.count > 0 ? augStats.pick3.win / augStats.pick3.count * 100 : 0).toFixed(2)
    }
    prompt += ` 3ª Opção:
  Qtd: ${pick3.qtd} Avg: ${pick3.avg} Top4: ${pick3.top4} % Win: ${pick3.win} % |`
  }

  return prompt + ` Para ver a descrição, digite !aug ${name}`
})
