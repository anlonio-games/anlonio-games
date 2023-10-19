export default eventHandler(async (event) => {
  const { search, channel, proLegends }: { search?: string, channel?: string, proLegends?: string } = getQuery(event)

  if (!channel) {
    return 'Canal não encontrado.'
  }

  const channelSearch = proLegends ? 'proLegends' : channel

  const prisma = event.context.prisma

  let ixtal

  if (search?.length === 1) {
    ixtal = await prisma.tftIxtal.findFirst({
      where: {
        name: {
          startsWith: search?.trim(),
          mode: 'insensitive'
        }
      }
    })
  } else {
    ixtal = await prisma.tftIxtal.findFirst({
      where: {
        name: {
          equals: search?.trim(),
          mode: 'insensitive'
        }
      }
    })
  }

  if (!ixtal) {
    return 'Nenhum Ixtal Encontrado.'
  }

  await prisma.tftMatchData.upsert({
    where: {
      channel: channelSearch
    },
    create: {
      channel: channelSearch,
      tftIxtalId: ixtal.id
    },
    update: {
      ixtal: {
        connect: {
          id: ixtal.id
        }
      }
    }
  })

  return `Ixtal da partida alterado para: ${ixtal.name}`
})
