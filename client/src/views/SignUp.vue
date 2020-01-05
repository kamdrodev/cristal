<template>
  <vs-row class="form-sign-up">
    <vs-col class="full-center" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
    <ValidationObserver v-slot="{invalid}">
      <form @submit.prevent="signUp">
      <h1>Sign In</h1>
      <validation-provider rules="required|email" v-slot="{ errors }">
        <vs-input type="email" label="Username" placeholder="Username" v-model="username"/>
        <span class="error">{{ errors[0] }}</span>
      </validation-provider>
      <validation-provider rules="required|email" v-slot="{ errors }">
        <vs-input type="email" label="Email" placeholder="Email" v-model="email"/>
        <span class="error">{{ errors[0] }}</span>
      </validation-provider>
      <validation-provider rules="required" v-slot="{ errors }">
        <vs-input type="password" label="Password" placeholder="Password" v-model="password"/>
        <span class="error">{{ errors[0] }}</span>
      </validation-provider>
      <vs-button button="submit" :disabled="invalid">Sign Up</vs-button>
      </form>
    </ValidationObserver>
    </vs-col>
  </vs-row>
</template>

<script>

import { ValidationProvider, ValidationObserver,  extend} from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('email', {
  ...email,
  message: 'This is not valid email'
});

export default {
  name: "SignUp",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: function() {
    return {
      username: "",
      email: "",
      password: "",
    }
  },
  methods: {
    signUp: async () => {
      console.log("sign up");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.form-sign-up {
    
    h1 {
      color: var(--headline);
      text-align: center;
    }
    
    .error {
      color: var(--validation-error-color) !important;
    }

    input, button {
      width: 200px;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    button {
      background-color: var(--button-background-color) !important;
    }

    .full-center {
      flex-direction: column;
      height: 100vh;
    }
  }

</style>
