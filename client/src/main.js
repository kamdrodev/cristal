import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'

import config from './config.js'

axios.defaults.baseURL = config.urls.api + "/api/";

axios.interceptors.request.use(
 function(config) {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
 },
 function(error) {
  return Promise.reject(error)
 }
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
