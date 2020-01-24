<template>
  <div class="row q-col-gutter-xs"">
    <div class="col-xs-12 col-sm-12 offset-md col-md-4 offset-md-4 col-lg-6 offset-lg-3 col-xl-6  offset-xl-3">
      <q-select outlined v-model="listsQueryOptions.secondLanguage" :options="languages" label="I want to learn..." />




    <q-list bordered class="rounded-borders" v-for='list in lists'>
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
            <q-btn class="gt-xs" size="12px" flat dense round icon="edit" @click="openPromptUpdateList(list._id, list.title, list.description)" />
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="openPromptDeleteList(list._id)" />
            <q-btn size="12px" flat dense round icon="dashboard" />
          </div>
        </q-item-section>
      </q-item>     
    </q-list>




      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="post_add" @click="openPromptCreateList" />
      </q-page-sticky>
    </div>

    <!-- // Dialog - Create List -->
    <q-dialog v-model="promptCreateList" persistent>
      <q-card style="min-width: 350px">
        <form c>
        <q-card-section>
          <div class="text-h6">Create list</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- <q-input dense v-model="address" autofocus @keyup.enter="promptCreateList = false" /> -->
          <q-select outlined v-model="formCreateList.firstLanguage" :options="languages" label="First language" class="q-pb-lg" :error="$v.formCreateList.firstLanguage.$error">
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
          </q-select>
          <q-select outlined v-model="formCreateList.secondLanguage" :options="languages" label="Second language" class="q-pb-lg" :error="$v.formCreateList.secondLanguage.$error">
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
          </q-select>
          <q-input filled v-model="formCreateList.title" label="Title" :error="$v.formCreateList.title.$error" class="q-pb-lg">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input filled v-model="formCreateList.description" label="Description" :error="$v.formCreateList.description.$error" class="q-pb-lg">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Create list" @click="createList" />
        </q-card-actions>
      </form>
      </q-card>
    </q-dialog>

   
    <!-- Dialog - Update List -->
    <q-dialog v-model="promptUpdateList" persistent>
      <q-card style="min-width: 350px">
        <form c>
        <q-card-section>
          <div class="text-h6">Update list</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- <q-input dense v-model="address" autofocus @keyup.enter="promptCreateList = false" /> -->
          <q-input filled v-model="formUpdateList.title" label="Title" :error="$v.formUpdateList.title.$error" class="q-pb-lg">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input filled v-model="formUpdateList.description" label="Description" :error="$v.formUpdateList.description.$error" class="q-pb-lg">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Create list" @click="updateList" />
        </q-card-actions>
      </form>
      </q-card>
    </q-dialog>

     <!-- Dialog - Delete list -->
     <q-dialog v-model="promptDeleteList" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are currently not connected to any network.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Turn on Wifi" color="primary" @click="deleteList" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div> 
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'Lists',
  data: () => ({
    promptCreateList: false,
    promptUpdateList: false,
    promptDeleteList: false,
    listsQueryOptions: {
      secondLanguage: 'french',
    },
    languages: [
      'spanish',
      'french',
      'german',
      'polish',
      'russian',
      'english',
      'japanese',
    ],
    formCreateList: {
      title: '',
      description: '',
      firstLanguage: 'polish',
      secondLanguage: 'french',
    },
    formUpdateList: {
      id: '',
      title: '',
      description: '',
    },
    formDeletelist: {
      id: '',
    },
  }),
  validations: {
    formCreateList: {
      firstLanguage: {
        required,
      },
      secondLanguage: {
        required,
      },
      title: {
        required,
      },
      description: {
        required,
      }
    },
    formUpdateList: {
      title: {
        required,
      },
      description: {
        required,
      },
    }
  },
  async created() {
    try {
      const getAllListsProcess = await this.$store.dispatch('lists/getAllLists', {
        listsQueryOptions: this.listsQueryOptions,
      })

      this.$q.notify({message: getAllListsProcess.message, color: 'positive'})
    } catch (e) {
      console.log(e)
      this.$q.notify({message: e.message, color: 'negative'})
    }
  },
  methods: {
    openPromptCreateList() {
      this.promptCreateList = true
    },
    openPromptUpdateList(id, title, description) {
      this.promptUpdateList = true
      this.formUpdateList = {
        id,
        title,
        description,
      }
    },
    openPromptDeleteList(id) {
      this.promptDeleteList = true
      this.formDeleteList = {
        id,
      }
    },
    async getAllLists() {
      try {
      const getAllListsProcess = await this.$store.dispatch('lists/getAllLists', {
          listsQueryOptions: this.listsQueryOptions,
        })

        this.$q.notify({message: getAllListsProcess.message, color: 'positive'})
      } catch (e) {
        console.log(e)
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async createList() {
      try {
        console.log('Create list')
        this.$v.formCreateList.$touch()

        if (this.$v.formCreateList.$error) {
          throw new Error('Please review fields again.')
        }
        
        const createListProcess = await this.$store.dispatch('lists/createList', {
          firstLanguage: this.formCreateList.firstLanguage,
          secondLanguage: this.formCreateList.secondLanguage,
          title: this.formCreateList.title,
          description: this.formCreateList.description,
        })

        await this.getAllLists()

        this.$q.notify({message: createListProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async updateList() {
      try {
        console.log('Edit list')
        this.$v.formUpdateList.$touch()

        if (this.$v.formUpdateList.$error) {
          throw new Error('Please review fields again.')
        }
        
        const updateListProfcess = await this.$store.dispatch('lists/updateList', {
          id: this.formUpdateList.id,
          title: this.formUpdateList.title,
          description: this.formUpdateList.description,
        })

        await this.getAllLists()

        this.$q.notify({message: updateListProfcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async deleteList() {
      try {
        
        const deleteListProcess = await this.$store.dispatch('lists/deleteList', {
          id: this.formDeleteList.id
        })

        await this.getAllLists()

        this.$q.notify({message: deleteListProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    }
  },
  computed: {
    lists() {
      return this.$store.getters['lists/lists']
    }
  }
}
</script>

<style lang="sass">
  
</style>
