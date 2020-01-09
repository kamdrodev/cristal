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


  --panel-lists-background-color: #ff8906;
  --panel-lists-button-background-color: #0f0e17;

  --card-list-background-color: #ff8906;
  --card-list-color: #fffffe;
  --card-list-icon-background-color: #0f0e17;

  --popup-title-color: #fffffe;
  --popup-background-color: #ff8906;
  --popup-icon-background-color: #0f0e17;
  --popup-icon-color: #fffffe;
  --popup-button-background-color: #0f0e17;
  --popup-label-color: #fffffe;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: var(--background-color);
  // color: var(--color);
}

button {
  background-color: red;
}



</style>


