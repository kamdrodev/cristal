import axios from 'axios';
import router from '../../router/index.js';

const state = {};
const getters = {};
const mutations = {};
const actions = {
  async routerPush({}, { path }) {
    router.push({ path });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
