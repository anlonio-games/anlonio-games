export default eventHandler((event) => {
  if (event.path !== event.path.toLocaleLowerCase()) {
    sendRedirect(event, event.path.toLocaleLowerCase())
  }
})
