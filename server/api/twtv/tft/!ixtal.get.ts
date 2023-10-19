export default eventHandler(async (event) => {
  const { search, channel, proLegends }: { search?: string, channel?: string, proLegends?: string } = getQuery(event)

  console.info('search', search)

  const prisma = event.context.prisma

  let ixtal

  const channelSearch = proLegends ? 'proLegends' : channel

  if (!search || search === 'help') {
    const matchData = await prisma.tftMatchData.findFirst({
      where: {
        channel: channelSearch
      },
      include: {
        ixtal: true
      }
    })

    if (!matchData) {
      return 'Digite !ixtal seguido de um dos elementos para ver sua descrição. Os elementos são: Pedra, Vento, Gelo, Eletricidade, Fogo e Madeira. | Essa api é mantida pela Anlonio Games.'
    }

    ixtal = matchData.ixtal
  }

  if (!ixtal) {
    ixtal = await prisma.tftIxtal.findFirst({
      where: {
        name: {
          contains: search?.trim(),
          mode: 'insensitive'
        }
      }
    })

    if (!ixtal) {
      return '/me Elemento de Ixtal não encontrado. Os elementos são: Pedra, Vento, Gelo, Eletricidade, Fogo e Madeira.'
    }
  }

  return `${ixtal.name}: ${ixtal.description}.`
})
