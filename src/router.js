import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Statistics from "./views/Statistics";
import PageNotFound from "./views/PageNotFound";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/statistics/:id",
      component: Statistics
    },
    {
      path: "/*",
      component: PageNotFound
    }
  ]
});
