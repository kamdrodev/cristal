import axios from 'axios'

const state = {
  token: localStorage.getItem('token') || null,
  status: ''
}

const getters = {
  isAuthenticated: state => !!state.token,
}

const mutations = {
  setToken: (state, token) => {
    state.token = token
  }
}

const actions = {
  async signUp({}, {username, email, password}) {
    console.log(username, email, password)
    try {
      const signUpRequest = await axios.post('auth/sign-up', {
        username,
        email,
        password,
      })
      dispatch('router/routerPush', {path: '/sign-up'}, {root: true})
      return {
        message: 'Your account has been created'
      }
    } catch(e) {
      throw new Error(e.response.data.message)
    }
  },
  signIn: async function({dispatch, commit}, {email, password}) {
    try {
      const signInRequest = await axios.post('auth/sign-in', {
        email,
        password,
      })
      
      localStorage.setItem('token', signInRequest.data.token)
      commit('setToken', signInRequest.data.token)
      dispatch('router/routerPush', {path: '/lists'}, {root: true})
      return {
        message: 'You are logged in'
      }
    } catch(e) {
      console.log(e);
      throw new Error(e.response.data.message)
    }
  },
  async signOut({dispatch, commit}) {
    try {
      localStorage.removeItem('token')
      commit('setToken', null)
      return {
        message: 'You have been logged out'
      }
    } catch(e) {
      throw new Error('You have not been logged out')
    }
    
  },
  async verifyToken({dispatch, commit}) {
    try {
      const verifyTokenRequest = await axios.get(`auth/verify-token`, {
        
      })
      return {
        message: 'You are logged in.',
      }

    } catch (e) {
      localStorage.removeItem('token')
      commit('setToken', null)
      throw new Error('Something went wrong during sign in process')

    }
  }
}


export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
