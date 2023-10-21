export function removeTwitchChatOptions (message: string) {
  return message.replace('/me', '').replace('/annouce', '')
}
