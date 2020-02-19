<template>
  <div id="q-app" class="q-pl-md q-pr-md">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {

    // Theme
    this.$q.dark.set(true)
    
    // Notifications
    this.$q.notify.setDefaults({
      position: 'top-right',
    })


  }
}
</script>

<style lang="sass">

  @import 'css/quasar.variables.scss'
  
  \:root 
    --color-palette-1: #0f0e17
  
  html, body 
    background-color: $dark !important


  body::-webkit-scrollbar-track

    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
    background-color: $dark

  body::-webkit-scrollbar
    width: 10px
    background-color: blue !important

  body::-webkit-scrollbar-thumb
    background-color: $accent

</style>
