<template>
  <vs-row class="form-sign-up">
    <vs-col class="full-center" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
    <ValidationObserver v-slot="{invalid}">
      <form @submit.prevent="signUp">
      <h1>Sign Up</h1>
      <validation-provider rules="required|minUsername:6|maxUsername:16" v-slot="{ errors }">
        <vs-input type="text" label="Username" placeholder="Username" v-model="username" name="username" />
        <div class="error">{{ errors[0] }}</div>
      </validation-provider>
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
    </vs-col>
  </vs-row>
</template>

<script>

import { ValidationProvider, ValidationObserver,  extend} from "vee-validate";
import { required, email, length, min, max} from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});
extend("email", {
  ...email,
  message: "This is not valid email"
});

extend("length", {
  ...length,
  message: "The field must be 6+ chars"
});

extend("minUsername", {
  ...min,
  message: "The field must be 6+ chars"
});

extend("maxUsername", {
  ...max,
  message: "The field must be 16- chars"
});

extend("minPassword", {
  ...min,
  message: "The field must be 6+ chars"
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
    async signUp() {
      try {
        const signUpProcess = await this.$store.dispatch("auth/signUp", {username: this.username, email: this.email, password: this.password});

        this.$vs.notify({
          title:"Sign Up",
          text: signUpProcess.message,
          color:this.$notificationsColorSuccess
        });
      } catch(e) {      
        console.log(e)
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

.form-sign-up {
    
    h1 {
      color: var(--headline);
      text-align: center;
    }
    
    .error {
      overflow-wrap: break-word;
      max-width: 200px;
      height:100%;
      margin-top: 10px;
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
