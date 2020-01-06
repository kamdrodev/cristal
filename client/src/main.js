import Vue from "vue";
import Vuesax from "vuesax";
import axios from "axios";


import App from "./App.vue";
import router from "./router";
import store from "./store";

import config from "./config.js";

import "vuesax/dist/vuesax.css";
import "material-icons/iconfont/material-icons.css";

axios.defaults.baseURL = config.urls.api + "/api/";

axios.interceptors.request.use(
 function(config) {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
 },
 function(error) {
  return Promise.reject(error)
 }
)

Vue.use(Vuesax, {});

Vue.prototype.$notificationsColorSuccess = config.notifications.colorSuccess;
Vue.prototype.$notificationsColorError = config.notifications.colorError;

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
