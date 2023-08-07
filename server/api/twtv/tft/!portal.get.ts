import portals from '@/assets/portals.json'
export default eventHandler((event) => {
  const { search, id }: { search?: string, id?: number} = getQuery(event)

  if ((!search || search === 'help') && id === undefined) {
    return 'Digite !portal [nome do portal] para obter informações sobre o portal. Exemplo: !portal o sumidouro | Essa api é mantida pelo Anlonio, para mais informações acesse: anlonio.games'
  }

  let portal

  if ((!search || search === 'help')) {
    if (id !== undefined) {
      if (isNaN(id) || (id < 0 || id >= portals.length)) {
        setResponseStatus(event, 404, 'Portal Doesn\'t exists')
        return 'Portal não encontrado. Digite o nome exato ou apenas as letras Maiúsculas (O Sumidouro = OS)'
      }
      portal = portals[id]
    }
  } else {
    portal = portals.find(p => getSlug(p.name) === search || p.name.toLocaleLowerCase() === search.toLocaleLowerCase())
  }

  if (portal) {
    return `/me (${portal.region}) ${portal.name} ⋮-> ${getPortalDescription(portal)}`
  } else {
    return 'Portal não encontrado. Digite o nome exato ou apenas as letras Maiúsculas (O Sumidouro = OS)'
  }
})
