import { currentPatch, currentPatchLink } from '../../helper'

export default eventHandler(() => {
  return `/announce As notas da atualização ${currentPatch} já estão no site -> ${currentPatchLink}`
})
