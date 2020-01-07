<template lang="html">
  <vs-row class="menu">
   
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="sidebar">
      <div id="parentx">
        <vs-icon icon="menu" @click="active=!active, notExpand = true" type="filled" class="menu"></vs-icon>
        <vs-sidebar parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">

          <div class="header-sidebar" slot="header">
            <h2 class="title">Crystal</h2>
          </div>
          <vs-sidebar-item index="1" icon="question_answer" class="item">
            Dashboard
          </vs-sidebar-item>
          <vs-divider icon="person" position="left" class="item">
            User
          </vs-divider>
          <vs-sidebar-item index="2" icon="person" class="item">
            Profile
          </vs-sidebar-item>
          <vs-sidebar-item index="3" icon="verified_user" class="item">
            My Activity
          </vs-sidebar-item>
          <vs-sidebar-item index="4" icon="settings" class="item">
            Configuration
          </vs-sidebar-item>


          <div class="footer-sidebar" slot="footer">
            <vs-button icon="reply"  type="flat" @click="signOut">log out</vs-button>
            <vs-button icon="settings" type="border"></vs-button>
          </div>

        </vs-sidebar>
      </div>
    </vs-col>
  </vs-row>

</template>

<script>
export default {
  data:()=>({
    active: false,
    notExpand: true,
    reduce: false
  }),
  methods: {
    async signOut() {
      try {
        console.log("signOut")

        const signOutProcess = await this.$store.dispatch("auth/signOut");
        this.$vs.notify({
          title: "Sign In",
          text: signOutProcess.message,
          color:this.$notificationsColorSuccess
        });

        this.$router.push("/sign-in");
      } catch(e) {
        this.$vs.notify({
          title: "Sign In",
          text: signOutProcess.message,
          color:this.$notificationsColorError
        });
      }
      
      
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  }
}
</script>

<style lang="scss">

.menu {
  position: absolute;

  i {
    color: var(--menu-icon-color);
    margin-top: 16px;
    margin-left: 16px;
  }
}

#parentx {
  width: 100%;
}

.vs-sidebar {
  background-color: var(--sidebar-background-color) !important;

  .title {
    color: var(--sidebar-title-color);
  }

  .item {
    color: var(--sidebar-item-color);
  }

}


.vs-sidebar--background {

}

.header-sidebar {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	width: 100%;
}

.header-sidebar h4 {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
}

.header-sidebar h4 > button {
	margin-left: 10px;
}

.footer-sidebar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.footer-sidebar > button {
	border: 0px solid rgba(0,0,0,0) !important;
	border-left: 1px solid rgba(0,0,0,0.07) !important;
	border-radius: 0px !important;
}

</style>