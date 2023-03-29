export default eventHandler(async (event) => {
  const augments = await event.context.prisma.tft_augments.findMany()
  return augments
})
