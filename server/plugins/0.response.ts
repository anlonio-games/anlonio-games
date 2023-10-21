export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (event, context: { body: string }) => {
    if (event.context.plataform !== 'twitch') {
      context.body = breakYoutubeMessage(removeTwitchChatOptions(context.body))
    }
  })
})
