<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-xs-12 text-center">
        <form @submit.prevent="signUp" class="form-sign-up q-gutter-xs">
          <h4>Sign Up</h4>
          <q-input filled v-model="formSignUp.username" label="Username" :error="$v.formSignUp.email.$error">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input filled v-model="formSignUp.email" label="Email" :error="$v.formSignUp.email.$error">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input filled v-model="formSignUp.password" label="Password" :error="$v.formSignUp.email.$error">
            <template v-slot:prepend>
              <q-icon name="security" />
            </template>
          </q-input>
          <q-btn
            type="submit"
            label="Save"
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
                <q-btn to="/sign-in" flat label="Already have an account?"/>
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
    formSignUp: {
      username: '',
      email: '',
      password: ''
    },
  }),
  validations: {
    formSignUp: {
      username: {
        required,
      },
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
    async signUp() {
      this.$v.formSignUp.$touch()

      if (this.$v.formSignUp.$error) {
        this.$q.notify({message: 'Please review fields again.', color: 'negative'})
        return
      }

    }
  }
}
</script>

<style lang="sass">
  .form-sign-up
    .button-submit
      width: 300px
</style>
