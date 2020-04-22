<template>
  <q-page class="flex flex-center">
    <img
      alt="Cristal logo"
      class="logo"
      src="~assets/logo.svg"
    >
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
};
</script>

<style lang="scss" scoped>
.logo {
  width: 50% !important;
  max-width: 500px;
  animation: roll 3s infinite;
}

@keyframes roll {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
