<template>
  <vs-row class="form-sign-in">
    <vs-col class="full-center" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <h1>Sign In</h1>
      <validation-provider rules="required" v-slot="{ errors }">
        <vs-input type="email" label="Email" placeholder="Email" v-model="email"/>
        <span class="error">{{ errors[0] }}</span>
      </validation-provider>
        <vs-input type="password" label="Password" placeholder="Password" v-model="password"/>
        <vs-button @click="signIn" >Sign In</vs-button>
    </vs-col>
  </vs-row>
</template>

<script>

import { ValidationProvider, extend} from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: "SignIn",
  components: {
    ValidationProvider,
  },
  created: function() {
    console.log(this.$notificationsColorSuccess);
  },
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    async signIn() {
      try {


        console.log("qweq")
        const signInProcess = await this.$store.dispatch("auth/signIn", {email: this.email, password: this.password});

        this.$vs.notify({
          title:'Color',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:this.$notificationsColorSuccess
        });
      } catch(e) {      
        this.$vs.notify({
          time: 2000,
          title:'Error',
          text: e.message,
          color:this.$notificationsColorError
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .form-sign-in {
    
    h1 {
      color: var(--headline);
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
