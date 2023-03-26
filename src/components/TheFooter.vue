<script setup lang="ts">
import { del } from '~/api'

let modelValue = $ref('')

const isSending = computed(() => {
  return msgList.value[msgList.value.length - 1]?.loading
})

function handleSendMsg() {
  if (isSending.value)
    return
  if (!modelValue) {
    showToast('请输入内容!')
    return
  }
  sendMsg(modelValue)
  modelValue = ''
}

async function handleDelMsg() {
  if (isSending.value)
    return
  const res = await del()
  msgList.value = []
  showToast(res.data.message)
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
    <div
      text-xl
      hover:cursor-pointer
      i-carbon-trash-can
      :class="[isSending ? 'hover:cursor-no-drop' : 'hover:cursor-pointer']"
      @click="handleDelMsg"
    />
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
      placeholder="请输入内容"
      @keydown.enter="handleSendMsg"
    >
    <div
      text-xl
      :class="[isSending ? 'i-carbon-close-outline' : 'i-carbon-send', isSending ? 'hover:cursor-no-drop' : 'hover:cursor-pointer']"
      @click="handleSendMsg"
    />
  </div>
  <div h-8 mt-2 shadow flex justify-center items-center text-xs>
    ©竹影流浪 2014-2023
  </div>
</template>
