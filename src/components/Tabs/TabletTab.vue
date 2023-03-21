<template>
  tablet
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