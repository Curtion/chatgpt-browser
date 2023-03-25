import type { WritableComputedRef } from 'vue'

export function scrollBottom(y: WritableComputedRef<number>) {
  const outerBox = document.querySelector('.outer-box') as HTMLElement
  if (!outerBox)
    return
  y.value = outerBox.scrollHeight - outerBox.clientHeight
}
