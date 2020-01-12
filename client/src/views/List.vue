<template>
  <div class="container">
    <vs-row vs-w="12">
    <vs-col vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="12">
        <vs-row vs-w="12">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="8" class="panel-list">

          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="4" class="panel-list">
              <vs-button class="btn" @click="openPopupCreateWord" type="border" icon="post_add" size="large">New word</vs-button>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>

     <!-- popup create list -->
    <div class="centerx">
      <vs-popup classContent="popup-example" title="Create word" :active.sync="popupCreateWord">
        <form @submit.prevent="createWord">
          <ValidationObserver v-slot="{invalid}">
            <validation-provider rules="required" v-slot="{ errors }">
              <vs-input label="First language" placeholder="First language" v-model="formCreateWord.firstLanguage"/>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors }">
              <vs-input label="Second language" placeholder="Second language" v-model="formCreateWord.secondLanguage"/>        
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
            
            <vs-button class="btn-popup" type="filled" size="large" button="submit" :disabled="invalid">Create</vs-button>
          </ValidationObserver>
        </form>
      </vs-popup>
    </div>

  </div>
</template>

<script>

import { ValidationProvider, ValidationObserver, extend} from "vee-validate";
import { required, email, length, min, max } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});
extend("email", {
  ...email,
  message: "This is not valid email"
});

extend("minPassword", {
  ...min,
  message: "The field must be 6+ chars"
});

export default {
  name: "List",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  async beforeCreate() {
    try {
      const getListProcess = await this.$store.dispatch("lists/getList", {
        id: this.$route.params.id
      });

      this.$vs.notify({
        title:"Success",
        text: getListProcess.message,
        color:this.$notificationsColorSuccess
      });

    } catch(e) {      
      this.$vs.notify({
        time: 2000,
        title:"Error",
        text: e.message,
        color:this.$notificationsColorError
      });
    }
  },
  async created() {
    console.log(this.$store.getters["lists/list"].title);
  },
  data: () => ({
    popupCreateWord:false,    
    popupUpdateList:false,    
    formCreateWord: {
      firstLanguage: "",
      secondLanguage: "",
    },
  }),
  methods: {
    async openPopupCreateWord() {
      try {
        this.popupCreateWord = true;
      } catch (e) {
        this.$vs.notify({
          time: 2000,
          title:"Error",
          text: e.message,
          color:this.$notificationsColorError
        });
      }
    },
    async getList() {
      console.log("getList");
    },
    async createWord() {
      try {
        const createWordProcess = await this.$store.dispatch("words/createWord", {
          listId: this.$store.getters["lists/list"]._id,
          firstLanguage: this.formCreateWord.firstLanguage,
          secondLanguage: this.formCreateWord.secondLanguage,
        });

        this.$vs.notify({
          title:"Success",
          text: createWordProcess.message,
          color:this.$notificationsColorSuccess
        });


      } catch(e) {      
        this.$vs.notify({
          time: 2000,
          title:"Error",
          text: e.message,
          color:this.$notificationsColorError
        });
      }
    }
  },
  computed: {
    list() {
      return this.$store.getters["list/list"];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .panel-list {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100px;
    border-radius: 16px;
    background-color: var(--panel-lists-background-color) !important;
    box-shadow:0 1px 4px rgba(55, 25, 22, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    margin-bottom: 26px;
  }
</style>
