import axios from 'axios';

const state = {
  lists: [],
  list: {},
};

const getters = {
  lists: lists => state.lists,
  list: list => state.list,
};

const mutations = {
  setLists: (state, lists) => {
    state.lists = lists;
  },
  setList: (state, list) => {
    state.list = list;
  }
};

const actions = {
  async getAllLists({dispatch, commit}, {listsQueryOptions}) {
    try {
      const getAllListsRequest = await axios.get('lists', {
        params: {
          'firstLanguage': listsQueryOptions.firstLanguage ? listsQueryOptions.firstLanguage : '',
          'secondLanguage': listsQueryOptions.secondLanguage ? listsQueryOptions.secondLanguage : '',
        }
      });

      commit('setLists', getAllListsRequest.data.lists);

      return {
        message: 'Lists have been fetched'
      }
    } catch(e) {
      console.log(e)
      throw new Error(e.response.data.message);
    }
  },
  async getList({dispatch, commit}, {listId}) {
    try {
      const getListRequest = await axios.get(`lists/${listId}`);
      commit('setList', getListRequest.data.list)
      
      return {
        message: 'List has been fetched'
      }
    } catch(e) {
      console.log(e);
      throw new Error(e.response.data.message);
    }
  },
  async createList({dispatch, commit}, {title, description, firstLanguage, secondLanguage}) {
    try {
      const createListRequest = await axios.post('lists', {
        title,
        description,
        firstLanguage,
        secondLanguage,
      });
      
      return {
        message: 'List has been created'
      }
    } catch(e) {
      console.log(e);
      throw new Error(e.response.data.message);
    }
  },
  async updateList({dispatch, commit}, {listId, title, description}) {
    try {
      const updateListRequest = await axios.put(`lists/${listId}`, {
        title,
        description,
      });

      return {
        message: updateListRequest.data.message
      }
    } catch(e) {
      console.log(e);
      throw new Error(e.response.data.message);
    }
  },
  async deleteList({dispatch, commit}, {listId}) {
    try {
      const deleteListRequest = await axios.delete(`lists/${listId}`);

      return {
        message: 'List has been deleted'
      }
    } catch(e) {
      console.log(e);
      throw new Error(e.response.data.message);
    }
  },
  async createFlashcard({dispatch, commit}, {listId, firstLanguage, secondLanguage}) {
    try {
      const createFlashcardRequest = await axios.post(`lists/${listId}/flashcards`, {
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
  async updateFlashcard({dispatch, commit}, {listId, flashcardId, firstLanguage, secondLanguage}) {
    try {
      const updateFlashcardRequest = await axios.put(`lists/${listId}/flashcards/${flashcardId}`, {
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
  async deleteFlashcard({dispatch, commit}, {listId, flashcardId,}) {
    try {

      const deleteFlashcardRequest = await axios.delete(`lists/${listId}/flashcards/${flashcardId}`);
      
      return {
        message: deleteFlashcardRequest.data.message
      }
    } catch(e) {
      throw new Error(e.response.data.message);
    }
  },
  async saveQuizResult({dispatch, commit}, {listId, accuracy}) {
    try {

      const saveQuizResultRequest = await axios.post(`lists/${listId}/statistics`, {
        accuracy,
      });      
      return {
        message: saveQuizResultRequest.data.message
      }
    } catch(e) {
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

