import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/fellowship",
    name: "Fellowship of the Ring",
    component: () =>
      import(/* webpackChunkName: "fellowship" */ "../fellowship/Fellowship.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;
