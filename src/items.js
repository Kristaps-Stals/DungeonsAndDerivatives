import stats from "./stats.js"

const items = {
  itemTypes:["weapon", "armor"],
  itemTypesWeights:[100, 100],
  nounCount:[0,1,1],
  verbCount:[0,1,1],
  adjectiveCount:[0,1,2],

  // {rarity: 1}
  generateItem(parameters){

    var item = {
      title: "a",
      type: "",
      subtype: "",
      rarity: 0,
      mods: {
        nouns: [],
        verbs: [],
        adjectives: [],
      },
    }

    var rarity = parameters.rarity

    item.rarity = rarity

    // Item type
    item.type = this.itemTypes[this.pickElement(this.itemTypesWeights)]

    // Nouns
    var allowedNouns = []
    var allowedNounsWeights = []
    // Get all allowed nouns
    for (var stat in stats["nouns"]){
      let s = stats["nouns"][stat]
      if (s.minRarity <= rarity){
        allowedNouns.push(s)
        allowedNounsWeights.push(s.weight)
      }
    }
    let chosenNoun = allowedNouns[this.pickElement(allowedNounsWeights)]
    item.mods.nouns.push(this.rollMod(chosenNoun, rarity))
    console.log(item)

    //console.log(allowedNouns)
    //console.log(allowedNounsWeights)


    // for (var stattype in stats){
    //   for(var stat in stats[stattype]){
    //     console.log(stats[stattype][stat])
    //   }
    // }

    return item
  },

  getRarityColor(rarity){
    switch(rarity){
      case 1:
        return "ffffff"
      case 2:
        return "#00b400"
    }
    return "ffffff"
  },

  getRarityName(rarity){
    switch(rarity){
      case 1:
        return "common"
      case 2:
        return "uncommon"
    }
    return "common"
  },

  getTypeAttributes(type){
    switch(type){
      case "melee":
        return {attackAttribute: "str", damageAttribute: "str"}
      case "ranged":
        return {attackAttribute: "dex", damageAttribute: "str"}
      case "magic":
        return {attackAttribute: "wis", damageAttribute: "wis"}
    }
    return {attackAttribute: "err", damageAttribute: "err"}
  },

  getAttributeColor(attribute){
    switch(attribute){
      case "str":
        return "#f06400"
      case "dex":
        return "#00f000"
      case "con":
        return "#f00000"
      case "wis":
        return "#0000f0"
    }
  },

  getStatDescription(stat){
    var description = ""
    // var fullStat = null
    // console.log(stat)

    // // Checks for stat
    // if(stats.nouns[stat.id] != undefined){
    //   fullStat =  stats.nouns[stat.id]
    // }
    // if(stats.adjectives[stat.id] != undefined){
    //   fullStat =  stats.adjectives[stat.id]
    // }
    // if(stats.verbs[stat.id] != undefined){
    //   fullStat =  stats.verbs[stat.id]
    // }
    // if(fullStat == null){ // if not found
    //   return "stat not found :("
    // }
    
    // // Create description
    // for(let i = 0; i < fullStat.description.length; i++){
    //   description += fullStat.description[i]
    //   if (i+1 < fullStat.description.length){
    //     description += stat.roll[i]
    //   }
    // }

    // Create description
    for(let i = 0; i < stat.description.length; i++){
      description += stat.description[i]
      console.log(stat)
      if (i+1 < stat.description.length){
        description += stat.roll[i]
      }
    }
    

    return description
  },

  pickElement(weights){

    var totalWeight = 0

    for (var i = 0; i < weights.length; i++){
      totalWeight += weights[i]
    }

    var random = Math.floor(Math.random()*totalWeight)+1
    var index = -1
    while (random > 0){
      index++
      random -= weights[index]
    }

    return index
  },

  rollMod(mod, rarity){
    var newmod = {
      ...mod
    }
    newmod.minRoll = newmod.minRoll[(rarity-1)]
    newmod.roll = []
    
    newmod.maxRoll = newmod.maxRoll[(rarity-1)]
    for (var i = 0; i < newmod.maxRoll.length; i++){
      var difference = newmod.maxRoll[i] - newmod.minRoll[i]
      var random = Math.floor(Math.random()*(difference+1))
      newmod.roll[i] = newmod.minRoll[i] + random
    }
    return newmod
  }

}

export default items