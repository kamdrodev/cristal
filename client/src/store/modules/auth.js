import axios from "axios";

import router from "../../router/index.js";

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
  async signUp({}, {username, email, password}) {
    console.log(`
      username: ${username},
      password: ${password},
      email: ${email}
    `);
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
      console.log(e);
      throw new Error(e.response.data.message);
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
  async signOut({dispatch, commit}) {
    try {
      localStorage.removeItem("token");
      commit("setToken", null);

      return {
        message: "You have been logged out"
      }
    } catch(e) {
      throw new Error("You have not been logged out")
    }
    
    // router.push("/sign-in");
  },
  async verifyToken({dispatch, commit}) {
    try {
      const verifyTokenRequest = await axios.get(`auth/verify-token`, {
        
      });
      return {
        message: "You are logged in.",
      }

    } catch (e) {
      localStorage.removeItem("token");
      commit("setToken", null);
      throw new Error("Something went wrong during sign in process");

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

