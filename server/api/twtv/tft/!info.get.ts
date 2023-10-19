export default eventHandler(async (event) => {
  const { search }: { search?: string } = getQuery(event)

  console.info('search', search)

  if (!search || search === 'help') {
    return 'Digite !info seguido do nome do jogador e conheça mais sobre ele! | Essa api é mantida pelo Anlonio Games.'
  }

  const prisma = event.context.prisma

  const player = await prisma.tftPlayers.findFirst({
    where: {
      OR: [
        {
          nick: {
            contains: search.trim(),
            mode: 'insensitive'
          }
        },
        {
          aliases: {
            contains: ',' + search.trim() + ',',
            mode: 'insensitive'
          }
        },
        {
          aliases: {
            startsWith: search.trim() + ',',
            mode: 'insensitive'
          }
        },
        {
          aliases: {
            endsWith: ',' + search.trim(),
            mode: 'insensitive'
          }
        }
      ]
    }
  })

  if (!player) {
    return 'Jogador não encontrado! Para mais informações sobre a competição acesse: https://riot.com/3ZXMRex'
  }

  const { nick, age, experience, funFacts, favChamp } = player

  let ageText = ''

  if (age) {
    ageText = `| Idade: ${age} anos`
  } else {
    ageText = '| Idade: Segredo'
  }

  return `(${nick}) ${ageText} -> CAMPEÃO FAVORITO: ${favChamp} | CURIOSIDADES: ${funFacts} | XP: ${experience}`
})
