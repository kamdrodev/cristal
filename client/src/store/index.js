import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth.js";
import lists from "./modules/lists.js";
import words from "./modules/words.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    lists,
    words,
  }
});
