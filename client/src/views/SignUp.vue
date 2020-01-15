<template>
  <div class='md-layout md-alignment-center page'>
      <form action="" class="form-sign-in">
        <ValidationObserver v-slot="{invalid}">


        </ValidationObserver>
        <md-field>
          <label>Type here!</label>
          <md-input v-model="username"></md-input>
          <span class="md-helper-text">Helper text</span>
        </md-field>
        <md-button class="md-raised md-accent" :disabled=true>Accent</md-button>
      </form>
  </div>
</template>

<script>

import {  ValidationObserver } from "vee-validate";
// import { required, email, length, min, max } from "vee-validate/dist/rules";

// extend("required", {
//   ...required,
//   message: "This field is required"
// });
// extend("email", {
//   ...email,
//   message: "This is not valid email"
// });

// extend("minPassword", {
//   ...min,
//   message: "The field must be 6+ chars"
// });

export default {
  name: 'SignUp',
  components: {
    ValidationObserver
  },
  data: () => ({
    username: ""
  })
}
</script>


<style lang='scss'>
  .page {
    // background-color: red;
    height: 100%;

  }

  .form-sign-in {
    width: 400px;
    text-align: center;

    button {
    }
  }
</style>