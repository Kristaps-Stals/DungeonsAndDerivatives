var dice = {
  roll(sides){
    var result = Math.floor(Math.random()*sides)+1
    return {result:result, dice:sides}
  }
}
export default dice