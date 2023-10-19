import portals from '@/assets/portals.json'

export default eventHandler((event) => {
  const { search }: { search?: string } = getQuery(event)
  const entries = Object.entries(portals)
  const index = entries.findIndex(p => getSlug(p[1].name) === search || p[1].name === search)

  if (index !== -1) {
    return index
  } else {
    setResponseStatus(event, 404, 'Not Found')
    return 'Algo de errado aconteceu'
  }
})
