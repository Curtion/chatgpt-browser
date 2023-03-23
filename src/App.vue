<template>
  <main text="gray-700 dark:hex-bbb" dark:bg-hex-050505>
    <TheHeader />
    <RouterView />
    <TheFooter />
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
