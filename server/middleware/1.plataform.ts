declare module 'h3' {
  interface H3EventContext {
    plataform: Plataform
  }
}

export default eventHandler((event) => {
  const { channel }: { channel?: string } = getQuery(event)

  event.context.plataform = channel ? 'twitch' : 'youtube'
})
