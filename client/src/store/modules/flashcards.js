import axios from "axios";

const state = {
  flashcards: [],
}

const getters = {
  flashcards: flashcards => state.flashcards,
}

const mutations = {
  setFlashcards: (state, flashcards) => {
    state.flashcards = flashcards
  }
}

const actions = {
  async createFlashcard({dispatch, commit}, {listId, firstLanguage, secondLanguage}) {
 
    try {
      const createFlashcardRequest = await axios.post("flashcards", {
        listId,
        firstLanguage,
        secondLanguage,
      });
      
      return {
        message: "Word  has been created"
      }
    } catch(e) {
      throw new Error(e.response.data.message);
    }
  },
  async getAllFlashcards({dispatch, commit}, {listId}) {
    try {
      const getFlashcardsRequest = await axios.get(`flashcards/${listId}`, {
        
      });
      commit('setFlashcards', getFlashcardsRequest.data.flashcards)
      
      return {
        message: getFlashcardsRequest.data.message,
      }
    } catch(e) {
      throw new Error(e.response.data.message);
    }
  },
  async updateFlashcard({dispatch, commit}, {id, firstLanguage, secondLanguage}) {
    try {
      const updateFlashcardRequest = await axios.put(`flashcards/${id}`, {
          firstLanguage,
          secondLanguage,
      });
      
      return {
        message: updateFlashcardRequest.data.message
      }
    } catch(e) {
      throw new Error(e.response.data.message);
    }
  },
  async deleteFlashcard({dispatch, commit}, {id}) {
    try {

      const updateFlashcardRequest = await axios.delete(`flashcards/${id}`);
      
      return {
        message: updateFlashcardRequest.data.message
      }
    } catch(e) {
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

