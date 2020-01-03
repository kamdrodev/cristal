<template>
  <vs-row>
  <Menu></Menu>
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
  }
};
</script>

<style lang="scss">

:root {
  --background-color: #0f0e17;
  --color: #fffffe;
  --headline: #fffffe;
  --button-background-color: #ff8906;
  --validation-error-color: #EF4565;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: var(--background-color);
}

button {
  background-color: red;
}



</style>


