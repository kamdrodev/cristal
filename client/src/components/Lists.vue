<template>
  <div class="row q-col-gutter-xs"">
    <div class="col-xs-12 col-sm-12 offset-md col-md-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4  offset-xl-4">
      <q-select outlined v-model="listsQueryOptions.secondLanguage" :options="languages" label="I want to learn..." />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="post_add" @click="promptCreateList = true" />
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

  </div> 
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'Lists',
  data: () => ({
    promptCreateList: false,
    listsQueryOptions: {
      secondLanguage: 'french',
    },
    lists: [],
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
      title: "",
      description: "",
      firstLanguage: "polish",
      secondLanguage: "french"
    }
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

        this.$q.notify({message: createListProcess.message, color: 'positive'})
      } catch (e) {
        this.$q.notify({message: e.message, color: 'negative'})
      }
    }
  }
}
</script>

<style lang="sass">
  
</style>
