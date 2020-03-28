<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header">
      <q-toolbar
        class="toolbar"
      >

        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
          
        />

        <q-toolbar-title>
          Cristal  
        </q-toolbar-title>
        
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"      
    >
      <q-list>
        <q-item-label header>Cristal</q-item-label>
        <q-item clickable to="/lists">
          <q-item-section avatar>
            <q-icon name="view_quilt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Lists</q-item-label>
            <q-item-label caption>All lists</q-item-label>
          </q-item-section>
        </q-item>
       
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style lang="sass">
  .header
    background-color: $dark
</style>
