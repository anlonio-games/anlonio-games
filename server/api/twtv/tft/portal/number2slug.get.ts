import portals from '@/assets/portals.json'
export default eventHandler((event) => {
  const { search } : { search?: string} = getQuery(event)

  if (search === undefined) {
    setResponseStatus(event, 400, 'Wrong params')
    return 'Algo de errado aconteceu'
  }

  const searchId = Number.parseInt(search)

  if (isNaN(searchId)) {
    setResponseStatus(event, 400, 'Wrong params')
  }

  const portal = portals[searchId]

  if (portal) {
    return `/me (${portal.region}) ${portal.name} ⋮-> ${portal.description}`
  } else {
    setResponseStatus(event, 404, 'Not Found')
  }

  return 'Algo de errado aconteceu'
})
