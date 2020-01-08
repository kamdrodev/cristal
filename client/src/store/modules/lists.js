import axios from "axios";

const state = {
  
};

const getters = {
};

const mutations = {
  
};

const actions = {
  async createList({dispatch, commit}, {title, description, firstLanguage, secondLanguage}) {
    try {
      const createListRequest = await axios.post("lists", {
        title,
        description,
        firstLanguage,
        secondLanguage,
      });
      return {
        message: "Your account has been created"
      }
    } catch(e) {
      console.log(e);
      throw new Error(e.response.data.message);
    }
  }
};


export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};

