<template>
  <vs-row class="form-sign-in">
    <vs-col class="full-center" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <h1>Sign In</h1>
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
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
      errors: [],
      email: "",
      password: "",
    }
  },
  methods: {
    async signIn() {
      try {
        const signInProcess = await this.$store.dispatch("auth/signIn", {email: this.email, password: this.password});

        this.$vs.notify({
          title:'Color',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:this.$notificationsColorSuccess
        });
      } catch(e) {        

          console.log(e.message, 'xd');

          this.errors = [];
          e.errors.forEach((item, index) => {

          this.errors.push(item.msg);

          
        });

        this.$vs.notify({
          time: 120002,
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
