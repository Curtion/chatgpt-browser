<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})

const el = ref<HTMLElement | null>(null)
const { y } = useScroll(el)

onMounted(() => {
  scrollBottom(y)
})

watch(msgList, () => {
  nextTick(() => {
    scrollBottom(y)
  })
}, { deep: true })
</script>

<template>
  <div
    ref="el"
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
          <span>{{ item.receive }}</span>
          <span v-if="item.loading" class="blink" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.blink::after {
  content: '';
  display: inline-block;
  width: 3px;
  height: 20px;
  background-color: #555454;
  margin-left: 5px;
  vertical-align: text-bottom;
  line-height: 20px;
  animation: blinker 1s infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
