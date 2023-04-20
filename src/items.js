import stats from "./stats.js"

const items = {
  itemTypes:["weapon", "armor"],
  itemTypesWeights:[100, 100],
  nounCount:[1,1,1],
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

    // nouns
    var [allowedNouns, allowedNounsWeights] = this.getPossibleStats({type:"nouns", rarity:rarity})
    let chosenNoun = allowedNouns[this.pickElement(allowedNounsWeights)]
    item.mods.nouns.push(this.rollMod(chosenNoun, rarity))
    item.subtype = chosenNoun.subtype

    // verbs
    var [allowedVerbs, allowedVerbsWeights] = this.getPossibleStats({type:"verbs", rarity:rarity})
    for (var i = 0; i < this.verbCount[rarity]; i++){
      if(allowedVerbs.length == 0){break}
      let element = this.pickElement(allowedVerbsWeights)
      let chosenVerb = allowedVerbs[element]
      item.mods.verbs.push(chosenVerb)
      allowedVerbs.splice(element,1)
      allowedVerbsWeights.splice(element,1)
    }

    // adjectives
    var [allowedAdjectives, allowedAdjectivesWeights] = this.getPossibleStats({type:"adjectives", rarity:rarity})
    for (var i = 0; i < this.adjectiveCount[rarity]; i++){
      if(allowedAdjectives.length == 0){break}
      let element = this.pickElement(allowedAdjectivesWeights)
      let chosenAdjective = allowedAdjectives[element]
      console.log(chosenAdjective)
      item.mods.adjectives.push(this.rollMod(chosenAdjective, rarity))
      
      allowedAdjectives.splice(element,1)
      allowedAdjectivesWeights.splice(element,1)
    }


    //console.log(item)

    //console.log(allowedNouns)
    //console.log(allowedNounsWeights)


    // for (var stattype in stats){
    //   for(var stat in stats[stattype]){
    //     console.log(stats[stattype][stat])
    //   }
    // }

    return item
  },

  getPossibleStats(parameters){ //example - rarity:1, type:"nouns",
    var rarity = parameters.rarity
    var type = parameters.type
    var possibleStats = []
    var possibleStatsWeights = []

    for (var stat in stats[type]){
      let s = stats[type][stat]
      if (s.minRarity <= rarity){
        possibleStats.push(s)
        possibleStatsWeights.push(s.weight)
      }
    }

    return [possibleStats, possibleStatsWeights]
  },

  getRarityColor(rarity){
    switch(rarity){
      case 0:
        return "ffffff"
      case 1:
        return "#00b400"
    }
    return "ffffff"
  },

  getRarityName(rarity){
    switch(rarity){
      case 0:
        return "common"
      case 1:
        return "uncommon"
    }
    return "common"
  },

  getTypeAttributes(type){
    //console.log(type)
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
      // console.log(stat)
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

    newmod.minRoll = newmod.minRoll[rarity]
    newmod.maxRoll = newmod.maxRoll[rarity]
    newmod.roll = []

    for (var i = 0; i < newmod.maxRoll.length; i++){
      var difference = newmod.maxRoll[i] - newmod.minRoll[i]
      var random = Math.floor(Math.random()*(difference+1))
      newmod.roll[i] = newmod.minRoll[i] + random
    }
    return newmod
  }

}

export default items