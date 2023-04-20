const stats = {
  nouns: {
    knife: {
      title: "knife",
      description:["", "% chance to inflict ", " bleed for ", " seconds"],
      minRarity: 1,
      weight: 1000,
      minRoll:[[40,1,4],[40,1,4],[50,2,5],[60,3,6]],
      maxRoll:[[60,2,6],[60,2,6],[70,3,7],[80,5,8]],
      damageDice: "1d8", 
      attackDice: "1d20",
      subtype: "melee",
    },
    sword: {
      title: "sword",
      description:["+", " base damage"],
      minRarity: 1,
      weight: 1000,
      minRoll:[[3],[3],[4],[5]],
      maxRoll:[[5],[5],[6],[7]],
      damageDice: "1d10", 
      attackDice: "1d20",
      subtype: "melee",
    },
    //mace: {description:["", "% chance to stun the enemy for ", " seconds"]},
    //bow: {description:["+", " base accuracy"]},
  },
  verbs: {
    blocking: {
      title: "blocking",
      description:["Gain ability 'block'"],
      minRarity: 1,
      weight: 1001,
    },
    rapid_attack: {
      title: "rapid attack",
      description:["Gain ability 'rapid attack'"],
      minRarity: 1,
      weight: 1000,
    },
  },
  adjectives: {
    sharp: {
      title: "sharp",
      description:["+", " base damage"],
      minRarity: 1,
      weight: 1000,
      minRoll:[[3],[3],[4],[5]],
      maxRoll:[[5],[5],[6],[7]],
    },
    accurate: {
      title: "accurate",
      description:["+", " base accuracy"],
      minRarity: 1,
      weight: 1000,
      minRoll:[[3],[3],[4],[5]],
      maxRoll:[[5],[5],[6],[7]],
    },
    quick: {
      title: "quick",
      description:["+", "% attack speed"],
      minRarity: 1,
      weight: 1000,
      minRoll:[[10],[10],[10],[15]],
      maxRoll:[[15],[15],[20],[25]],
    },
  },
}

export default stats

// knife: "type=melee; (40-60)% chance to inflict bleed(1-2) for (4-6) seconds; damageDice = 1d8",