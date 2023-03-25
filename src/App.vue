<script setup>
import { login } from '~/api'
if (!userInfo.value.token) {
  login().then((res) => {
    userInfo.value.token = res.data.token
    userInfo.value.id = res.data.id
  }).catch((err) => {
    showToast(err.toString())
  })
}
</script>

<template>
  <main text="gray-700 dark:hex-bbb" dark:bg-hex-050505>
    <TheHeader />
    <RouterView />
    <TheFooter />
    <div
      id="my-toast"
      fixed
      top-10
      top-0
      bg-blue-500
      text-white
      p-4
      shadow-md
      rounded-lg
      opacity-0
      transition-opacity
      duration-500
      ease-in-out
      class="w-60% left-50% translate-x--50%"
    >
      这里是提示文本
    </div>
  </main>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

/* 滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  background-color: darkgray;
}

/* 当用户悬停在滚动条上时，滚动条的样式 */
::-webkit-scrollbar-thumb:hover {
  background-color: gray;
}
</style>

<style>
.opacity-100 {
  opacity: 1;
}
</style>
