<template>
  <div class="relative h-full text-white ">
    <div class="grid">
      <button v-for="item in buttons" :key="item" class="side-btn" @click="emitTabSwitch(item.tab)"> {{ item.label }} </button>
    </div>
  </div>
</template>

<script>

import globalVars from '../globalVars.js'

export default {

  
  emits:['switchTab'],

  methods: {
    emitTabSwitch(tab){
      this.$emit('switchTab', tab)
    }
  },

  computed: {
    buttons(){
      return globalVars.sideTabButtons
    }
  }
}
</script>

<style>

</style>