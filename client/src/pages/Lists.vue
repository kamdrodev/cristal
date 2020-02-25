<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 offset-md col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-6  offset-xl-3">
      <q-select outlined class="q-mb-md" v-model="listsQueryOptions.firstLanguage" :options="languages" @input="changeQueryOptions" label="I know..." />
      <q-select outlined class="q-mb-md" v-model="listsQueryOptions.secondLanguage" :options="languages" @input="changeQueryOptions" label="I want to learn..." />
    <q-card flat bordered class="my-card q-mt-md" v-for="list in lists" :key="list._id">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{list.title}}</div>
            <div class="text-subtitle2">{{list.description}}</div>
          </div>

          <div class="col-auto">
            <q-btn color="" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable @click="openPromptUpdateList(list)">
                    <q-item-section>Update list</q-item-section>
                  </q-item>
                  <q-item clickable @click="openPromptDeleteList(list)">
                    <q-item-section>Delete list</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <!-- {{ lorem }} -->
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat @click="viewList(list)">Go to list</q-btn>
        <!-- <q-btn flat>Action 2</q-btn> -->
      </q-card-actions>
    </q-card>



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
          <q-btn flat label="Update list" @click="updateList" />
        </q-card-actions>
      </form>
      </q-card>
    </q-dialog>

     <!-- Dialog - Delete list -->
     <q-dialog v-model="promptDeleteList" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Do you really want to delete this list?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete list" color="primary" @click="deleteList"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div> 
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

import { mapGetters } from 'vuex';

export default {
  name: 'Lists',
  data: () => ({
    promptCreateList: false,
    promptUpdateList: false,
    promptDeleteList: false,
    listsQueryOptions: {
      firstLanguage: 'polish',
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
      id: '',
      title: '',
      description: '',
      firstLanguage: '',
      secondLanguage: '',
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
    selectElementOfList(id) {
      console.log('selectElementOfList)', id)
    },
    openPromptCreateList() {
      this.promptCreateList = true
    },
    async openPromptUpdateList(list) {

      console.log(list);      
      this.promptUpdateList = true
      this.formUpdateList = {
        id: list._id,
        title: list.title,
        description: list.description,
      }
    },
    openPromptDeleteList(list) {
      this.promptDeleteList = true
      this.formDeleteList = {
        id: list._id
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
    async changeQueryOptions() {
      console.log('change query options')
      await this.getAllLists()
    },
    async createList() {
      try {
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


        // Clear form
        this.formCreateList = {}
        
        // Close dialog
        this.promptCreateList = false

        // Resert form validation
        this.$v.formCreateList.$reset()

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
        
        const updateListProcess = await this.$store.dispatch('lists/updateList', {
          listId: this.formUpdateList.id,
          title: this.formUpdateList.title,
          description: this.formUpdateList.description,
        })

        // Clear form
        this.formUpdateList = {}

        // Close dialog
        this.promptUpdateList = false

        await this.getAllLists()

        this.$q.notify({message: updateListProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async deleteList() {
      try {
        
        const deleteListProcess = await this.$store.dispatch('lists/deleteList', {
          listId: this.formDeleteList.id
        })

        // Close dialog
        this.promptDeleteList = false

        await this.getAllLists()

        this.$q.notify({message: deleteListProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    },
    async viewList(list) {
      this.$router.push(`/list/${list._id}`)
    }
  },
  computed: {
    ...mapGetters('lists', ['lists'])
  }
}
</script>

<style lang="sass">
  
</style>
