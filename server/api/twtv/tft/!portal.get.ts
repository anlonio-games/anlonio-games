import portals from '@/assets/portals.json'
export default eventHandler((event) => {
  const { search } : { search?: string} = getQuery(event)

  if (!search || search === 'help') {
    return 'Digite !portal [nome do portal] para obter informações sobre o portal. Exemplo: !portal o sumidouro | Essa api é mantida pelo Anlonio, para mais informações acesse: anlonio.games'
  }

  const portal = portals.find(p => p.slug === search || p.name.toLocaleLowerCase() === search.toLocaleLowerCase())

  if (portal) {
    return `/me (${portal.region}) ${portal.name} ⋮-> ${portal.description}`
  } else {
    return 'Portal não encontrado. Digite o nome exato ou apenas as letras Maiúsculas (O Sumidouro = OS)'
  }
})
