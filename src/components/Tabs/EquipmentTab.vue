<template>
  <div class="">
    <div class="absolute flex flex-wrap content-start overflow-y-auto border-4 p-8 justify-center rounded-xl border-color" style="width:70%; height:40%; left:15%; bottom:5%; column-gap:1.1111%; row-gap:4%">
      <div v-for="item in gameData.equipment" :key="item"  class="relative rounded-lg border-2 border-color" style="width:8%; height:0; padding-bottom: 8%;">
        <item-display :itemData="item" @event="handleEvent"/>
      </div>
    </div>
  </div>
  
  <!-- <div class="absolute border-4 border-color rounded-3xl" style="width:90%; height:45%; left:5%; bottom:5%; transform: scale(1);">
    <div class="relative overflow-y-auto flex flex-wrap h-full p-5" style="column-gap:1.1111%; row-gap: 4%;">
      <div v-for="item in gameData.equipment" :key="item" class="relative rounded-lg border-2 border-color" style="width:9%; height:0; padding-bottom: 9%;">
        <item-display :itemData="item"/>
      </div>
    </div>
  </div> -->

  <span v-if="activeItem!=0" class="absolute text-center border-2 rounded-xl border-color fastestfadein overflow-y-auto" style="height:45%; width:20%; left:5%; top:5%">
    <a class="text-xl">{{ activeItem.title }}</a><br>

    Accuracy: <a :style="{ 'color': attributeColor(typeAttributes.attackAttribute)}">{{ typeAttributes.attackAttribute.toUpperCase() }}</a>
      + {{ attackDice }}<br>

    Damage: <a :style="{ 'color': attributeColor(typeAttributes.damageAttribute)}">{{ typeAttributes.damageAttribute.toUpperCase()  }}</a>
      + {{ damageDice }}<br>

    Rarity: <a :style="{ 'color': rarityColor}">{{rarityName}}</a><br><br>

    <div v-for="noun in activeItem.mods.nouns" :key="noun">
      {{ modText(noun) }} <br>
    </div>
    <br>
    <div v-for="verb in activeItem.mods.verbs" :key="verb" class="text-blue-500">
      {{ modText(verb) }} <br>
    </div>
    <br>
    <div v-for="adjective in activeItem.mods.adjectives" :key="adjective" class="text-green-500">
      {{ modText(adjective) }} <br>
    </div>
  </span>

  <button class="absolute w-1/4 h-1/4 right-1/4 top-1/4 bg-blue-500" @click="test">test generate</button>
  
</template>

<script>

import ItemDisplay from '../MiscComps/ItemDisplay.vue'
import items from '../../items.js'

export default {

  components: {
    ItemDisplay,
  },

  props: ["gameData"],
  emits: ["event"],

  data(){
    return {
      activeItem:0,
    }
  },

  methods: {
    emitEvent(message){
      //console.log(message)
      this.$emit('event', message)
    },

    handleEvent(event){
      switch(event.id){
        case "hover":
          this.activeItem = event.item
          //console.log(this.activeItem)
          break
        case "active":
          break
      }
    },

    attributeColor(attribute){
      return items.getAttributeColor(attribute)
    },

    modText(mod){
      return items.getStatDescription(mod)
    },

    test(msg){

      this.gameData.equipment[0] = {...items.generateItem({rarity:1})}
    }
  },

  computed: {
    // inventoryPages(){
    //   var page = []
    //   var pageCount = Math.floor(this.gameData.equipment.length/30)+1
      
    //   return pageCount
    // }
    rarityColor(){
      return items.getRarityColor(this.activeItem.rarity)
    },

    rarityName(){
      return items.getRarityName(this.activeItem.rarity)
    },

    typeAttributes(){
      return items.getTypeAttributes(this.activeItem.subtype)
    },

    attackDice(){
      if (this.activeItem!=0){
        var temp = this.activeItem.mods.nouns[0]
        return temp.attackDice
      }
      return "0"
    },

    damageDice(){
      if (this.activeItem!=0){
        var temp = this.activeItem.mods.nouns[0]
        return temp.damageDice
      }
      return "0"
    },
  }

}
</script>

<style>

</style>