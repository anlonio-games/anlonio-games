import portals from '@/assets/portals.json'
export default eventHandler(async (event) => {
  const { search, id, channel, proLegends }: { search?: string, channel?: string, id?: number, proLegends?: string } = getQuery(event)

  if ((!search || search === 'help') && (id === undefined || !proLegends)) {
    return 'Digite !portal [nome do portal] para obter informações sobre o portal. Exemplo: !portal A Universidade | Essa api é mantida pela Anlonio Games'
  }

  let portal

  const prisma = event.context.prisma

  const channelSearch = proLegends ? 'proLegends' : channel

  const entries = Object.entries(portals)
  if ((!search || search === 'help')) {
    const matchData = await prisma.tftMatchData.findFirst({
      where: {
        channel: channelSearch
      }
    })

    if (matchData && matchData.portal) {
      portal = entries[matchData.portal][1]
    } else if (id !== undefined) {
      if (isNaN(id) || (id < 0 || id >= entries.length)) {
        setResponseStatus(event, 404, 'Portal Doesn\'t exists')
        return 'Portal não encontrado. Digite o nome exato ou apenas as letras Maiúsculas (A Universidade = AU)'
      }
      portal = entries[id][1]
    }
  } else {
    portal = entries.find(p => getSlug(p[1].name) === search || p[1].name.toLocaleLowerCase() === search.toLocaleLowerCase())?.[1]
  }

  if (portal) {
    return `/me (${portal.region}) ${portal.name} -> ${getPortalDescription(portal)}`
  } else {
    return 'Portal não encontrado. Digite o nome exato ou apenas as letras Maiúsculas (A Universidade = AU)'
  }
})
