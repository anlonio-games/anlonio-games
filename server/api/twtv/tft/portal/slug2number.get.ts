import portals from '@/assets/portals.json'

export default eventHandler((event) => {
  const { search } : { search?: string} = getQuery(event)
  const index = portals.findIndex(p => getSlug(p.name) === search || p.name === search)

  if (index !== -1) {
    return index
  } else {
    setResponseStatus(event, 404, 'Not Found')
    return 'Algo de errado aconteceu'
  }
})
