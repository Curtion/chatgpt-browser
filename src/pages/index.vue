<script setup lang="ts" generic="T extends any, O extends any">
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
defineOptions({
  name: 'IndexPage',
})

const el = ref<HTMLElement | null>(null)
const { y } = useScroll(el)

onMounted(() => {
  scrollBottom(y)
})

function parseMarkdown({ receive: text, loading }: msg) {
  const html = marked.parse(text)
  const div = document.createElement('div')
  div.innerHTML = html
  const blocks = div.querySelectorAll('pre code')
  blocks.forEach((block: any) => {
    hljs.highlightBlock(block)
  })
  if (!loading)
    return div.innerHTML
  getLastDeepestElement(div)?.classList.add('blink')
  return div.innerHTML
}

function getLastDeepestElement(root: Element): Element {
  const children = root.children
  if (children.length === 0)
    return root

  const status = Array.from(children).every((child: Element) => {
    if (child.tagName === 'CODE')
      return true
    return false
  })
  if (status)
    return root
  return getLastDeepestElement(children[children.length - 1])
}

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
    <div
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
      rounded-md
    >
      <div mb-2 c-blueGray flex items-center class="send">
        <div>{{ item.send }}</div>
        <div hover:cursor-pointer hover:underline-solid ml-2 i-carbon-restart @click="sendMsg(item.send)" />
      </div>
      <div mt-2>
        <span
          class="typo"
          v-html="parseMarkdown(item)"
        />
        <div v-if="item.receive === ''" class="blink" />
      </div>
    </div>
  </div>
</template>

<style>
.blink::after {
  content: '';
  width: 3px;
  height: 20px;
  background-color: #ccc;
  display: inline-block;
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
