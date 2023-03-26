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
      transition-opacity
      duration-500
      ease-in-out
      class="opacity-0 w-60% left-50% translate-x--50%"
    />
  </main>
</template>
