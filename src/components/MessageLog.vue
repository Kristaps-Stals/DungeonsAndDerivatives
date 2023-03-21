<template>
  <div v-if="!logHidden" class="absolute w-1/3 h-1/3 border-color background-color fastfadein" style="left:100%; top:100%; transform: translate(-100%,-100%); border-width: 1px;">
    <!-- Title -->
    <div class="absolute w-full text-2xl flex" style="height:12.5%">
      <p class="m-auto">LOG</p>
    </div>
    <!-- Messages -->
    <div class="absolute w-full text-xl overflow-hidden" style="top:15%; height:70%">
      <ul class="absolute w-full h-full duration-200" style="line-height: 2.75rem;" :style="{'transform':' rotate(180deg) translateY(' + scrollAmount + '%)'}">
        <li v-for="msg in logMessages.slice().reverse()" :key="msg" class="slowfadein px-5" style="transform: rotate(-180deg);">
          <p>{{ msg.timestamp }}: {{msg.message}}</p>
        </li>
      </ul>
    </div>
    <!-- Buttons -->
    <div class="absolute grid grid-flow-col" style="top:100% ;transform: translate(0, -100%) translate(-1px,1px);">
      <!-- Scroll log up button -->
      <button class="btn-utility" @click="scrollMessages(1)">
        <span>↑</span>
      </button>
      <button v-if="scrolls!=0" class="btn-utility fastfadein" @click="scrollMessages(-1)">
        <span>↓</span>
      </button>
      <button v-if="scrolls>1" class="btn-utility fastfadein" @click="scrollMessages(-999)">
        <span>↓↓</span>
      </button>
      <button v-if="scrolls>10" class="btn-utility fastfadein" @click="scrollMessages(5)">
        <span>↑↑</span>
      </button>
    </div>
  </div>
  <!-- Log toggle -->
  <button class="absolute btn-utility" style="top:100%; left:100% ;transform: translate(-100%, -100%);" @click="toggleHidden">
    <span v-if="!logHidden">&gt;</span>
    <span v-else>&lt;</span>
  </button>
</template>

<script>
export default {
  props:['logMessages'],

  data (){
    return {
      logHidden: false,
      scrolls: 0,
    }
  },

  methods: {
    test(event){
      console.log(1)
    },
    
    toggleHidden(){
      this.logHidden = !this.logHidden
      this.scrolls = 0
    },

    scrollMessages(amount){
      this.scrolls = Math.max(0, this.scrolls+amount)
    }
  },

  computed: {
    scrollAmount(){
      return -this.scrolls * 20
    }
  }
}
</script>

<style>

</style>