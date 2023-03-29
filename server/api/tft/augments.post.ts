export default eventHandler(async (event) => {
  const augments = convertAugmentsJson()
  try {
    await event.context.prisma.tftAugments.createMany({
      data: augments
    })
  } catch (error) {
    console.error(error)
    return false
  }
  return true
})
