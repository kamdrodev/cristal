import axios from "axios";

const state = {
 
};

const getters = {

};

const mutations = {
  
};

const actions = {
  async createWord({dispatch, commit}, {listId, firstLanguage, secondLanguage}) {
    console.log(listId)
    console.log(firstLanguage)
    console.log(secondLanguage)
    try {
      const createWordRequest = await axios.post("words", {
        listId,
        firstLanguage,
        secondLanguage,
      });
      
      return {
        message: "Word  has been created"
      }
    } catch(e) {
      console.log(e);
      throw new Error(e.response.data.message);
    }
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};

