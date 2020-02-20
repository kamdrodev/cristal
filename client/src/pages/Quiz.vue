<template>
    <div class="row">
      <div class="col-xs-12 col-lg-6 offset-lg-3">
         <q-card class="card col-xs-12" >
          <q-card-section>
            <div class="flex flex-start">
              {{ this.temporaryFlashcardIndex }} / {{this.temporaryList.flashcards.length}}
              ---
              {{ this.temporaryList.firstLanguage }} <-> {{ this.temporaryList.secondLanguage }}
            </div>
          </q-card-section>
          <q-card-section>
            
              <div class="first-language text-center q-mb-lg">{{this.temporaryFlashcardFirstLanguage}}</div>
              <q-input filled v-model="inputFlashcard" @keyup.enter="nextFlashcard" label="Type" :error="$v.inputFlashcard.$error" class="input">
                <template v-slot:prepend>
                </template>
              </q-input>
          </q-card-section>
        </q-card>
      </div>
      <!-- <div class="col-xs-12 text-center">
        <div class="row">
          <div class="col-xs-6"><span class="languages">{{this.temporaryList.firstLanguage}}</span></div>
          <div class="col-xs-6"><span class="languages">{{this.temporaryList.secondLanguage}}</span></div>
        </div>
      </div> -->
      <div class="col-xs-12 text-center list">

        <div class="row">
          <div class="col-xs-12 col-md-6 q-mb-md">{{this.temporaryList.firstLanguage.toUpperCase()}}</div>
          <div class="col-xs-12 col-md-6 q-mb-md">{{this.temporaryList.secondLanguage.toUpperCase()}}</div>
        </div>
      </div>
      <div class="col-xs-12 text-center list" v-for="flashcard in this.temporaryList.flashcards">

        <div class="row">
          <div class="col-xs-12 col-md-6 q-mt-md q-mb-md">{{flashcard.firstLanguage}}</div>
          <div class="col-xs-12 col-md-6 q-mt-md q-mb-md">{{flashcard.secondLanguage}}</div>
        </div>
      </div>
    </div>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators';

import { mapGetters } from 'vuex';

export default {
  name: 'Quiz',
  async created() {

    this.getList()

    this.temporaryList = Object.assign({}, this.list)
    this.temporaryFlashcardFirstLanguage = this.temporaryList.flashcards[this.temporaryFlashcardIndex].firstLanguage
    this.temporaryFlashcardSecondLanguage = this.temporaryList.flashcards[this.temporaryFlashcardIndex].secondLanguage
  },
  validations: {
    inputFlashcard: required,
  },
  data: () => ({
    accuracy: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    temporaryList: {},
    temporaryFlashcardFirstLanguage: '',
    temporaryFlashcardSecondLanguage: '',
    temporaryFlashcardIndex: 0,
    inputFlashcard: '',
  }),
  methods: {
    async getList() {
      try {
        const getListProcess = await this.$store.dispatch('lists/getList', {
          listId: this.$route.params.id,
        })
        this.$q.notify({message: getListProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async nextFlashcard() { 
    // it is weird ---> refactor
      if (this.temporaryFlashcardIndex >= this.temporaryList.flashcards.length - 1) {
        this.temporaryFlashcardIndex = 0;
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;

        if (this.inputFlashcard === this.temporaryFlashcardSecondLanguage) {
          this.correctAnswers++;
          this.temporaryFlashcardFirstLanguage = this.temporaryList.flashcards[this.temporaryFlashcardIndex].firstLanguage
          this.temporaryFlashcardSecondLanguage = this.temporaryList.flashcards[this.temporaryFlashcardIndex].secondLanguage
          this.inputFlashcard = '';
          this.$q.notify({message: "Correct answer", color: 'positive'})
        }  else {
          this.incorrectAnswers++;
          // this.$q.notify({message: "Incorrect answer", color: 'negative'})
        }

        this.saveQuizResult()
      } else {
        this.temporaryFlashcardIndex++;

        if (this.inputFlashcard === this.temporaryFlashcardSecondLanguage) {
          
          this.correctAnswers++;
          this.temporaryFlashcardFirstLanguage = this.temporaryList.flashcards[this.temporaryFlashcardIndex].firstLanguage
          this.temporaryFlashcardSecondLanguage = this.temporaryList.flashcards[this.temporaryFlashcardIndex].secondLanguage
          this.inputFlashcard = '';
          this.$q.notify({message: "Correct answer", color: 'positive'})
        }  else {
          this.incorrectAnswers++;
          // this.$q.notify({message: "Incorrect answer", color: 'negative'})
        }
      }

      
    },
    async saveQuizResult() {
      try {
        const saveQuizResultProcess = await this.$store.dispatch('lists/saveQuizResult', {
          listId: this.$route.params.id,
          accuracy: this.correctAnswers / this.list.flashcards.length * 100,
        })
        this.$q.notify({message: saveQuizResultProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
  },
  computed: {
    ...mapGetters('lists', ['list'])
  },
}
</script>


<style lang="sass">
  .card
    height: 300px
    background-color: $dark
    .input  
      width: 100%

  .languages
    font-weight: bold
    font-size: 24px

  .list
    .row 
      font-size: 20px
  .first-language
    font-size: 26px
    font-weight: bold
</style>