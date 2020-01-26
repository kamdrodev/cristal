<template>
  <div class="row q-col-gutter-xs"">
    <div class="col-xs-12 col-sm-12 offset-md col-md-4 offset-md-4 col-lg-6 offset-lg-3 col-xl-6  offset-xl-3">
    
    <h4>{{list.title}}</h4>
    <h6>{{list.description}}</h6>

    <q-list bordered class="rounded-borders" v-for="flashcard in flashcards">
      
      <q-item>
        <q-item-section avatar top>
          <q-icon name="list" size="34px" />
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">{{flashcard.firstLanguage.language.substring(0,3)}} <-> {{flashcard.secondLanguage.language.substring(0,3)}}</q-item-label>
        </q-item-section>

        <q-item-section bottom>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{flashcard.firstLanguage.text}}</span>
            <span class="text-grey-8"></span>
          </q-item-label>
        </q-item-section>
        <q-item-section bottom>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{flashcard.secondLanguage.text}}</span>
            <span class="text-grey-8"></span>
          </q-item-label>
        </q-item-section>
        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="edit" @click="openPromptUpdateFlashcard" />
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="openPromptDeleteFlashcard"/>
          </div>
        </q-item-section>
      </q-item>     
    </q-list>


    <!-- <h1 v-for='word in flashcards'>Flashcard</h1> -->

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="post_add" @click="openPromptCreateFlashcard" />
    </q-page-sticky>
      
    <!-- // Dialog - Create Flashcard -->
    <q-dialog v-model="promptCreateFlashcard" persistent>
      <q-card style="min-width: 350px">
        <form c>
        <q-card-section>
          <div class="text-h6">Create word</div>
        </q-card-section>
        <q-card-section class="q-pt-none">          
          <q-input filled v-model="formCreateFlashcard.firstLanguage" label="First language" :error="$v.formCreateFlashcard.firstLanguage.$error" class="q-pb-lg">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input filled v-model="formCreateFlashcard.secondLanguage" label="Second language" :error="$v.formCreateFlashcard.secondLanguage.$error" class="q-pb-lg">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Create word" @click="createFlashcard" />
        </q-card-actions>
      </form>
      </q-card>
    </q-dialog>

     <!-- // Dialog - Update Flashcard -->
    <q-dialog v-model="promptUpdateFlashcard" persistent>
      <q-card style="min-width: 350px">
        <form c>
        <q-card-section>
          <div class="text-h6">Update word</div>
        </q-card-section>
        <q-card-section class="q-pt-none">          
          <q-input filled v-model="formCreateFlashcard.firstLanguage" label="First language" :error="$v.formCreateFlashcard.firstLanguage.$error" class="q-pb-lg">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input filled v-model="formCreateFlashcard.secondLanguage" label="Second language" :error="$v.formCreateFlashcard.secondLanguage.$error" class="q-pb-lg">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Update word" @click="updateFlashcard" />
        </q-card-actions>
      </form>
      </q-card>
    </q-dialog>

    

    </div>
  </div>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'PageList',
  async created() {
    this.formCreateFlashcard.listId = this.$route.params.id


    await this.getList()
    await this.getAllFlashcards()
  },
  data: () => ({
    promptCreateFlashcard: false,
    promptUpdateFlashcard: false,
    promptDeleteFlashcard: false,
    flashcard: {},
    formCreateFlashcard: {
      listId: '',
      firstLanguage: '',
      secondLanguage: '',
    },
    formUpdateFlashcard: {
      firstLanguage: '',
      secondLanguage: '',
    },
  }),
  validations: {
    formCreateFlashcard: {
      listId: {

      },
      firstLanguage: {
        required,
      },
      secondLanguage: {
        required,
      },
    },
  },
  methods: {
    openPromptCreateFlashcard() {
      this.promptCreateFlashcard = true
    },
    openPromptUpdateFlashcard(flashcard) {
      this.promptUpdateFlashcard = true

      this.flashcard = flashcard
    },
    openPromptDeleteFlashcard() {
      this.promptDeleteFlashcard = true

      this.flashcard = flashcard
    },
    async getAllFlashcards() {
      try {
        const getFlashcardsProcess = await this.$store.dispatch('flashcards/getAllFlashcards', {
          listId: this.$route.params.id,
        })

        this.$q.notify({message: getFlashcardsProcess.message, color: 'positive'})
      } catch (e) {
        console.log(e)
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async createFlashcard() {
      try {
        console.log('Create word')
        this.$v.formCreateFlashcard.$touch()

        if (this.$v.formCreateFlashcard.$error) {
          throw new Error('Please review fields again.')
        }

        console.log(this.formCreateFlashcard)
        
        const createFlashcardProcess = await this.$store.dispatch('flashcards/createFlashcard', {
          listId: this.formCreateFlashcard.listId,
          firstLanguage: this.formCreateFlashcard.firstLanguage,
          secondLanguage: this.formCreateFlashcard.secondLanguage,
        })

        this.formCreateFlashcard.firstLanguage = ''
        this.formCreateFlashcard.secondLanguage = ''
        this.promptCreateFlashcard = false

        await this.getAllFlashcards()
        this.$v.formCreateFlashcard.$reset()

        this.$q.notify({message: createFlashcardProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async updateFlashcard() {
      try {
        console.log('Update word')
        this.$v.formUpdateFlashcard.$touch()

        if (this.$v.formUpdateFlashcard.$error) {
          throw new Error('Please review fields again.')
        }
        
        const updateFlashcardProcess = await this.$store.dispatch('flashcards/updateFlashcard', {
          listId: this.word.listId,
          firstLanguage: this.word.firstLanguage,
          secondLanguage: this.word.secondLanguage,
        })

        this.word = {}
        this.promptUpdateFlashcard = false

        await this.getAllFlashcards()
        this.$v.formCreateFlashcard.$reset()

        this.$q.notify({message: updateFlashcardProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async getList() {
      try {
        console.log('getlist')
        console.log(this.$route.params.id)
        const getListProcess = await this.$store.dispatch('lists/getList', {
          id: this.$route.params.id,
        })

        this.$q.notify({message: getListProcess.message, color: 'positive'})
      } catch (e) {
        console.log(e)
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async getFlashcards() {
      try {
        const getFlashcardsProcess = await this.$store.dispatch('flashcards/getFlashcards', {
          listId: this.$route.params.id,
        })

        this.$q.notify({message: getFlashcardsProcess.message, color: 'positive'})
      } catch (e) {
        console.log(e)
        this.$q.notify({message: e.message, color: 'negative'})
      }
    }
  },
  computed: {
    list() {
      return this.$store.getters['lists/list']
    },
    flashcards() {
      return this.$store.state.flashcards.flashcards
    }
  }
}
</script>
