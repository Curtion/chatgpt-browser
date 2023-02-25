<script setup lang="ts">
const router = useRouter()

function go(e: MouseEvent) {
  e.preventDefault()
  router.push('/')
}
</script>

<template>
  <div
    class="left-1/2 top-1/2 translate-x--1/2 translate-y--1/2"
    fixed
    flex
    flex-col
    items-center
    justify-center
  >
    404 Not Found
    <br>
    <a href="/" class="pt-3 hover:underline" @click="go">回到首页</a>
  </div>
</template>
