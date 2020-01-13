<template lang="html">
  <div>
    
  </div>
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
  // position: absolute;
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