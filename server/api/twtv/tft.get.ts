import Mustache from 'mustache'

export default eventHandler(async (event) => {
  const { type, search } : { type?: string, search?: string} = getQuery(event)

  if (type === 'aug') {
    const augment = await event.context.prisma.tftAugments.findFirst({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { aliases: { contains: search, mode: 'insensitive' } },
          { nameSlug: { contains: search, mode: 'insensitive' } },
          { desciption: { contains: search, mode: 'insensitive' } }
        ]
      }
    })

    if (augment) {
      augment.name = getAugmentName(augment.nameSlug)
      const effects = JSON.parse(augment.effects?.toString() as string)
      for (const [key, value] of Object.entries(effects)) {
        if (augment.desciption.includes(key + '*100')) {
          effects[key] = ((value as number) * 100).toFixed(2)
        }
      }
      const description = Mustache.render(augment.desciption.replace('*100', ''), effects, {}, ['@', '@'])
      const response = `${augment.name} -> ${description}`

      return `${response}`
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: 'augment not found'
      })
    }
  }

  throw createError({
    statusCode: 404,
    statusMessage: 'type not found'
  })
  return null
})
