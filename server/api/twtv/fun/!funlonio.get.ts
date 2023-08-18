export default eventHandler(async (event) => {
  const { channel: chanelName } = getQuery(event)

  const channel: any = await $fetch(`https://api.streamelements.com/kappa/v2/channels/${chanelName}`)

  const commands: any = await $fetch(`https://api.streamelements.com/kappa/v2/bot/commands/${channel._id}/public`)

  const aliases = commands.find((command: any) => command.command === 'funlonio').aliases || []

  if (aliases.length === 0) {
    return 'Essa live não possui comandos DIVERTIDOS do anlonio.games disponíveis'
  }

  return `Essa live possui os seguintes comandos DIVERTIDOS do anlonio.games: ${aliases.join(', ')}`
})
