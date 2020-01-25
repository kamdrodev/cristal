import axios from "axios";

const state = {
  words: [],
}

const getters = {
  words: words => state.words,
}

const mutations = {
  setWords: (state, words) => {
    state.words = words
  }
}

const actions = {
  async createWord({dispatch, commit}, {listId, firstLanguage, secondLanguage}) {
 
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
  async getWords({dispatch, commit}, {listId}) {
    try {
      console.log(listId)
      const getWordsRequest = await axios.get(`words/${listId}`, {
        
      });
      console.log(getWordsRequest.data.words)
      commit('setWords', getWordsRequest.data.words)
      
      return {
        message: "Words  has been fetched"
      }
    } catch(e) {
      console.log(e);
      throw new Error(e.response.data.message);
    }
  },

}


export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}

