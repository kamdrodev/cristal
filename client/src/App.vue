<template>
  <vs-row>
    <div>
      <Menu ></Menu>
    </div>
 
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
}

body {
  font-family: "Roboto", sans-serif;
  background-color: var(--background-color);
}

button {
  background-color: red;
}



</style>


