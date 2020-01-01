<template>
  <vs-row class="form-sign-in">
    <vs-col class="full-center" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <vs-input type="email" label="Email" placeholder="Email" v-model="email"/>
      <vs-input type="password" label="Password" placeholder="Password" v-model="password"/>
      <vs-button color="success" type="filled" @click="signIn()">Sign In</vs-button>
    </vs-col>
  </vs-row>
</template>

<script>

export default {
  name: "SignIn",
  created: function() {
    console.log(this.$notificationsColorSuccess);
  },
  data: function() {
    return {
      username: "",
      email: "",
      password: "",
    }
  },
  methods: {
    async signIn() {
      
      try {
        const signInProcess = this.$store.dispatch("auth/signIn", {email: this.email, password: this.password});

        this.$vs.notify({
          title:'Color',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:this.$notificationsColorSuccess
        });
      } catch(e) {
        this.$vs.notify({
          title:'Color',
          text:'Lorem ipsum dolor sit amet, consectetur',
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
    input, button {
      width: 200px;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .full-center {
      flex-direction: column;
      height: 100vh;
    }
  }
</style>
