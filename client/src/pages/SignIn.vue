<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-xs-12 text-center">
        <form @submit.prevent="signIn" class="form-sign-in q-gutter-xs">
          <h4>Sign In</h4>
          <q-input filled v-model="formSignIn.email" label="Email" :error="$v.formSignIn.email.$error">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input filled v-model="formSignIn.password" label="Password" :error="$v.formSignIn.password.$error">
            <template v-slot:prepend>
              <q-icon name="security" />
            </template>
          </q-input>
          <q-btn
            type="submit"
            label="Send"
            size="lg"
            class="button-submit"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
          <div>
            <router-link :to="{ hash: '#Handling-links' }">
              <template v-slot="props">
                <q-btn to="/sign-up" flat label="Create account" class="link" />
              </template>
            </router-link>
          </div>
        </form>
      </div>
    </div> 
  </q-page>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'PageIndex',
  data: () => ({
    formSignIn: {
      email: '',
      password: ''
    },
  }),
  validations: {
    formSignIn: {
      email: {
        required,
        email,
      },
      password: {
        required,
      }
    }
  },
  methods: {
    async signIn() {
      try {

        this.$v.formSignIn.$touch()

        if (this.$v.formSignIn.$error) {
          throw new Error('Please review fields again.')
        }
        
        const signInProcess = await this.$store.dispatch('auth/signIn', {
          email: this.formSignIn.email,
          password: this.formSignIn.password,
        })

        
        this.$q.notify({message: signInProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    }
  }
}
</script>

<style lang="sass">
  .form-sign-in
    .button-submit
      width: 300px

  .link 
    width: 100%
</style>
