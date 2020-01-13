<template>
  <v-app id="sandbox">
   
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      expand-on-hover
      app
      overflow
      v-if="isAuthenticated"
    >
      
      <template v-slot:prepend>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
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
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item
            link
            two-line
          >
            <v-list-item-content>
              <v-list-item-title class="title">Sandra Adams</v-list-item-title>
              <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </template>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Files</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Shared with me</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Starred</v-list-item-title>
        </v-list-item>
      </v-list>
 
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
      v-if="isAuthenticated"
    >
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />
      <v-toolbar-title>Vuetify</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-switch
        v-model="$vuetify.theme.dark"
        primary
        label="Change theme"
        hide-details
      />
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
        
   

    <v-footer
      :inset="footer.inset"
      app
      v-if="isAuthenticated"
    >
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

import Vue from 'vue';
import vuetify from 'vuetify';


Vue.use(vuetify);

export default {
  name: 'App',
  created() {
    $vuetify.theme.dark = true;
  },
  components: {
    
  },
  data: () => ({
    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    primaryDrawer: {
      model: null,
      type: 'default (no property)',
      clipped: true,
      floating: false,
      mini: true,
    },
    footer: {
      inset: true,
    },
  }),
  computed: {
    isAuthenticated() {
      // return this.$store.getters['auth/token'];
      return true;
    }
  }
};
</script>


<style lang='scss'>
  html { 
    overflow-y: auto !important; 
  }
</style>