import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import store from '../store/index.js';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const Router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,

  // Leave these as they are and change in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
});

Router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      const verifyTokenRequest = await store.dispatch('auth/verifyToken');
      next();
    } catch (e) {
      next({
        path: '/sign-in',
      });
    }
  } else {
    next();
  }
});

export default Router;
