<template>
  <div class="flex items-center justify-center space-x-12 p-12">
    <button>Previous</button>

    <PopoverGroup as="nav" ar-label="Mythical University" class="flex space-x-3">
      <Popover as="div" class="relative">
        <transition
          enter-active-class="transition ease-out duration-300 transform"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition ease-in duration-300 transform"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <PopoverOverlay class="fixed inset-0 z-20 bg-gray-500 bg-opacity-75"></PopoverOverlay>
        </transition>

        <PopoverButton
          class="relative z-30 border-2 border-transparent bg-gray-300 px-3 py-2 focus:border-blue-900 focus:outline-none"
          >Normal</PopoverButton
        >
        <PopoverPanel class="absolute z-30 flex w-64 flex-col border-2 border-blue-900 bg-gray-100">
          <button
            v-for="(link, i) of links"
            :key="i"
            :hidden="i === 2"
            class="border-2 border-transparent px-3 py-2 text-left hover:bg-gray-200 focus:border-blue-900 focus:bg-gray-200 focus:outline-none"
          >
            Normal - {{ link }}
          </button>
        </PopoverPanel>
      </Popover>

      <Popover as="div" class="relative">
        <PopoverButton
          class="border-2 border-transparent bg-gray-300 px-3 py-2 focus:border-blue-900 focus:outline-none"
          >Focus</PopoverButton
        >
        <PopoverPanel
          focus
          class="absolute flex w-64 flex-col border-2 border-blue-900 bg-gray-100"
        >
          <button
            v-for="(link, i) of links"
            :key="i"
            class="border-2 border-transparent px-3 py-2 text-left hover:bg-gray-200 focus:border-blue-900 focus:bg-gray-200 focus:outline-none"
          >
            Focus - {{ link }}
          </button>
        </PopoverPanel>
      </Popover>

      <Popover as="div" class="relative">
        <PopoverButton
          ref="trigger"
          class="border-2 border-transparent bg-gray-300 px-3 py-2 focus:border-blue-900 focus:outline-none"
          >Portal</PopoverButton
        >
        <Portal>
          <PopoverPanel
            ref="container"
            class="flex w-64 flex-col border-2 border-blue-900 bg-gray-100"
            :style="{
              position: strategy,
              top: y ? `${y}px` : '',
              left: x ? `${x}px` : '',
            }"
          >
            <button
              v-for="(link, i) of links"
              :key="i"
              class="border-2 border-transparent px-3 py-2 text-left hover:bg-gray-200 focus:border-blue-900 focus:bg-gray-200 focus:outline-none"
            >
              Portal - {{ link }}
            </button>
          </PopoverPanel>
        </Portal>
      </Popover>

      <Popover as="div" class="relative">
        <PopoverButton
          ref="trigger2"
          class="border-2 border-transparent bg-gray-300 px-3 py-2 focus:border-blue-900 focus:outline-none"
          >Focus in portal</PopoverButton
        >
        <Portal>
          <PopoverPanel
            ref="container2"
            focus
            class="flex w-64 flex-col border-2 border-blue-900 bg-gray-100"
            :style="{
              position: strategy2,
              top: y2 ? `${y2}px` : '',
              left: x2 ? `${x2}px` : '',
            }"
          >
            <button
              v-for="(link, i) of links"
              :key="i"
              class="border-2 border-transparent px-3 py-2 text-left hover:bg-gray-200 focus:border-blue-900 focus:bg-gray-200 focus:outline-none"
            >
              Focus in Portal - {{ link }}
            </button>
          </PopoverPanel>
        </Portal>
      </Popover>
    </PopoverGroup>

    <button>Next</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import {
  Popover,
  PopoverOverlay,
  PopoverPanel,
  PopoverGroup,
  PopoverButton,
  Portal,
} from '@headlessui/vue'
import { useFloatingUi } from '../../playground-utils/hooks/use-floating-ui'

function html(templates) {
  return templates.join('')
}

export default {
  components: {
    Popover,
    PopoverPanel,
    PopoverOverlay,
    PopoverGroup,
    PopoverButton,
    Portal,
  },
  setup() {
    let links = ['First', 'Second', 'Third', 'Fourth']

    const {
      x,
      y,
      reference: trigger,
      floating: container,
      strategy,
    } = useFloatingUi({
      placement: 'bottom-start',
      strategy: 'fixed',
    })

    const {
      x: x2,
      y: y2,
      reference: trigger2,
      floating: container2,
      strategy: strategy2,
    } = useFloatingUi({
      placement: 'bottom-start',
      strategy: 'fixed',
    })

    return {
      links,
      x,
      y,
      strategy,
      trigger,
      container,
      x2,
      y2,
      strategy2,
      trigger2,
      container2,
    }
  },
}
</script>
