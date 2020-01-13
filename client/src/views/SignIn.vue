<template>
  <div>
    
  </div>
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
        });        this.$router.push("/dashboard");
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
  
</style>
