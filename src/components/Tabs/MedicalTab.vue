<template>
  <div>
    <!-- Torso -->
    <div class="absolute anchor-center top-1/2 left-1/2 bg-white rounded-xl" style="height: 30%; width: 10%"></div>
    <!-- Head -->
    <div class="absolute anchor-center bg-white rounded-xl" style="height: 10%; width: 6%; left:50%; top:25%"></div>
    <!-- Right leg -->
    <div class="absolute bg-white origin-center rounded-xl" style="width:4%; height:20%; left:56%; top: 67.5%; transform: rotate(-20deg);"></div>
    <!-- Left leg -->
    <div class="absolute bg-white origin-center rounded-xl" style="width:4%; height:20%; left:40%; top: 67.5%; transform: rotate(20deg);"></div>
    <!-- Right arm -->
    <div class="absolute bg-white origin-center rounded-xl" style="width:4%; height:20%; left:60%; top: 37.5%; transform: rotate(-40deg);"></div>
    <!-- Left arm -->
    <div class="absolute bg-white origin-center rounded-xl" style="width:4%; height:20%; left:36%; top: 37.5%; transform: rotate(40deg);"></div>
  </div>
</template>

<script>
export default {

  props: ["gameData"],
  emits: ["event"],

  methods: {
    emitEvent(message){
      this.$emit('event', message)
    }
  }
}
</script>

<style>

</style>