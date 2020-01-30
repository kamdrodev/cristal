<template>
  <div class="row q-col-gutter-xs"">
    <div class="col-xs-12 col-sm-12 offset-md col-md-4 offset-md-4 col-lg-6 offset-lg-3 col-xl-6  offset-xl-3">
      
    <h4 class="text-center">{{list.title}}</h4>
    <h6 class="text-center">{{list.description}}</h6>

    <q-card flat bordered class="my-card " v-for="flashcard in flashcards" :key="flashcard._id">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{flashcard.firstLanguage.text}}</div>
            <div class="text-subtitle2">{{flashcard.secondLanguage.text}}</div>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable @click="openPromptUpdateFlashcard(flashcard)">
                    <q-item-section>Update flashcard</q-item-section>
                  </q-item>
                  <q-item clickable @click="openPromptDeleteFlashcard(flashcard)">
                    <q-item-section>Delete flashcard</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Share</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>

      </q-card-section>

      <q-separator />

      <q-card-actions>
        <!-- <q-btn flat @click="viewList(list)">Go to list</q-btn> -->
        <!-- <q-btn flat>Action 2</q-btn> -->
      </q-card-actions>
    </q-card>


    <!-- <h1 v-for='word in flashcards'>Flashcard</h1> -->

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="post_add" @click="openPromptCreateFlashcard" />
    </q-page-sticky>
      
    <!--  Dialog - Create flashcard -->
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
          <q-btn flat label="Create flashcard" @click="createFlashcard" />
        </q-card-actions>
      </form>
      </q-card>
    </q-dialog>

     <!--  Dialog - Update flashcard -->
    <q-dialog v-model="promptUpdateFlashcard" persistent>
      <q-card style="min-width: 350px">
        <form c>
        <q-card-section>
          <div class="text-h6">Update word</div>
        </q-card-section>
        <q-card-section class="q-pt-none">          
          <q-input filled v-model="formUpdateFlashcard.firstLanguage" label="First language" :error="$v.formUpdateFlashcard.firstLanguage.$error" class="q-pb-lg">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input filled v-model="formUpdateFlashcard.secondLanguage" label="Second language" :error="$v.formUpdateFlashcard.secondLanguage.$error" class="q-pb-lg">
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


    <!-- Dialog - Delete flashcard -->
     <q-dialog v-model="promptDeleteFlashcard" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Do you really want to delete this flashcard?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete flashcard" color="primary" @click="deleteFlashcard"/>
        </q-card-actions>
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
      id: '',
      firstLanguage: '',
      secondLanguage: '',
    },
    formDeleteFlashcard: {
      id: '',
    },
  }),
  validations: {
    formCreateFlashcard: {
      firstLanguage: {
        required,
      },
      secondLanguage: {
        required,
      },
    },
    formUpdateFlashcard: {
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

      this.formCreateFlashcard = {
        listId: this.$route.params.id,
        firstLanguage: '',
        secondLanguage: '',
      }
    },
    openPromptUpdateFlashcard(flashcard) {
      this.promptUpdateFlashcard = true

      this.formUpdateFlashcard = {
        id: flashcard._id,
        firstLanguage: flashcard.firstLanguage.text,
        secondLanguage: flashcard.secondLanguage.text,
      }
    },
    openPromptDeleteFlashcard(flashcard) {
      this.promptDeleteFlashcard = true

      this.formDeleteFlashcard = {
        id: flashcard._id,
      }
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
        this.$v.formCreateFlashcard.$touch()

        if (this.$v.formCreateFlashcard.$error) {
          throw new Error('Please review fields again.')
        }
        
        const createFlashcardProcess = await this.$store.dispatch('flashcards/createFlashcard', {
          listId: this.formCreateFlashcard.listId,
          firstLanguage: this.formCreateFlashcard.firstLanguage,
          secondLanguage: this.formCreateFlashcard.secondLanguage,
        })

        this.formCreateFlashcard = {}
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
        this.$v.formUpdateFlashcard.$touch()

        if (this.$v.formUpdateFlashcard.$error) {
          throw new Error('Please review fields again.')
        }
        
        const updateFlashcardProcess = await this.$store.dispatch('flashcards/updateFlashcard', {
          id: this.formUpdateFlashcard.id,
          firstLanguage: this.formUpdateFlashcard.firstLanguage,
          secondLanguage: this.formUpdateFlashcard.secondLanguage,
        })

        this.word = {}
        this.promptUpdateFlashcard = false

        this.formUpdateFlashcard = {}
        await this.getAllFlashcards()
        this.$v.formCreateFlashcard.$reset()

        this.$q.notify({message: updateFlashcardProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async deleteFlashcard() {
      try {
        const deleteFlashcardProcess = await this.$store.dispatch('flashcards/deleteFlashcard', {
          id: this.formDeleteFlashcard.id,
        })

        this.promptDeleteFlashcard = {}
        this.promptDeleteFlashcard = false

        await this.getAllFlashcards()

        this.$q.notify({message: deleteFlashcardProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async getList() {
      try {
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
