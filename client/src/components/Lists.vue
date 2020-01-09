<template>
  <div>
    
    <vs-row vs-w="12">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="12" >
        <div class="panel-lists">
          <vs-button class="button-create-list" @click="popupCreateList=true">Create list</vs-button>
        </div>
      </vs-col>
    </vs-row>
    <vs-row vs-w="12">
<!--       <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="3" >
        
      </vs-col> -->
      <vs-col class="c" vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="3" >
        <vs-card class="card">
          <div slot="header">
            <h3>
              Hello world !
            </h3>
          </div>
          <div>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button class="icon" icon="edit"></vs-button>
              <vs-button class="icon" icon="delete"></vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
      <vs-col class="c" vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="3" >
        <vs-card class="card">
          <div slot="header">
            <h3>
              Hello world !
            </h3>
          </div>
          <div>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span
>          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button class="icon" icon="edit"></vs-button>
              <vs-button class="icon" icon="delete"></vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
      <vs-col class="c" vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="3" >
        <vs-card class="card">
          <div slot="header">
            <h3>
              Hello world !
            </h3>
          </div>
          <div>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button class="icon" icon="edit"></vs-button>
              <vs-button class="icon" icon="delete"></vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
      <vs-col class="c" vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="3" >
        <vs-card class="card">
          <div slot="header">
            <h3>
              Hello world !
            </h3>
          </div>
          <div>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button class="icon" icon="edit"></vs-button>
              <vs-button class="icon" icon="delete"></vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>


    <div class="centerx">
      <vs-popup classContent="popup-example" title="Create list" :active.sync="popupCreateList">
        <form @submit.prevent="createList">
          <ValidationObserver v-slot="{invalid}">
            <validation-provider rules="required" v-slot="{ errors }">
              <vs-input label="Title" placeholder="Title" v-model="formCreateList.title"/>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors }">
              <vs-input label="Description" placeholder="Description" v-model="formCreateList.description"/>        
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
            <vs-select
              autocomplete
              class="selectExample"
              label="First language"
              v-model="formCreateList.firstLanguage"
              >
              <vs-select-item 
                :key="index" 
                :value="item.value" 
                :text="item.text" 
                v-for="(item,index) in listOfLanguages" 
              />
            </vs-select>
            <vs-select
              autocomplete
              class="selectExample"
              label="Second language"
              v-model="formCreateList.secondLanguage"
            >
              <vs-select-item 
                :key="index" 
                :value="item.value" 
                :text="item.text" 
                v-for="(item,index) in listOfLanguages" 
              />
            </vs-select>
            <vs-button class="btn-popup" type="filled" button="submit" :disabled="invalid">Create</vs-button>
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
  name: "lists",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  async beforeCreate() {
    try {
      const createListProcess = await this.$store.dispatch("lists/getAllLists")
      this.$vs.notify({
        title:"Success",
        text: createListProcess.message,
        color:this.$notificationsColorSuccess
      });
    } catch (e) {
      console.log(e);
      this.$vs.notify({
        time: 2000,
        title:"Error",
        text: e.message,
        color:this.$notificationsColorError
      });
    }
  },
  created() {
    console.log("created");
    console.log("lists", this.lists)
  },
  data: () => ({
    search: "",
    select1Normal:'',
    formCreateList: {
      title: "",
      description: "",
      firstLanguage: "polish",
      secondLanguage: "french",
    },
    listOfLanguages: [
      {text: "spanish", value: "spanish"},
      {text: "french", value: "french"},
      {text: "german", value: "german"},
      {text: "polish", value: "polish"},
      {text: "russian", value: "russian"},
      {text: "english", value: "english"},
      {text: "japanese", value: "japanese"},
    ],
    popupCreateList:false,    
  }),
  methods: {
    async createList() {
      try {

        console.log(this.formCreateList)
        const createListProcess = await this.$store.dispatch("lists/createList", {
          title: this.formCreateList.title,
          description: this.formCreateList.description,
          firstLanguage: this.formCreateList.firstLanguage,
          secondLanguage: this.formCreateList.secondLanguage,
        });

        this.$vs.notify({
          title:"Success",
          text: createListProcess.message,
          color:this.$notificationsColorSuccess
        });

      } catch(e) {      
        console.log(e);
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
    lists() {
      return this.$store.getters["lists/lists"];
    },
  }
};
</script>


<style lang="scss">

.panel-lists {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin: 12px 12px;
  padding: 26px 26px;
  height: 76px;
  border-radius: 16px;
  background-color: var(--panel-lists-background-color) !important;

  
}
.button-create-list.vs-button-primary.vs-button-filled { 
  background-color: var(--panel-lists-button-background-color) !important;
}

.card {
  background-color: var(--card-list-background-color) !important;
  color: var(--card-list-color) !important;
  max-width: 400px;
  // padding: 12px 12px;
  margin: 12px 12px;
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
  
  .vs-button-primary.vs-button-filled {
    background-color: var(--card-list-icon-background-color) !important;
  }
  .icon {
    background-color: blue !important;
  }
}

.btn-create-list-wrapper {
  text-align: center;
}


.vs-button-primary.vs-button-filled {
  &.btn-popup {
    margin-top: 16px;
    background-color: var(--popup-button-background-color) !important;
  }
}


.vs-popup--title {
  color: var(--popup-title-color);
}

.vs-popup--close {
  background-color: var(--popup-icon-background-color) !important;
  color: var(--popup-icon-color) !important;
}

.vs-popup {
  background-color: var(--popup-background-color) !important;

  .vs-input--label {
    color: var(--popup-label-color) !important;
  }

  .vs-select--label {
    color: var(--popup-label-color);
  }

  .error {
    margin-top: 2px;
    color: var(--validation-error-color) !important;
  }
}

.vuesax-app-is-ltr .vs-popup--content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}



</style>
