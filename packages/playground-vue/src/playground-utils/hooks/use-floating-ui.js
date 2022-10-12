import { ref, onMounted, watchEffect } from 'vue'
import { computePosition } from '@floating-ui/dom'

export function useFloatingUi(options) {
  let reference = ref(null)
  let floating = ref(null)
  const x = ref(null)
  const y = ref(null)
  const strategy = ref(options.strategy ?? 'absolute')
  const placement = ref('bottom')
  const middlewareData = ref({})

  const update = (referenceEl, floatingEl) => {
    computePosition(referenceEl, floatingEl, options).then((data) => {
      x.value = data.x
      y.value = data.y
      placement.value = data.placement
      strategy.value = data.strategy
      middlewareData.value = data.middlewareData
    })
  }

  onMounted(() => {
    watchEffect(() => {
      if (!floating.value) return
      if (!reference.value) return

      let floatingEl = floating.value.el || floating.value
      let referenceEl = reference.value.el || reference.value

      if (!(referenceEl instanceof HTMLElement)) return
      if (!(floatingEl instanceof HTMLElement)) return

      update(referenceEl, floatingEl)
    })
  })

  return {
    x,
    y,
    strategy,
    placement,
    middlewareData,
    update,
    reference,
    floating,
  }
}
