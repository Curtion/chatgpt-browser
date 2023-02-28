<script setup lang="ts">
let modelValue = $ref('')
function handleSendMsg() {
  if (!modelValue)
    return
  sendMsg(modelValue)
  modelValue = ''
}
</script>

<template>
  <div h-12 mx-4 mb-2 flex justify-center items-center gap-2>
    <input
      id="input"
      v-model="modelValue"
      type="text"
      p="x-4"
      bg="transparent"
      w="full"
      h="full"
      max-w-screen-lg
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
    >
    <div text-xl hover:cursor-pointer i-carbon-send @click="handleSendMsg" />
  </div>
  <div h-8 shadow flex justify-center items-center text-xs>
    ©竹影流浪 2014-2023
  </div>
</template>
