<template>
  <div>
    <div class="absolute h-full duration-75" :style="{'background-color': displayData.primColor, 'width': fillAmount + '%'}"></div>
    <h1 class="absolute top-1/2 left-1/2 anchor-center text-3xl text-outline select-none">{{displayData.text}}</h1>
  </div>
</template>

<script>
export default {
  props:['displayData'], // displayData = primColor; fillAmount; text;

  computed: {
    fillAmount(){
      return Math.max(0, this.displayData.fillAmount)
    }
  }
}
</script>

<style>

</style>