<template>
  <h1 class="absolute anchor-center w-1/2 top-1/4 left-1/2 text-center text-4xl">Settings</h1>
  <div class="flex flex-wrap gap-10 content-center justify-center absolute anchor-center top-1/2 left-1/2 w-3/4 h-1/2 ">
    <button class="btn-settings" @click="emitClick('savegame')">Save game</button>
    <button class="btn-settings" @click="emitClick('importgame')">Import save</button>
    <button class="btn-settings" @click="emitClick('exportgame')">Export save</button>
    <button class="btn-settings opacity-0 hidden">4</button>
    <button class="btn-settings opacity-0 hidden">5</button>
    <button class="btn-settings opacity-0 hidden">6</button>
    <button class="btn-settings opacity-0 hidden">7</button>
    <button class="btn-settings" @click="emitClick('deletegame')"><a class="text-red-600">Hard reset</a></button>
    <button class="btn-settings opacity-0 hidden">9</button>
  </div>
</template>

<script>
export default {


  methods: {
    emitClick(message){
      this.$emit('settingClicked', message)
    },
  },
  
}
</script>

<style>

</style>