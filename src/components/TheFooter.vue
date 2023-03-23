<script setup lang="ts">
let modelValue = $ref('')
function handleSendMsg() {
  if (!modelValue)
    return
  sendMsg(modelValue)
  modelValue = ''
}

function handleDelMsg() {

}
</script>

<template>
  <div
    w-full
    px-1
    sm:w-screen-sm
    sm:px-0
    md:w-screen-md
    md:px-0
    lg:w-screen-lg
    lg:px-0
    m-auto
    h-12
    flex
    justify-center
    items-center
    gap-2
  >
    <div text-xl hover:cursor-pointer i-carbon-trash-can @click="handleDelMsg" />
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
  <div h-8 mt-2 shadow flex justify-center items-center text-xs>
    ©竹影流浪 2014-2023
  </div>
</template>
