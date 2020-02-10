import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth.js'
import router from './modules/router.js'
import lists from './modules/lists.js'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const store = new Vuex.Store({
  modules: {
    auth,
    router,
    lists,
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})

export default store
