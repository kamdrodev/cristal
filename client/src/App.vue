<template>
  <div class="page-container">
    <md-app style="min-height: 100vh">
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">My Title</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'PersistentMini',
    data: () => ({
      menuVisible: false,
      mode: 'mini',
    }),
    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      }
    }
  }
</script>

<<<<<<< HEAD
<style lang="scss" scoped>
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
=======
<style lang="scss">

:root {
  --background-color: #0f0e17;
  --color: #fffffe;
  --headline: #fffffe;
  --link-color: #ff8906;
  --button-background-color: #ff8906;
  --validation-error-color: #EF4565;

  --menu-icon-color: #fffffe;

  --sidebar-title-color: #ff8906;
  --sidebar-background-color: #0f0e17;
  --sidebar-item-color: #fffffe;
  --sidebar-item-color-active: #ff8906;


  --panel-lists-background-color: #232946;
  --panel-lists-button-background-color: #ff8906;

  --card-list-background-color: #232946;
  --card-list-color: #fffffe;
  --card-list-icon-background-color: #0f0e17;

  --popup-title-color: #fffffe;
  --popup-background-color:#0f0e17;
  --popup-icon-background-color: #0f0e17;
  --popup-icon-color: #fffffe;
  --popup-button-background-color: #ff8906;
  --popup-label-color: #fffffe;

  --collapse-header-color: #ff8906;
  --collapse-content-color: #fffffe;
  --collapse-background-color: #0f0e17;
  --collapse-icon-color: #ff8906;


  --collapse-header-title-color: #ff8906;
  --collapse-header-icon-color: #fffffe;
  --collapse-header-languages-color: #fffffe;
 

  --breakpoint-tablet: 900px;
  --breakpoint-mobile: 600px;

  --scrolbar: red !important;
  --scrollbar-track-background-color: #0f0e17;
  --scrollbar-background-color: #ff8906;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: var(--background-color);
  // color: var(--color);
}

body::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: var(--scrollbar-track-background-color);
}

body::-webkit-scrollbar
{
  width: 10px;
  background-color: blue !important;
}

body::-webkit-scrollbar-thumb
{
  background-color: var(--scrollbar-background-color) !important;
}

button {
  background-color: red;
}

$breakpoint-tablet: 900px;
$breakpoint-mobile: 600px;

.container {
  width: 1000px;
  @media all and (max-width: $breakpoint-tablet) {
    width: 100%;
>>>>>>> parent of 13bfaf8... change css variables
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>