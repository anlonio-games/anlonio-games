export default eventHandler((event) => {
  const { search } = getQuery(event)
  return search
})
