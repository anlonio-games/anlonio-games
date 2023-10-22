export default eventHandler((event) => {
  const commandCI = event.path.replace(/(![a-z0-9]+\?)/i, match => match.toLocaleLowerCase())
  if (event.path !== commandCI) {
    sendRedirect(event, commandCI)
  }
})
