<template>
  <div h-12 px-5 flex justify-between items-center shadow>
    <h1 text-xl font-sans>
      ChatGPT网页转发
    </h1>
    <button icon-btn text-3xl @click="toggleDark()">
      <div dark:i-carbon-moon i-carbon-sun />
    </button>
  </div>
</template>
