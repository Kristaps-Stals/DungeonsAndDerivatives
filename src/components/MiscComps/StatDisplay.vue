<template>
  <div class="group">
    <h1 class="absolute text-center w-full" style="top:5%">{{ displayData.title.toUpperCase() }}</h1>
    <p class="absolute top-1/2 left-1/2 anchor-center text-6xl">{{ displayData.value }}</p>
    <span class="tooltip">{{ tooltipMessage }}</span>
  </div>
  
</template>

<script>
export default {
  props:['displayData'],

  computed:{
    tooltipMessage(){
      switch(this.displayData.title){
        case 'str':
          return 'Strength determines the amount\n of damage delt by a melee attack'
        case 'dex':
          return 'Dexterity determines the accuracy of an attack and a creatures armor class (AC)'
        case 'con':
          return 'Constitution determines the creatures maximum hitpoints and hitpoint regeneration'
        case 'wis':
          return 'Wisdom :)'
        case 'ac':
          return 'Armor class is used to determine if a creature blocks an attack. If an incoming attacks accuracy score is larger than the creatures Armor class the creature gets hit, otherwise the creature successfully blocks'
      }
      return "the developer forgot to add a message to this tooltip"
    }
  }
}
</script>

<style>

</style>