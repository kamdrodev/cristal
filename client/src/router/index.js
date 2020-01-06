import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";

import store from "../store/index.js";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { requiresAuth: true}
    },
    {
      path: "/sign-up",
      name: "signup",
      component: SignUp
    },
    {
      path: "/sign-in",
      name: "signin",
      component: SignIn
    },
    
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("Dashboard test")
    try {
      const verifyTokenRequest = await store.dispatch("auth/verifyToken");
      console.log(localStorage.getItem("token"));
      console.log("Good")
      next();
    } catch (e) {
      console.log(e);
      next({
        path: "/sign-in"
      })
    }
  } else {
    next();    
  }
});



export default router;
