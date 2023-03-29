export default eventHandler(async (event) => {
  const augments = await event.context.prisma.tftAugments.findMany()
  return augments
})
