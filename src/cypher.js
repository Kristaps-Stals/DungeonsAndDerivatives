import { Buffer } from 'buffer'

var cypher = {
  // Takes in a string and returns an encrypted string
  encrypt(inString){
    var outString = this.ceaserShift(inString, 57)
    outString = Buffer.from(outString).toString('base64')
    //outString = Buffer.from(outString).toString('base64')
    outString = this.base64CeaserShift(outString, 12)
    return outString
  },

  // Takes in an encrypted string and returns a decrypted string
  decrypt(inString){
    var outString = this.base64CeaserShift(inString, -12)
    outString = Buffer.from(outString, 'base64').toString('ascii')
    //outString = Buffer.from(outString, 'base64').toString('ascii')
    outString = this.ceaserShift(outString, -57)
    
    return outString
  },

  // Returns a shifted string
  ceaserShift(inString, shiftAmount){
    var newString = ''
    for (const char in inString) {
      let newChar = inString.charCodeAt(char)+(shiftAmount%128)
      if(newChar > 127) {
        newChar = newChar % 128
      } else if (newChar < 0) {
        newChar = newChar + 128
      }
      newString = newString.concat(String.fromCharCode(newChar))
    }
    return newString
  },

  base64CeaserShift(inString, shiftAmount){
    const base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+=' // if problem look at this table (probably something is wrong)
    var newString = ''
    for (const char in inString) {
      let newChar = base64.indexOf(inString[char]) + (shiftAmount%64)
      if(newChar > 63) {
        newChar = newChar % 64
      } else if (newChar < 0) {
        newChar = newChar + 64
      }
      newString = newString.concat(base64[newChar])
    }
    return newString
  },
}

export default cypher