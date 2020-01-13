<template>
  <div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          @click=""
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader class="mt-3 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
        <v-list>
          <v-list-item
            v-for="item in items2"
            :key="item.text"
            @click=""
          >
            <v-list-item-avatar>
              <img
                :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
                alt=""
              >
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list-item
          class="mt-3"
          @click=""
        >
          <v-list-item-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Browse Channels</v-list-item-title>
        </v-list-item>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="red"
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Youtube</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout
        row
        align-center
        style="max-width: 650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
        ></v-text-field>
      </v-layout>
    </v-app-bar>

    <v-content>
      <v-container fill-height>
        <v-layout
          justify-center
          align-center
        >
          <v-flex shrink>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  href="https://codepen.io/johnjleider/pen/aezMOO"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-codepen</v-icon>
                </v-btn>
              </template>
              <span>Codepen</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>

import Menu from "./components/Menu.vue";

export default {
  name: "home",
  components: {
    Menu
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  }
};
</script>

<style lang="scss">

:root {
  --background-color: #0f0e17;
  --color: #fffffe;
  --headline: #fffffe;
  --link-color: #ff8906;
  --button-background-color: #ff8906;
  --validation-error-color: #EF4565;

  --menu-icon-color: #fffffe;

  --sidebar-title-color: #ff8906;
  --sidebar-background-color: #0f0e17;
  --sidebar-item-color: #fffffe;
  --sidebar-item-color-active: #ff8906;


  --panel-lists-background-color: #0f0e17;
  --panel-lists-button-background-color: #ff8906;

  --card-list-background-color: #0f0e17;
  --card-list-color: #fffffe;
  --card-list-icon-background-color: #0f0e17;

  --popup-title-color: #fffffe;
  --popup-background-color:#0f0e17;
  --popup-icon-background-color: #0f0e17;
  --popup-icon-color: #fffffe;
  --popup-button-background-color: #ff8906;
  --popup-label-color: #fffffe;

  --collapse-header-color: #ff8906;
  --collapse-content-color: #fffffe;
  --collapse-background-color: #0f0e17;
  --collapse-icon-color: #ff8906;


  --collapse-header-title-color: #ff8906;
  --collapse-header-icon-color: #fffffe;
  --collapse-header-languages-color: #fffffe;
 

  --breakpoint-tablet: 900px;
  --breakpoint-mobile: 600px;

  --scrolbar: red !important;
  --scrollbar-track-background-color: #0f0e17;
  --scrollbar-background-color: #ff8906;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: var(--background-color);
  // color: var(--color);
}

body::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: var(--scrollbar-track-background-color);
}

body::-webkit-scrollbar
{
  width: 10px;
  background-color: blue !important;
}

body::-webkit-scrollbar-thumb
{
  background-color: var(--scrollbar-background-color) !important;
}

button {
  background-color: red;
}

$breakpoint-tablet: 900px;
$breakpoint-mobile: 600px;

.container {
  width: 1000px;
  @media all and (max-width: $breakpoint-tablet) {
    width: 100%;
  }
}



</style>


