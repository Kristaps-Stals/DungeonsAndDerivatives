<template>
  <!-- Title -->
  <div class="absolute w-full border-b-2 border-color " style="height:10%">
    <p class="absolute top-1/2 left-1/2 anchor-center text-3xl">{{ creature.name }}</p>
  </div>
  <!-- Stat col -->
  <div class="absolute border-color flex flex-col" :class="{right0:mirrored, borderright:!mirrored, borderleft:mirrored}" style="top:10%; height:90%; width:20%">
    <div v-for="stat in creature.stats" :key="stat" class="flex-1 relative border-color border-t-2 first:border-t-0 select-none">
      <StatDisplay :displayData="{title: stat['name'], value: stat['value']}"/>
    </div>
  </div>
  <!-- Bottom stats -->
  <div class="absolute border-t-2 border-color" :class="{right0:!mirrored}" style="width:80%; height:22.5%; bottom:0%;">
    <div class="absolute flex w-full h-full flex-col">
      <BarDisplay class="relative flex-1 m-2 border-2 border-color rounded-lg overflow-hidden" :displayData="healthBarData"/>
      <BarDisplay v-if="creature.maxMana > 0" class="relative flex-1 m-2 border-2 border-color rounded-lg overflow-hidden" :displayData="manaBarData"/>
    </div>
  </div>
  <!-- Action bar -->
  <div class="absolute" :class="{right0:!mirrored}" style="width:80%; height: 5px; top:10%">
    <div class="bg-yellow-500 absolute h-full" :style="{'width': actionBarData.fillAmount + '%'}"></div>
  </div>
  <!-- Armor class -->
  <div class="absolute border-t-2 border-color" :class="{right0:!mirrored, borderleft:!mirrored, borderright:mirrored}" style="bottom:22.5%; height:22.5%; width:20%">
    <StatDisplay :displayData="{title: 'ac', value: creature.armorClass}"/>
  </div>
  <!-- Latest Attack Info -->
  <div class="absolute flex flex-col" :class="{right0:!mirrored}" style="width:80%; height:45%; top:10%">
    <!-- Attack Score -->
    <div class="flex-1 relative">
      <p class="text-xl">Attack</p>
      <p class="absolute top-1/2 left-1/2 anchor-center text-2xl w-full text-center">{{ latestActionData.attack }}</p>
    </div>
    <!-- Damage Score -->
    <div class="flex-1 relative">
      <p class="text-xl">Damage</p>
      <p class="absolute top-1/2 left-1/2 anchor-center text-2xl w-full text-center">{{ latestActionData.damage }}</p>
    </div>
  </div>
</template>

<script>

import StatDisplay from './StatDisplay.vue'
import BarDisplay from './BarDisplay.vue'

export default {

  components: {
    StatDisplay,
    BarDisplay, // displayData(for BarDisplay) = primColor; fillAmount; text;
  },

  props: ["creature", "mirrored"],
  emits: ["event"],

  methods: {
    emitEvent(message){
      this.$emit('event', message)
    }

    
  },

  computed: {
    healthBarData(){
      var fillPercent = (this.creature.health / this.creature.maxHealth) * 100
      var message = ''
      message = message.concat(String(this.creature.health), "/", String(this.creature.maxHealth))
      return {primColor:'#00FF00', text:message, fillAmount:fillPercent}
    },

    manaBarData(){
      return {primColor:'#0000FF', text:'hello', fillAmount:100}
    },

    actionBarData(){
      var fill = (this.creature.actions*100)/this.creature.maxActions
      fill = Math.max(0, Math.min(100, fill))
      return {fillAmount:fill}
    },

    latestActionData(){
      var attack, damage
      if (this.creature.latestAttack != null){
        attack = this.creature.latestAttack.attackMessage
        damage = this.creature.latestAttack.damageMessage
      } else {
        attack = ''
        damage = ''
      }

      return {attack:attack ,damage:damage}
    }
  }
}
</script>

<style>

</style>