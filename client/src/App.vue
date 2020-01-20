<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$q.dark.set(true)
  }
}
</script>

<style lang="sass">

  @import 'css/quasar.variables.scss'
  
  \:root 
    --color-palette-1: #0f0e17
  
  html, body 
    background-color: $dark !important
  
</style>
