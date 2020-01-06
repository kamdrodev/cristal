<template lang="html">
  <vs-row class="menu">
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="sidebar">
      <div id="parentx">
        <vs-icon icon="menu" @click="active=!active, notExpand = true" type="filled" class="menu"></vs-icon>
        <!-- <vs-button @click="active=!active, notExpand = false" color="success" type="filled">Open Sidebar Reduce-expand</vs-button>
        <vs-button @click="active=!active, notExpand = true" color="success" type="filled">Open Sidebar Reduce-only</vs-button> -->
        <vs-sidebar :reduce="reduce" :reduce-not-hover-expand="notExpand" parent="body" default-index="1"  color="success" class="sidebarx" spacer v-model="active">

          <div class="header-sidebar" slot="header">
            <vs-avatar  size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>
          </div>
          <vs-sidebar-group open title="Learninx">
            <vs-sidebar-item index="1" icon="menu" @click="reduce=!reduce">
            Toggle Sidebar
            </vs-sidebar-item>
            <vs-sidebar-item index="5" icon="verified_user">
              Configurations
            </vs-sidebar-item>
            <vs-sidebar-group title="Store">
              <vs-sidebar-item index="2.1" icon="store">
                Store
              </vs-sidebar-item>
              <vs-sidebar-item index="2.2" icon="nature_people">
                Nature
              </vs-sidebar-item>
              <vs-sidebar-item index="2.3" icon="style">
                Style
              </vs-sidebar-item>
            </vs-sidebar-group>
            <vs-sidebar-item index="2" icon="gavel">
              History
            </vs-sidebar-item>
            <vs-sidebar-item index="3" icon="https">
              Security
            </vs-sidebar-item>
            <vs-sidebar-item index="4" icon="help">
              Help
            </vs-sidebar-item>
            <vs-sidebar-item to="/sign-up" index="8.1" icon="person">
              Sign Up
            </vs-sidebar-item>
            <vs-sidebar-item to="sign-in" index="8.2" icon="person">
              Sign In
            </vs-sidebar-item>
          </vs-sidebar-group>


          <vs-divider icon="person" position="left">
            User
          </vs-divider>


          <vs-sidebar-item index="6" icon="account_box">
            Profile
          </vs-sidebar-item>

          <div class="footer-sidebar" slot="footer">
            <vs-button icon="settings" color="primary" type="border"></vs-button>
          </div>

        </vs-sidebar>
      </div>
    </vs-col>
  </vs-row>

</template>

<script>
export default {
  data:()=>({
    active:false,
    notExpand: false,
    reduce: false
  })
}
</script>

<style lang="scss">

.menu {
  position: absolute;

  i {
    color: var(--menu-icon-color);
  }
}

#parentx {
  width: 100%;
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