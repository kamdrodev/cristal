<template>
  <vs-row class="form-sign-in">
    <vs-col class="full-center" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <ValidationObserver v-slot="{invalid}">
        <form @submit.prevent="signIn">
          <h1>Sign In</h1>
          <validation-provider rules="required|email" v-slot="{ errors }">
            <vs-input type="email" label="Email" placeholder="Email" v-model="email"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
          <validation-provider rules="required|minPassword:6" v-slot="{ errors }">
            <vs-input type="password" label="Password" placeholder="Password" v-model="password"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
          <vs-button button="submit" :disabled="invalid">Sign Up</vs-button>
          </form>
      </ValidationObserver>
      <router-link to="/sign-up">
        <span class="link">I don't have an account yet</span>
      </router-link>
    </vs-col>
  </vs-row>
</template>

<script>

import { ValidationProvider, ValidationObserver, extend} from "vee-validate";
import { required, email, length, min, max } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});
extend("email", {
  ...email,
  message: "This is not valid email"
});

extend("minPassword", {
  ...min,
  message: "The field must be 6+ chars"
});

export default {
  name: "SignIn",
  components: {
    ValidationProvider,
    ValidationObserver
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
          title: "Sign In",
          text: signInProcess.message,
          color:this.$notificationsColorSuccess
        });

        this.$router.push("/dashboard");
      } catch(e) {      
        this.$vs.notify({
          time: 2000,
          title:"Error",
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
      text-align: center;
    }
    .link {
      color: var(--link-color) !important;;
    }
    
    .error {
      margin-top: 2px;
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
