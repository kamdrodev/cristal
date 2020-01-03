import axios from "axios";

const state = {
  token: localStorage.getItem("token") || null,
  status: ''
};

const getters = {
  isAuthenticated: state => !!state.token,
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
};

const actions = {
  async signUp({}, {username, email, pasword}) {
    try {
      const signUpRequest = await axios.post("auth/sign-up", {
        username,
        email,
        password,
      });
      return {
        message: "Your account has been created"
      }
    } catch(e) {
      throw new Error("Something went wrong during sign up process");
    }
  },
  signIn: async function({commit}, {email, password}) {
    try {
      const signInRequest = await axios.post("auth/sign-in", {
        email,
        password,
      });
      
      localStorage.setItem("token", signInRequest.data.token);
      commit("setToken", signInRequest.data.token);
      return {
        message: "You are logged in"
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

