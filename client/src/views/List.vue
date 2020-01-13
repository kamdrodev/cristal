<template>
  <div>
    
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
