<script setup lang="ts">
import { WebviewWindow } from '@tauri-apps/api/window'

watchEffect(() => {
  if (window.__TAURI_METADATA__) {
    const mainWindow = WebviewWindow.getByLabel('main')
    mainWindow?.setAlwaysOnTop(isTop.value)
  }
})
</script>

<template>
  <div h-12 px-5 flex justify-between items-center shadow>
    <h1 text-xl font-sans>
      ChatGPT
    </h1>
    <div flex justify-between items-center>
      <button icon-btn text-xl @click="toggleDark()">
        <div dark:i-carbon-moon i-carbon-sun />
      </button>
      <button ml-3 icon-btn text-xl @click="forceClearMsg()">
        <div i-carbon-rule-cancelled />
      </button>
      <button ml-3 icon-btn text-xl @click="toggleTypeWriter()">
        <div :class="[isTypeWriter ? 'i-carbon-automatic' : 'i-carbon-stop-filled']" />
      </button>
      <button ml-3 icon-btn text-xl @click="toggleTop()">
        <div :class="[isTop ? 'i-carbon-pin-filled' : 'i-carbon-pin']" />
      </button>
    </div>
  </div>
</template>
