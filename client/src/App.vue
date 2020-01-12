<template>
  <vs-row>
    <Menu ></Menu>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <router-view />
    </vs-col>
  </vs-row>
</template>

<script>

import Menu from "./components/Menu.vue";

export default {
  name: "home",
  components: {
    Menu
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  }
};
</script>

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


  --panel-lists-background-color: #0f0e17;
  --panel-lists-button-background-color: #ff8906;

  --card-list-background-color: #0f0e17;
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
  }
}



</style>


