export default eventHandler((event) => {
  const { search } : { search?: string} = getQuery(event)

  const help = `Saiba quanto de EXP você vai receber usando o Aprimoramento NOVO NÍVEl ->
  Digite o custo em ouro para subir para o próximo nível. Exemplo: !levelup 8`

  if (!search || search === 'help') {
    return help
  }

  const gold = parseInt(search)

  if (isNaN(gold)) {
    return help
  }

  // se valor não for exato
  if (gold % 4 !== 0) {
    return 'O custo em ouro deve ser múltiplo de 4.'
  }

  // Eu dedico esse comentário ao Mourice. Como todo o meu ódio matinal
  return `/me ${gold} de ouro = ${gold / 4 * 7} de EXP com Novo Nível`
})
