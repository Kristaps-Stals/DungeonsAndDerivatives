<template>
  <h1 class="absolute anchor-center w-1/2 top-1/4 left-1/2 text-center text-3xl">You Have {{ gameData.scrap }} (+ {{ gameData.searchPoints }} searchPoints) Scrap</h1>
  <button class="absolute border-2 border-color w-1/2 top-1/2 left-1/2 anchor-center text-3xl rounded-lg flex overflow-hidden" @click="emitEvent({message:'mainButtonClick'})" style="height:8%">
    <div class="absolute w-1/2 h-full background-color-bright duration-200" :style="{ 'width': + gameData.mainButtonProgress + '%'}"></div>
    <div class="absolute top-1/2 left-1/2 anchor-center">
      <p v-if="gameData.currentActivity != 'main_button'">Search around</p>
      <p v-else class="text-dark">Searching...</p>
    </div>
  </button>
</template>

<script>
export default {

  props: ["gameData"],
  emits: ["event"],

  methods: {
    emitEvent(message){
      this.$emit('event', message)
    }
  }
}
</script>

<style>

</style>