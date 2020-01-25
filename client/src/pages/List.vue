<template>
  <div class="row q-col-gutter-xs"">
    <div class="col-xs-12 col-sm-12 offset-md col-md-4 offset-md-4 col-lg-6 offset-lg-3 col-xl-6  offset-xl-3">
 

    <q-list bordered class="rounded-borders">
      <q-item-label header>{{list.title}}</q-item-label>
      <q-item>
        <q-item-section avatar top>
          <q-icon name="list" size="34px" />
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">{{list.firstLanguage.substring(0,3)}} <-> {{list.secondLanguage.substring(0,3)}}</q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{list.description}}</span>
            <span class="text-grey-8"></span>
          </q-item-label>
        </q-item-section>
        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="edit"/>
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete"/>
            <q-btn size="12px" flat dense round icon="dashboard"/>
          </div>
        </q-item-section>
      </q-item>     
    </q-list>




    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="post_add" @click="openPromptCreateWord" />
    </q-page-sticky>
      
      <!-- // Dialog - Create Word -->
    <q-dialog v-model="promptCreateWord" persistent>
      <q-card style="min-width: 350px">
        <form c>
        <q-card-section>
          <div class="text-h6">Create word</div>
        </q-card-section>
        <q-card-section class="q-pt-none">          
          <q-input filled v-model="formCreateWord.firstLanguage" label="First language" :error="$v.formCreateWord.firstLanguage.$error" class="q-pb-lg">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input filled v-model="formCreateWord.secondLanguage" label="Second language" :error="$v.formCreateWord.secondLanguage.$error" class="q-pb-lg">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Create word" @click="createWord" />
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
  created() {
    console.log(this.$route.params.id)

    this.getList(this.$route.params.id)
    this.formCreateWord.listId = this.$route.params.id
    console.log('',this.formCreateWord.listId)

  },
  data: () => ({
    promptCreateWord: false,
    formCreateWord: {
      listId: '',
      firstLanguage: '',
      secondLanguage: '',
    },
  }),
  validations: {
    formCreateWord: {
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
    openPromptCreateWord() {
      this.promptCreateWord = true
    },
    async getWords() {
      try {
        const getWordsProcess = await this.$store.dispatch('lists/getWords', {
          id: this.$route.params.id,
        })

        this.$q.notify({message: getWordsProcess.message, color: 'positive'})
      } catch (e) {
        console.log(e)
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async createWord() {
      try {
        console.log('Create word')
        this.$v.formCreateWord.$touch()

        if (this.$v.formCreateWord.$error) {
          throw new Error('Please review fields again.')
        }
        
        const createWordProcess = await this.$store.dispatch('words/createWord', {
          listId: this.formCreateWord.listId,
          firstLanguage: this.formCreateWord.firstLanguage,
          secondLanguage: this.formCreateWord.secondLanguage,
        })

        this.formCreateWord.firstLanguage = ''
        this.formCreateWord.secondLanguage = ''
        this.promptCreateWord = false

        // await this.getAllLists()
        this.$v.formCreateWord.$reset()

        this.$q.notify({message: createWordProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async getList(id) {
      try {
        const getListProcess = await this.$store.dispatch('lists/getList', {
          id
        })

        this.$q.notify({message: getListProcess.message, color: 'positive'})
      } catch (e) {
        console.log(e)
        this.$q.notify({message: e.message, color: 'negative'})
      }
    }
  },
  computed: {
    list() {
      return this.$store.getters['lists/list']
    }
  }
}
</script>
