export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (event, context: { body: string }) => {
    if (typeof context.body !== 'string') {
      context.body = 'Bip bop bip... Acho que não to bem não 🤖'
    }

    if (event.context.plataform !== 'twitch') {
      context.body = breakYoutubeMessage(removeTwitchChatOptions(context.body))
    }
  })
})
