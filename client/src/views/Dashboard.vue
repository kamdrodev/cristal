<template>
  <vs-row>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <Lists></Lists>
    </vs-col>
  </vs-row>
</template>

<script>

import Lists from "../components/Lists.vue";

export default {
  name: "dashboard",
  components: {
    Lists
  }
};
</script>
