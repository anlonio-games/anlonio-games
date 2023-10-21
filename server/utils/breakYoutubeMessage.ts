export function breakYoutubeMessage (message: string) {
  if (message.length < 200) {
    return message
  }

  let messageReturn = '(1/2) ' + message
  const parteUm = messageReturn.substring(0, 199)
  const lastSpace = parteUm.lastIndexOf(' ')
  messageReturn = messageReturn.substring(0, lastSpace) + ' (2/2)' + messageReturn.substring(lastSpace)

  return messageReturn
}
