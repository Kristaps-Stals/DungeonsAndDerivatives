const stats = {
  nouns: {
    knife: {
      description:["", "% chance to inflict ", " bleed for ", " seconds"],
      minRarity: 1,
      weight: 1000,
      minRoll:[[40,1,4],[40,1,4],[50,2,5],[60,3,6]],
      maxRoll:[[60,2,6],[60,2,6],[70,3,7],[80,5,8]],
      damageDice: "1d8", 
      attackDice: "1d20",
    },
    sword: {
      description:["+", " base damage"],
      minRarity: 1,
      weight: 1,
    },
    mace: {description:["", "% chance to stun the enemy for ", " seconds"]},
    bow: {description:["+", " base accuracy"]},
  },
  verbs: {
    blocking: {description:["Gain ability 'block'"]},
    rapid_attack: {description:["Gain ability 'rapid attack'"]},
  },
  adjectives: {
    sharp: {description:["+", " base damage"]},
    accurate: {description:["+", " base accuracy"]},
    quick: {description:["+", "% attack speed"]},
  },
}

export default stats

// knife: "type=melee; (40-60)% chance to inflict bleed(1-2) for (4-6) seconds; damageDice = 1d8",