<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-xs-12 text-center">
         <q-card class="card ">

          <q-card-section>
            <div class="flex flex-start">
              {{ this.counter }} / {{this.list.flashcards.length}}
            </div>
            <form @submit.prevent="nextFlashcard" class="form-sign-in q-gutter-xs">
              <h5>{{this.currentFlashcardFirstLanguage}}</h5>
              <q-input filled v-model="flashcard" label="" :error="$v.flashcard.$error" class="input">
                <template v-slot:prepend>
                </template>
              </q-input>
            </form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators';

import { mapGetters } from 'vuex';

export default {
  name: 'Quiz',
  async created() {
    this.currentList = Object.assign({}, this.list)
    console.log(this.currentList);
    console.log(this.counter);
    this.currentFlashcardFirstLanguage = this.currentList.flashcards[this.counter].firstLanguage
    this.currentFlashcardSecondLanguage = this.currentList.flashcards[this.counter].secondLanguage
  },
  validations: {
    
    flashcard: required,
    
  },
  data: () => ({
    counter: 0,
    flashcard: "",
    currentList: {},
    currentFlashcardFirstLanguage: '',
    currentFlashcardSecondLanguage: '',
  }),
  methods: {
    async nextFlashcard() {
      if (this.flashcard === this.currentFlashcardSecondLanguage) {
        this.counter++;
        this.currentFlashcardFirstLanguage = this.currentList.flashcards[this.counter].firstLanguage
        this.currentFlashcardSecondLanguage = this.currentList.flashcards[this.counter].secondLanguage
        this.flashcard = '';

        this.$q.notify({message: "Correct answer", color: 'positive'})
      }  else {
        this.$q.notify({message: "Incorrect answer", color: 'negative'})
      }
      
    }
  },
  computed: {
    ...mapGetters('lists', ['list'])
  },
}
</script>


<style lang="sass">
  .card
    width: 500px
    height: 300px
    background-color: $dark
    .input  
      width: 100%

</style>