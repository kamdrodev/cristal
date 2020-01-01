<template>
  <vs-row class="form-sign-up">
    <vs-col class="full-center" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <vs-input type="Username" label="Username" placeholder="Username" v-model="username"/>
      <vs-input type="email" label="Email" placeholder="Email" v-model="email"/>
      <vs-input type="password" label="Password" placeholder="Password" v-model="password"/>
      <vs-button color="success" type="filled" @click="signUp">Sign Up</vs-button>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: "SignUp",
  data: function() {
    return {
      username: "",
      email: "",
      password: "",
    }
  },
  methods: {
    signUp: async () => {
     
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.form-sign-up {
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
