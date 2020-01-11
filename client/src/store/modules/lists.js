import axios from "axios";

const state = {
  lists: [],
  list: {},
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

  async getAllLists({dispatch, commit}, {listsQueryOptions}) {
    try {

      console.log(`vuex`, listsQueryOptions)
      const createListRequest = await axios.get("lists", {
        params: {
          "secondLanguage": listsQueryOptions.secondLanguage ? listsQueryOptions.secondLanguage : "",
        }
      });

      commit("setLists", createListRequest.data.lists);

      return {
        message: "Lists have been fetched"
      }
    } catch(e) {
      console.log(e);
      throw new Error(e.response.data.message);
    }
  },
  async getList({dispatch, commit}, {id}) {
    console.log("getList");
  },
  async createList({dispatch, commit}, {title, description, firstLanguage, secondLanguage}) {
    try {
      const createListRequest = await axios.post("lists", {
        title,
        description,
        firstLanguage,
        secondLanguage,
      });
      
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

      const deleteListRequest = await axios.delete(`lists/${id}`);

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

