import axios from "axios";

const state = {
  lists: [],
};

const getters = {
  lists: lists => state.lists,
};

const mutations = {
  setLists: (state, lists) => {
    state.lists = lists;
  }
};

const actions = {

  async getAllLists({dispatch, commit}) {
    try {
      const createListRequest = await axios.get("lists");

      // console.log(createListRequest.data.lists)

      commit("setLists", createListRequest.data.lists);

      return {
        message: "Lists have been fetched"
      }
    } catch(e) {
      console.log(e);
      throw new Error(e.response.data.message);
    }
  },
  async createList({dispatch, commit}, {title, description, firstLanguage, secondLanguage}) {
    try {
      const createListRequest = await axios.post("lists", {
        title,
        description,
        firstLanguage,
        secondLanguage,
      });

      dispatch("getAllLists");
      
      return {
        message: "List has been created"
      }
    } catch(e) {
      console.log(e);
      throw new Error(e.response.data.message);
    }
  },
  async updateList({dispatch, commit}, {id, title, description}) {
    try {
      const updateListRequest = await axios.put(`lists/${id}`, {
        title,
        description,
      });

      dispatch("getAllLists");
      
      return {
        message: updateListRequest.data.message
      }
    } catch(e) {
      console.log(e);
      throw new Error(e.response.data.message);
    }
  },
  async deleteList({dispatch, commit}, {id}) {
    try {
      console.log(id)
      const deleteListRequest = await axios.delete(`lists/${id}`);

      dispatch("getAllLists");

      return {
        message: "List has been deleted"
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

