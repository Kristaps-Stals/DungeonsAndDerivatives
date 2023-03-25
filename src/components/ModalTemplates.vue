<template>
  <!-- background dim -->
  <div class="absolute w-full h-full opacity-50 z-10 bg-black fadeinhalf" @click="emitMessage({message:'exit'})"/>
  <!-- modal -->
  <div class="absolute w-1/3 h-1/3 z-20 anchor-center top-1/2 left-1/2 background-color rounded-2xl border-2 border-color">
    <button class="absolute anchor-center left-full btn-exit" @click="emitMessage({message:'exit'})">X</button>

    <!-- Import game -->
    <div v-if="modalType=='importgame'">
      <div class="absolute w-1/2 h-1/4 left-1/2 text-3xl flex" style="transform:translateX(-50%)"><h1 class="m-auto">SAVE IMPORT</h1></div>
      <div class="absolute w-2/3 h-1/4 left-1/2 top-1/4 flex" style="transform:translateX(-50%)"><h1 class="m-auto"><a class="text-red-600">WARNING</a>: existing save file will be deleted!</h1></div>
      <div class="absolute w-2/3 h-1/4 left-1/2 top-1/2 text-black flex" style="transform:translateX(-50%)"><input v-model="importString" type="text" class="w-full m-auto"></div>
      <div class="absolute w-2/3 h-1/4 left-1/2 top-3/4 flex" style="transform:translateX(-50%)"><button class="m-auto w-1/2 text-2xl btn-main" @click="emitMessage({message:'load', secondaryMessage:importString})">IMPORT</button></div>
    </div>

      <!-- Delete game -->
    <div v-if="modalType=='deletegame'">
      <div class="absolute w-1/2 h-1/4 left-1/2 text-3xl flex" style="transform:translateX(-50%)"><h1 class="m-auto">DELETE SAVE?</h1></div>
      <div class="absolute w-2/3 h-1/4 left-1/2 top-1/4 flex" style="transform:translateX(-50%)"><p class="m-auto">Type <a class="text-red-600">delete</a> into the text field and press delete</p></div>
      <div class="absolute w-2/3 h-1/4 left-1/2 top-1/2 text-black flex" style="transform:translateX(-50%)"><input v-model="deleteTest" type="text" class="w-full m-auto"></div>
      
      <div class="absolute w-2/3 h-1/4 left-1/2 top-3/4 flex" style="transform:translateX(-50%)">
        <button class="m-auto w-1/2 text-2xl btn-main group relative" @click="emitMessage({message:'delete'})">
          DELETE<span class="tooltip">This cannot be undone!</span>
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  
  props: ['modalType'],
  emits: ['modalClick'],
  data(){
    return{
      importString: '',
      deleteTest: '',
    }
  },

  methods: {
    emitMessage(event){
      switch(event.message){
        case 'delete':
          if(this.deleteTest == "delete"){
            this.$emit('modalClick', event)
          }
          break
        default:
          this.$emit('modalClick', event)
          break
      }
    }
  },
}
</script>

<style>

</style>