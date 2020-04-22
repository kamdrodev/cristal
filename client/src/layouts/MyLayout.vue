<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header">
      <q-toolbar class="toolbar">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title class="toolbar">
          <img src="~assets/logo.svg" class="logo"><span class="title">Cristal</span>
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen">
      <q-list>
        <q-item-label header>
          Cristal 
        </q-item-label>
        <q-item
          clickable
          to="/lists"
        >
          <q-item-section avatar>
            <q-icon name="view_quilt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Lists</q-item-label>
            <q-item-label caption>
              All lists
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="signOut"
        >
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sign out</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MyLayout',

  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  methods: {
    async signOut() {
      try {
        const signOutProcess = await this.$store.dispatch('auth/signOut');

        this.$q.notify({ message: signOutProcess.message, color: 'positive' });
      } catch (e) {
        this.$q.notify({ message: e.message, color: 'negative' });
      }
    },
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
};
</script>

<style lang="scss" scoped>
  .header {
    background-color: $dark;
  }
  
  .toolbar {
    display: flex;
    align-items: center;
    .title {
      padding-left: 12px;
    }
  }
  .logo {
    width: 60px;
    animation: roll 3s infinite;
  }
    
  @keyframes roll {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
