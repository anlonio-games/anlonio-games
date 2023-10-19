import portals from '@/assets/portals.json'

export default eventHandler(async (event) => {
  const { search, channel, proLegends }: { search?: string, channel?: string, proLegends?: string } = getQuery(event)

  if (!channel) {
    return 'Canal não encontrado.'
  }

  const channelSearch = proLegends ? 'proLegends' : channel

  const entries = Object.entries(portals)

  const index = entries.findIndex(p => getSlug(p[1].name) === search || p[1].name === search)

  if (index === -1) {
    setResponseStatus(event, 404, 'Not Found')
    return 'Algo de errado aconteceu'
  }

  const prisma = event.context.prisma

  await prisma.tftMatchData.upsert({
    where: {
      channel: channelSearch
    },
    create: {
      channel: channelSearch,
      portal: index
    },
    update: {
      portal: index
    }
  })

  const portal = entries[index][1]

  return `Portal da partida alterado para: ${portal.name}`
})
