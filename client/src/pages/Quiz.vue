<template>
    <div class="row">
      <div class="col-xs-12 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3">
         <q-card class="card col-xs-12" >
          <q-card-section>
            <div class="flex flex-start">
              {{ this.temporary.flashcard.index }} / {{this.numberOfCards}}
              ---
              {{ this.temporary.list.firstLanguage }} <-> {{ this.temporary.list.secondLanguage }}
            </div>
          </q-card-section>
          <q-card-section>
            
              <div class="first-language text-center q-mb-lg">{{this.temporary.flashcard.firstLanguage}}</div>
              <q-input filled v-model="answer" @keyup.enter="nextFlashcard" label="Type" :error="$v.answer.$error" class="input">
                <template v-slot:prepend>
                </template>
              </q-input>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 offset-lg-2 text-center list" v-for="flashcard in this.temporary.list.flashcards">

        <div class="row">
          <div class="col-xs-12 col-md-6 q-mt-md q-mb-md text-weight-bold word first-language">{{flashcard.firstLanguage}}</div>
          <div class="col-xs-12 col-md-6 q-mt-md q-mb-md text-weight-bold word second-language">{{flashcard.secondLanguage}}</div>
        </div>
      </div>
        
    <!-- Dialog - Close / Start  Quiz-->
    <q-dialog v-model="promptQuiz" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Do you really want to solve this quiz once again?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close quiz" color="primary" @click="closeQuiz" />
          <q-btn flat label="Start quiz" color="primary" @click="startQuiz"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog - Back to list -->
    <q-dialog v-model="promptBackToList" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Do you really want to back to list?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary"  v-close-popup />
          <q-btn flat label="Yes" color="primary" @click="closeQuiz"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="list" @click="openPromptBackToList" />
    </q-page-sticky>
    </div>

    
</template>

<script>

import { required, email } from 'vuelidate/lib/validators';

import { mapGetters } from 'vuex';

export default {
  name: 'Quiz',
  async created() {
    await this.getList()
    this.temporary.list = Object.assign({}, this.list)
    this.temporary.flashcard.id = this.temporary.list.flashcards[this.temporary.flashcard.index]._id
    this.temporary.flashcard.firstLanguage = this.temporary.list.flashcards[this.temporary.flashcard.index].firstLanguage
    this.temporary.flashcard.secondLanguage = this.temporary.list.flashcards[this.temporary.flashcard.index].secondLanguage
  },
  validations: {
    answer: required,
  },
  data: () => ({
    promptQuiz: false,
    promptBackToList: false,
    accuracy: 0,
    numberOfCards: 5,
    result: {
      correctAnswers: 0,
      incorrectAnswers: 0,
      flashcards: [],
    },
    temporary: {
      list: {},
      flashcard: {
        firstLanguage: '',
        secondLanguage: '',
        index: 0,
      }
    },
    answer: '',
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
    async randomFlashcard() {
      return Math.floor(Math.random() * (this.temporary.list.flashcards.length - 0)) + 0;
    },
    async nextFlashcard() { 
      const verifyFlashcardResult = await this.verifyFlashcard(this.answer)

      let randFlashcard = await this.randomFlashcard();

      this.temporary.flashcard.index++

      if (this.temporary.flashcard.index >= this.numberOfCards) {
        await this.saveQuizResult()
        this.promptQuiz = true
        console.log(`Result: ${JSON.stringify(this.result)}`)
        this.temporary.flashcard.index = 0
      }

      this.answer = ''
      
      this.temporary.flashcard.id = this.temporary.list.flashcards[randFlashcard]._id
      this.temporary.flashcard.firstLanguage = this.temporary.list.flashcards[randFlashcard].firstLanguage
      this.temporary.flashcard.secondLanguage = this.temporary.list.flashcards[randFlashcard].secondLanguage
    },
    async checkIfFlashcardExistsInResult(firstLanguage) {
      console.log('firstLanguage', firstLanguage)
      for (let i = 0; i < this.result.flashcards.length; i++) {
        if (this.result.flashcards[i]['firstLanguage'] == firstLanguage) {
          console.log('True')
          return true
        }
      }
      return false
    },
    async findIndexInData(data, property, value) {
      var result = -1;
      data.some(function (item, i) {
          if (item[property] === value) {
              result = i;
              return true;
          }
      });
      return result;
    },
    async verifyFlashcard(answer) {

      if (this.temporary.flashcard.index >= this.numberOfCards) {
        await this.saveQuizResult()
        this.promptQuiz = true
        console.log(`Result: ${JSON.stringify(this.result)}`)
        this.temporary.flashcard.index = 0
      }

      const checkIfFlashcardExistsInResultProcess = await this.checkIfFlashcardExistsInResult(this.temporary.flashcard.firstLanguage)

      if (!checkIfFlashcardExistsInResultProcess) {

        console.log('flashcard id', this.temporary.flashcard.id);
        this.result.flashcards.push(
          {
            'firstLanguage': this.temporary.flashcard.firstLanguage,
            'secondLanguage': this.temporary.flashcard.secondLanguage,
            'flashcardId': this.temporary.flashcard.id,
            'statistics': {
              'correctAnswers': 0,
              'incorrectAnswers': 0,
            }
          },
        )
      } 

      // find index of flashcard in result
      let index = await this.findIndexInData(this.result.flashcards, 'firstLanguage', this.temporary.flashcard.firstLanguage)

      if (answer === this.temporary.flashcard.secondLanguage) {
        // list
        this.result.correctAnswers++
        // specific flashcard
        this.result.flashcards[index].statistics.correctAnswers++

        this.$q.notify({message: 'Correct answer', color: 'positive'})
        return true
      }

      // list
      this.result.incorrectAnswers++
      // specific flashcard
      this.result.flashcards[index].statistics.incorrectAnswers++

      this.$q.notify({message: 'Incorrect answer', color: 'negative'})
      return false
    },
    async saveQuizResult() {
      try {
        const saveQuizResultProcess = await this.$store.dispatch('lists/saveQuizResult', {
          listId: this.$route.params.id,
          result: this.result,
        })
        this.$q.notify({message: saveQuizResultProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async openPromptBackToList() {
      this.promptBackToList = true;
    },
    async closeQuiz() {
      try {
        this.$router.push(`/list/${this.$route.params.id}`)
      } catch (e) {
        this.$q.notify({message: 'Something has been gone wrong' , color: 'negative'})
      }
    },
    async startQuiz() {
      try {
        this.promptQuiz = false
        this.$q.notify({message: 'Quiz', color: 'positive'})
      } catch (e) {
        this.$q.notify({message: 'Something has been gone wrong' , color: 'negative'})
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
  .word
    font-size: 16px !important
    &.second-language 
      color: $primary
</style>
