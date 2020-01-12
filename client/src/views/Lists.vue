<template>
  
  <div class="container">
  
  <vs-row vs-w="12">
      <vs-col vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="12" >

    <vs-row vs-w="12">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="12" >
          <vs-row vs-w="12" >
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="8" class="panel-lists" >
              <vs-select
                class="selectExample"
                v-model="listsQueryOptions.secondLanguage"
                @change="getAllLists"
              >
              <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in listOfLanguages" />
            </vs-select>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="4" class="panel-lists">
              <vs-button class="button-create-list" type="border" icon="post_add" size="large" @click="openPopupCreateList">Create list</vs-button>
            </vs-col>         
          </vs-row>
      </vs-col>
    </vs-row>
    <vs-row vs-type="flex" vs-w="12">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="4" v-for="list in lists">
        </vs-collapse>
        <vs-card class="card">
          <div slot="header" class="header">
            <img src="../../public/svg/logo.svg" alt="" class="logo">
            <h3>

              {{ list.title }}
            </h3>
          </div>
          <div>
            <span>{{ list.description }} </span>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button 
                class="icon" 
                icon="view_module"
                @click="viewList(list._id)"
              ></vs-button>
              <vs-button 
                class="icon" 
                icon="edit"
                @click="openPopupEditList(list.title, list.description, list._id)"
              ></vs-button>
              <vs-button 
              class="icon" 
              icon="delete"
              @click="deleteList(list._id)">
                
              </vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>

  
    <!-- popup create list -->
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
            <vs-button class="btn-popup" type="filled" size="large" button="submit" :disabled="invalid">Create</vs-button>
          </ValidationObserver>
        </form>
      </vs-popup>
    </div>

    <!-- popup update list -->
    <div class="centerx">
      <vs-popup classContent="popup-example" title="Update list" :active.sync="popupUpdateList">
        <form @submit.prevent="updateList">
          <ValidationObserver v-slot="{invalid}">
            <validation-provider rules="required" v-slot="{ errors }">
              <vs-input label="Title" placeholder="Title" v-model="formUpdateList.title"/>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors }">
              <vs-input label="Description" placeholder="Description" v-model="formUpdateList.description"/>        
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
            <vs-button class="btn-popup" type="filled" size="large" button="submit" :disabled="invalid">Delete</vs-button>
          </ValidationObserver>
        </form>
      </vs-popup>
    </div>



</vs-col>
</vs-row>
      
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
  name: "Lists",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  async beforeCreate() {
    try {
      let defaultListsQueryOptions = {
        secondLanguage: "french",
      };

      const getAllListsProcess = await this.$store.dispatch("lists/getAllLists", {
        listsQueryOptions: defaultListsQueryOptions,
      })
      this.$vs.notify({
        title:"Success",
        text: getAllListsProcess.message,
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
  },
  data: () => ({
    type:'margin',
    search: "",
    listsQueryOptions: {
      secondLanguage: "french"
    },
    formCreateList: {
      title: "",
      description: "",
      firstLanguage: "polish",
      secondLanguage: "french",
    },
    formUpdateList: {
      id: "",
      title: "",
      description: "",
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
    popupUpdateList:false,    
  }),
  methods: {
    async openPopupCreateList() {
      try {
        this.popupCreateList = true;
      } catch (e) {
        this.$vs.notify({
          time: 2000,
          title:"Error",
          text: e.message,
          color:this.$notificationsColorError
        });
      }
      
    },
    async openPopupEditList(title, description, id) {
      try {
        this.popupUpdateList = true;
        this.formUpdateList.title = title;
        this.formUpdateList.description = description;
        this.formUpdateList.id = id;
      } catch (e) {
        this.$vs.notify({
          time: 2000,
          title:"Error",
          text: e.message,
          color:this.$notificationsColorError
        });
      }
      
    },
    async viewList(id) {
      try {
        this.$router.push(`/list/${id}`);
      } catch (e) {
        this.$vs.notify({
          time: 2000,
          title:"Error",
          text: e.message,
          color:this.$notificationsColorError
        });
      }
      
    },
    async getAllLists() {
      try {
        const getAllListsProcess = await this.$store.dispatch("lists/getAllLists", {
          listsQueryOptions: this.listsQueryOptions
        });

        this.$vs.notify({
          title:"Success",
          text: getAllListsProcess.message,
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
    async createList() {
      try {
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

        await this.getAllLists();

      } catch(e) {      
        this.$vs.notify({
          time: 2000,
          title:"Error",
          text: e.message,
          color:this.$notificationsColorError
        });
      }
    },
    async updateList(title, description) {
      try {
        const updateListProcess = await this.$store.dispatch("lists/updateList", {
          id: this.formUpdateList.id,
          title: this.formUpdateList.title,
          description: this.formUpdateList.description,
        });

        this.$vs.notify({
          title:"Success",
          text: updateListProcess.message,
          color:this.$notificationsColorSuccess
        });

        await this.getAllLists();
        
      } catch (e) {
        this.$vs.notify({
          time: 2000,
          title:"Error",
          text: e.message,
          color:this.$notificationsColorError
        });
      }

    },
    async deleteList(id) {
      try {
        let conf = confirm("Do you really want to delete this list?");

        if (conf) {
          const deleteListProcess = await this.$store.dispatch("lists/deleteList", {
            id
          });

          this.$vs.notify({
            title:"Success",
            text: deleteListProcess.message,
            color:this.$notificationsColorSuccess
          });

          await this.getAllLists();
        } 
        
      } catch (e) {
        this.$vs.notify({
          time: 2000,
          title:"Error",
          text: e.message,
          color:this.$notificationsColorError
        });
      }
    },
    async getList(id) {
      try {
        const updateListProcess = await this.$store.dispatch("lists/getList", {
          id: this.formUpdateList.id,
          title: this.formUpdateList.title,
          description: this.formUpdateList.description,
        });

        this.$vs.notify({
          title:"Success",
          text: updateListProcess.message,
          color:this.$notificationsColorSuccess
        });
      } catch (e) {
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
    }
  }
};
</script>


<style lang="scss">

.panel-lists {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100px;
  border-radius: 16px;
  background-color: var(--panel-lists-background-color) !important;
  box-shadow:0 1px 4px rgba(55, 25, 22, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  margin-bottom: 26px;

  .vs-select--label {
    color: var(--popup-label-color) !important;
  }

  .vs-select--input {
    padding: 16px !important;
  }
}

.card {
  background-color: var(--card-list-background-color) !important;
  color: var(--card-list-color) !important;
  width: 300px !important;
  max-width: 400px;
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;

  .logo {
    width: 20px;
  }

  position: relative;
  

  .header {
    text-align: center;
  }

  .vs-card--footer {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  
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
    text-align: center;
    margin-top: 16px;
    background-color: var(--popup-button-background-color) !important;
    width: 100%;
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

.collapse {

  width: 100%;
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;

  &:hover {
    cursor: default;
  }

  .title {
    color: var(--collapse-header-title-color) !important;
  }
  
  .languages {
    margin-top: 12px;
    color: var(--collapse-header-languages-color) !important;
  }
  
  .icon-header.vs-collapse-item--icon-header {
    color: var(--collapse-header-icon-color) !important;
  }


  .description {
    padding: 20px 0px;
  }

  .vs-collapse-item--header {
    

    &:hover {
      cursor: pointer;
    }
  }
  .vs-collapse-item--content {
    color: var(--collapse-content-color);
  }
  
  .icons-wrapper {
    display: flex;
    .icon {
      color: var(--collapse-icon-color) !important;
      padding: 10px 10px;
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .button-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  
}

</style>
