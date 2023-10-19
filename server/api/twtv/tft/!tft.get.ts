export default eventHandler(async (event) => {
  const { channel: chanelName } = getQuery(event)

  let aliases = []

  if (chanelName) {
    const channel: any = await $fetch(`https://api.streamelements.com/kappa/v2/channels/${chanelName}`)

    const commands: any = await $fetch(`https://api.streamelements.com/kappa/v2/bot/commands/${channel._id}/public`)

    aliases = commands.find((command: any) => command.command === 'tft').aliases || []

    if (aliases.length === 0) {
      return 'Essa live não possui comandos do anlonio.games disponíveis'
    }
  } else {
    aliases = ['proximo', 'ixtal', 'info', 'aprimoramento', 'portal', 'passe', 'patch', 'baralho']
  }

  return `Essa live possui os seguintes comandos da Anlonio Games: ${aliases.join(', ')}`
})
