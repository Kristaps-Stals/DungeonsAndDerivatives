<template>
  <div class="group">
    <h1 class="absolute text-center w-full" style="top:5%">{{ displayData.title.toUpperCase() }}</h1>
    <p class="absolute top-1/2 left-1/2 anchor-center text-6xl">{{ displayData.value }}</p>
    <span class="tooltip">hngcfdd </span>
  </div>
  
</template>

<script>
export default {
  props:['displayData']

  
}
</script>

<style>

</style>