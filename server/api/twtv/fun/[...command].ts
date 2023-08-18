export default eventHandler((event) => {
  return `Comando ${event.context.params?.command} Não encontrado`
})
