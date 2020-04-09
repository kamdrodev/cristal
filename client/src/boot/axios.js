import Vue from 'vue';
import axios from 'axios';

export default async ({ Vue }) => {
  axios.defaults.baseURL = 'http://localhost:5000/api';
  axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token');

      if (token) config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
  Vue.prototype.$axios = axios;
};
