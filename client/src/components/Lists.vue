<template>
  <div>
    
    <vs-row vs-w="12">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="12" >
        
      </vs-col>
    </vs-row>
    <vs-row vs-w="12">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="3" >
        <vs-button color="primary" type="filled" @click="popupCreateList=true">Create list</vs-button>
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
    </vs-row>


    <div class="centerx">
      <vs-popup classContent="popup-example" title="Create list" :active.sync="popupCreateList">
        <vs-input label="Title" placeholder="Title" v-model="formCreateList.title"/>
        <vs-input label="Description" placeholder="Description" v-model="formCreateList.description"/>        
        <vs-select
          autocomplete
          class="selectExample"
          label="First language"
          v-model="formCreateList.firstLanguage"
          >
          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in listOfLanguages" />
        </vs-select>
        <vs-select
          autocomplete
          class="selectExample"
          label="Second language"
          v-model="formCreateList.secondLanguage"
          >
          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in listOfLanguages" />
        </vs-select>
        <vs-button class="btn-popup" type="filled" @click="createList">Create</vs-button>
      </vs-popup>
    </div>

  </div>



    
</template>

<script>
export default {
  name: "lists",
  data: () => ({
    search: "",
    select1Normal:'',
    formCreateList: {
      title: "",
      description: "",
      firstLanguage: "",
      secondLanguage: "",
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
        console.log(e)
        this.$vs.notify({
          time: 2000,
          title:"Error",
          text: e.message,
          color:this.$notificationsColorError
        });
      }
    }
  }
};
</script>


<style lang="scss">

.panel-lists {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: red;
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
.btn-create-list {
  margin-bottom: 20px;
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

}

.vuesax-app-is-ltr .vs-popup--content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}



</style>
