<template>
  <div v-if="itemData != 0" class="group" @mouseenter="emitEvent({id:'hover', item:itemData})">
    <div class="absolute w-full h-full" draggable="true">
      <div class="absolute top-1/2 left-1/2 anchor-center text-2xl" :style="{ 'color': rarityColor}">
        {{ itemData.title }}
      </div>
    </div>
    
    <!-- <span class="tooltip text-center">
      <a class="text-xl">{{ itemData.title }}</a><br>

      Accuracy: <a :style="{ 'color': attributeColor(typeAttributes.attackAttribute)}">{{ typeAttributes.attackAttribute.toUpperCase() }}</a>
       + {{ attackDice }}<br>

      Damage: <a :style="{ 'color': attributeColor(typeAttributes.damageAttribute)}">{{ typeAttributes.damageAttribute.toUpperCase()  }}</a>
       + {{ damageDice }}<br>

      Rarity: <a :style="{ 'color': rarityColor}">{{rarityName}}</a><br><br>

      <div v-for="noun in itemData.mods.nouns" :key="noun">
        {{ modText(noun) }} <br>
      </div>
      <br>
      <div v-for="verb in itemData.mods.verbs" :key="verb" class="text-blue-500">
        {{ modText(verb) }} <br>
      </div>
      <br>
      <div v-for="adjective in itemData.mods.adjectives" :key="adjective" class="text-green-500">
        {{ modText(adjective) }} <br>
      </div>

      

    </span> -->
  </div>

</template>

<script>

import items from '../../items.js'

export default {

  props: {
    itemData: {
      default: 0
    }
  },
  emits: ["event"],

  mounted(){
    setTimeout(() => {
      
    }, 100);
    
  },

  methods: {
    emitEvent(message){
      
      //console.log(message)
      this.$emit('event', message)
    },
    
    attributeColor(attribute){
      return items.getAttributeColor(attribute)
    },

    modText(mod){
      return items.getStatDescription(mod)
    }
  },

  computed:{
    rarityColor(){
      return items.getRarityColor(this.itemData.rarity)
    },

    // rarityName(){
    //   return items.getRarityName(this.itemData.rarity)
    // },

    // typeAttributes(){
    //   return items.getTypeAttributes(this.itemData.type)
    // },

    // attackDice(){
    //   if (this.itemData!=0){
    //     var temp = this.itemData.mods.nouns[0]
    //     return temp.attackDice
    //   }
    //   return "0"
    // },

    // damageDice(){
    //   if (this.itemData!=0){
    //     var temp = this.itemData.mods.nouns[0]
    //     return temp.damageDice
    //   }
    //   return "0"
    // },

    test(){
      return test
    }
    
    
    
  }
}
</script>

<style>

</style>