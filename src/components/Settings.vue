<template>
  <!-- Title -->
  <h1 class="absolute anchor-center w-1/2 top-1/4 left-1/2 text-center text-4xl">Settings</h1>

  <!-- Settings -->
  <div class="flex flex-wrap gap-10 content-center justify-center absolute anchor-center top-1/2 left-1/2 w-3/4 h-1/2 ">  
    <button class="btn-settings relative" @click="emitClick('savegame')">Save game</button>
    <button class="btn-settings" @click="emitClick('importgame')">Import save</button>
    <button class="btn-settings" @click="emitClick('exportgame')">Export save</button>
    <button class="btn-settings hidden">4</button>
    <button class="btn-settings hidden">5</button>
    <button class="btn-settings hidden">6</button>
    <button class="btn-settings hidden">7</button>
    <button class="btn-settings" @click="emitClick('deletegame')"><a class="text-red-600">Hard reset</a></button>
    <button class="btn-settings hidden">9</button>
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