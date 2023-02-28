<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div
    px-4
    my-2
    sm:w-screen-sm
    md:w-screen-md
    lg:w-screen-lg
    class="min-h-[calc(100vh-9.5rem)]"
    m-auto
  >
    <ul>
      <template v-for="item in msgList" :key="item.send">
        <li msg-input-box>
          <div msg-input-box-arrow />
          <div>{{ item.send }}</div>
        </li>
        <li msg-outout-box>
          <div msg-outout-box-arrow />
          <div>
            {{ item.receive }}
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
