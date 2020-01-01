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

body {
  font-family: "Roboto", sans-serif;
    --color-red: #C80019;
    --color-green: #00AD85;
    --color-blue: #006CE4;
    --color-navy-blue: #494ACB;
    --color-white: #FFFFFF;
    --color-black: #000000;
    --color-orange: #FF8465;
    --color-purple: #A100BE;
    --color-yellow: #F9F871;
    --color-pink: #FF4E8A;

    --dark-background: #0f0e17;
    --dark-headline: #fffffe;
    --dark-paragraph: #a7a9be;

    --dark-card-background: #fffffe;
    --dark-card-headllne: #0f0e17;
    --dark-card-paragraph: #2e2f3e;
    --dark-card-tag-background: #ff8906;
    --dark-card-tag-text: #fffffe;
    --dark-card-highlight: #e53170;

    --light-background: #fffffe;
    --light-headline: #0f0e17;
    --light-paragraph: #a7a9be;

    --light-card-background: #0f0e17;
    --light-card-headline: #fffffe;
    --light-card-paragraph: #a7a9be;
    --light-card-tag-background: #ff8906;
    --lightcard-tag-text: #fffffe;
    --light-card-highlight: #e53170;

     --link: #e53170;
     --button: #ff8906;
     --button-text: #fffffe;



   

    



}



</style>


