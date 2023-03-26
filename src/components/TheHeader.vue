<template>
  <div h-12 px-5 flex justify-between items-center shadow>
    <h1 text-xl font-sans>
      ChatGPT网页转发
    </h1>
    <div flex justify-between items-center>
      <button icon-btn text-xl @click="toggleDark()">
        <div dark:i-carbon-moon i-carbon-sun />
      </button>
      <button ml-3 icon-btn text-xl @click="toggleTypeWriter()">
        <div :class="[isTypeWriter ? 'i-carbon-automatic' : 'i-carbon-stop-filled']" />
      </button>
    </div>
  </div>
</template>
