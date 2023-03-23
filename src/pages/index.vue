<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
onMounted(() => {
  const outerBox = document.querySelector('.outer-box') as Element
  const innerBox = document.querySelector('.inner-box') as Element
  innerBox.addEventListener('scroll', (event) => {
    event.stopPropagation()
    outerBox.scrollTop = innerBox.scrollTop
  })
})
</script>

<template>
  <div
    my-2
    px-1
    sm:w-screen-sm
    sm:px-0
    md:w-screen-md
    md:px-0
    lg:w-screen-lg
    lg:px-0
    class="h-[calc(100vh-9.5rem)] outer-box"
    m-auto
    of-y-auto
  >
    <ul>
      <li
        v-for="(item, index) in msgList"
        :key="index"
        b-1
        border-color="gray-200 dark:gray-700"
        my-5
        first:mt-0
        last:mb-0
        class="inner-box"
        px-5
        py-3
      >
        <div mb-2 c-blueGray>
          {{ item.send }}
        </div>
        <div mt-2>
          {{ item.receive }}
        </div>
      </li>
    </ul>
  </div>
</template>
