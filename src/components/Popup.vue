<template>
  <div class="absolute unselectable top-full left-1/2" style="transform: translate(-50%,-100%);">
    <ol>
      <li v-for="entry in popupMessages" :key="entry" class="popupAnim mb-5">
        <div class="w-full h-full text-3xl flex"><p class="m-auto">{{ entry.message }}</p></div>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props:["popupMessages"],


}
</script>

<style>

</style>