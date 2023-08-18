export default eventHandler((event) => {
  const { toUser, sender }: { toUser?: string, sender?: string } = getQuery(event)

  const to = toUser ?? sender ?? 'Fulano'

  interface Flirt {
    question: {
      start: string
      ends: string[]
    },
    answers: {
      start: string
      ends: string[]
    }[]

  }

  function getRandomItem<T> (array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }

  function flirtMaker (flirts: Flirt[]): string {
    const flirt = getRandomItem(flirts)

    const question = flirt.question.start + getRandomItem(flirt.question.ends)
    const answer = getRandomItem(flirt.answers)

    return `${question}? ${answer.start + getRandomItem(answer.ends)}`
  }

  // seu pai é
  // 'Padeiro' 'Eletricista' 'Carteiro' 'Empresário' 'Pro player de TFT' 'Médico' 'Solteiro'
  // pq vc é um
  // 'Gato' 'Sonho' 'Bom negócio' 'Crime'
  // pq eu queria
  // 'Consertar meu chuveiro' 'um selinho' '1000 reais emprestado' 'um coach do novo patch' 'Uma receita de ritalina' 'beijar ele'
  const flirts: Flirt[] = [
    {
      question: {
        start: 'Seu pai é ',
        ends: [
          'Padeiro',
          'Eletricista',
          'Carteiro',
          'Empresário',
          'Pro player de TFT',
          'Médico',
          'Solteiro'
        ]
      },
      answers: [
        {
          start: 'pq vc é um ',
          ends: [
            'Gato',
            'Sonho',
            'Bom negócio',
            'Crime'
          ]
        },
        {
          start: 'pq eu queria ',
          ends: [
            'Consertar meu chuveiro',
            'um selinho',
            '1000 reais emprestado',
            'um coach do novo patch',
            'Uma receita de ritalina',
            'beijar ele'
          ]
        }
      ]
    }
  ]

  return `Oi ${to}, ${flirtMaker(flirts)}`
})
