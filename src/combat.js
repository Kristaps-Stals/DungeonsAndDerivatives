import dice from './dice.js'

var combat = {
  attemptAttack(attacker, denfender, action){ // attacker - attacking creature; defender - defending creature; action - the action being performed (eg. "unarmed_attack")
    var damageMessage, damageScore
    var attackRoll = dice.roll(20).result
    var attackScore = attackRoll + attacker.stats.dex.value
    var attackMessage = ''.concat(String(attacker.stats.dex.value), '(dex) + ', String(attackRoll), '(1d20) = ', String(attackScore))
    if (attackScore > denfender.armorClass) {
      var damageRoll = dice.roll(4).result
      damageScore = damageRoll + attacker.stats.str.value
      damageMessage = ''.concat(String(attacker.stats.str.value), '(str) + ', String(damageRoll), '(1d4) = ', String(damageScore))
    } else {
      damageMessage = '-'
      damageScore = 0
    }
    return {attackMessage:attackMessage, damageMessage:damageMessage, damage:damageScore}
  },

  generateEnemy(gameData){



    return 1
  }
}

export default combat