<template>

  <vs-row vs-w="12">
      <vs-col vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="8" vs-offset="2">

    <vs-row vs-w="12">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="12" >
        <div class="panel-lists">
          <vs-button class="button-create-list" @click="popupCreateList=true">Create list</vs-button>
        </div>
      </vs-col>
    </vs-row>
    <vs-row vs-type="flex" vs-w="12">
      <vs-col class="c" vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="12" >
        <vs-collapse :type="type" class="collapse">
         <vs-collapse-item>
           <div slot="header">
             More
           </div>

           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus eros tortor, non fringilla lectus cursus et. Fusce vel nisi ante. Aliquam sit amet lectus pharetra, luctus mi sed, aliquet felis. Mauris a tortor viverra, ornare tellus in, consectetur leo.
            <br><br>
            Etiam nec nunc nec nisl luctus tincidunt efficitur vitae elit. Vestibulum iaculis nibh commodo neque ultrices lobortis. Cras magna massa, pretium vitae mattis varius, pharetra nec massa. Aliquam ac ex enim. Quisque consequat dui libero, vel blandit lorem porttitor sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam sed lobortis nisl, quis eleifend metus.
         </vs-collapse-item>
         <vs-collapse-item>
           <div slot="header">
             More
           </div>

           Nunc auctor et leo vitae suscipit. Nullam aliquet purus scelerisque enim hendrerit tristique. Maecenas tincidunt dui arcu, a aliquet nisl venenatis vitae. Praesent mauris ligula, porta at maximus ac, rutrum vitae sapien. Donec a sapien id erat dapibus dignissim sodales in est. Donec gravida dapibus sapien at sollicitudin. Maecenas iaculis quam ex,
           <br><br>
           eu aliquam erat sagittis eget. Suspendisse mollis felis nec ipsum vehicula, at posuere libero viverra. Nam hendrerit dapibus eleifend. Aliquam elit nulla, tincidunt pellentesque enim mollis, consectetur placerat enim. Integer condimentum tristique ante et ullamcorper. Mauris placerat pretium ex. Nam aliquam sed tortor sit amet
           <br><br>
           efficitur. Mauris quis faucibus nulla. Pellentesque egestas non ipsum vel maximus.
           <div class="icons-wrapper">

            <vs-icon icon="edit" class="icon"></vs-icon>
            <vs-icon icon="delete" class="icon"></vs-icon>
            <div class="button-wrapper">
              <vs-button type="relief">View</vs-button>
            </div>
           </div>
         </vs-collapse-item>
         
        </vs-collapse>
      </vs-col>
    </vs-row>

  
    <!-- popup creat list -->
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



</vs-col>
</vs-row>
    
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
    type:'margin',
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
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
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
  .vs-collapse-item--header {
    color: var(--collapse-header-color);
  }
  .vs-collapse-item--content {
    color: var(--collapse-content-color);
  }
  
  .icons-wrapper {
    display: flex;
    justify-content: flex-end;
    .icon {
      color: var(--collapse-icon-color) !important;
      padding: 10px 10px;
      margin-right: 10px;
    }
  }

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  
}

</style>
