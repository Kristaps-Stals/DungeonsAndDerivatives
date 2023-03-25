<template>
  <!-- Title (area name) -->
  <h1 class="absolute w-full text-center text-5xl " style="top:5%">{{ gameData.areaInfo.areaTitle }}</h1>

  <!-- Player display -->
  <div class="absolute w-1/3 h-2/3 rounded-lg border-2 border-color" style="left:11.1111%; top:16.666%">
    <CreatureCard :creature="gameData" :mirrored="false"/>
  </div>
  
  <!-- Enemy display -->
  <div class="absolute w-1/3 h-2/3 rounded-lg border-2 border-color" :class="{hurtAnim:test}" style="right:11.1111%; top:16.666%">
    <CreatureCard :creature="gameData.enemies[0]" :mirrored="true"/>
  </div>

  <!-- Player Toolbar -->
  <div class="absolute flex gap-5" style="left: 11.1111%; bottom:3.3333%; width: 77.7777%; height:10%">
    <button v-for="ability in gameData.abilities" :key="ability" @click="emitEvent({message:'ability',ability:ability.id})" class="relative enlargehover border-2 border-color rounded-md" style="width:7%; height:0; padding-bottom: 7%;">
      <p class="anchor-center absolute top-1/2 left-1/2 duration-200" :class="{darktext:(gameData.actions<1)}">{{ability.name}}</p>
    </button>
  </div>
</template>

<script>

import StatDisplay from '../MiscComps/StatDisplay.vue'
import BarDisplay from '../MiscComps/BarDisplay.vue'
import CreatureCard from '../MiscComps/CreatureCard.vue'

export default {

  components: {
    StatDisplay,
    BarDisplay,
    CreatureCard,
},

  props: ["gameData"],
  emits: ["event"],

  methods: {
    emitEvent(message){
      this.$emit('event', message)
    }
  },

  computed: {

    test(){
      var creature = this.gameData.enemies[0]
      return creature.animations.hurt
    }

  }

}
</script>

<style>

</style>