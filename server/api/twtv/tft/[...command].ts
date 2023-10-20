/* eslint-disable import/no-webpack-loader-syntax */
import handlerPrint from './!gincanaPrint.get'
import handlerMeme from './!gincanaMeme.get'

export default eventHandler((event) => {
  const command = event.context.params?.command

  if (event.context.params?.command === '!gincanaprint') {
    return handlerPrint(event)
  } else if (event.context.params?.command === '!gincanameme') {
    return handlerMeme(event)
  }

  return `Comando ${command} Não encontrado`
})
