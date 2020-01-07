<template lang="html">
  <vs-row class="menu"  v-if="isAuthenticated">
   
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="sidebar">
      <div id="parentx">
        <vs-icon icon="menu" @click="active=!active, notExpand = true" type="filled" class="menu"></vs-icon>
        <vs-sidebar parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">

          <div class="header-sidebar" slot="header">
           <svg width="100%" height="100%" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
              <g transform="matrix(0.165728,0.165728,-0.165728,0.165728,12.0998,-14.7538)">
                  <path d="M118,78L95.5,142L73,78L95.5,14L118,78Z" style="fill:url(#_Linear1);"/>
              </g>
              <g transform="matrix(-0.165728,0.165728,-0.165728,-0.165728,43.7538,11.0998)">
                  <path d="M118,78L95.5,142L73,78L95.5,14L118,78Z" style="fill:url(#_Linear2);"/>
              </g>
              <g transform="matrix(-0.165728,0.165728,-0.165728,-0.165728,43.7538,11.0998)">
                  <path d="M118,78L95.5,142L73,78L95.5,14L118,78Z" style="fill:url(#_Linear3);"/>
              </g>
              <g transform="matrix(0.234375,0,0,0.234375,-7.38281,-3.88785)">
                  <path d="M118,78L95.5,142L73,78L95.5,14L118,78Z" style="fill:url(#_Linear4);"/>
              </g>
              <g transform="matrix(1.43513e-17,-0.234375,0.234375,1.43513e-17,-3.28125,36.3828)">
                  <path d="M118,78L95.5,142L73,78L95.5,14L118,78Z" style="fill:url(#_Linear5);"/>
              </g>
              <defs>
                  <linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0.991157,-124.981,124.981,0.991157,95.5,142)"><stop offset="0" style="stop-color:rgb(255,137,6);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(255,137,6);stop-opacity:0"/></linearGradient>
                  <linearGradient id="_Linear2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0.991157,-124.981,124.981,0.991157,95.5,142)"><stop offset="0" style="stop-color:rgb(255,137,6);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(255,137,6);stop-opacity:0"/></linearGradient>
                  <linearGradient id="_Linear3" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0.991157,-124.981,124.981,0.991157,95.5,142)"><stop offset="0" style="stop-color:rgb(255,137,6);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(255,137,6);stop-opacity:0"/></linearGradient>
                  <linearGradient id="_Linear4" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0.991157,-124.981,124.981,0.991157,95.5,142)"><stop offset="0" style="stop-color:rgb(239,69,101);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(239,69,101);stop-opacity:0"/></linearGradient>
                  <linearGradient id="_Linear5" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0.991157,-124.981,124.981,0.991157,95.5,142)"><stop offset="0" style="stop-color:rgb(239,69,101);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(239,69,101);stop-opacity:0"/></linearGradient>
              </defs>
          </svg>
          </div>
          <vs-sidebar-item index="1" to="dashboard" icon="question_answer" class="item">
            Dashboard
          </vs-sidebar-item>
          <!-- <vs-divider icon="person" position="left" class="item">
            User
          </vs-divider> -->
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

</template>http://localhost:8080/#

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
    padding: 12px 0px;
    &:hover {
      // background-color: red;
    }
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