import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Recommendation from "@/views/Recommendation.vue";
import Finalize from "@/views/Finalize.vue";
import Complete from "@/views/Complete.vue";
import Curriculum from "@/views/Curriculum.vue";
import Progress from "@/views/Progress.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/progress",
    name: "Progress",
    component: Progress
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/recommendation",
    name: "Recommendation",
    component: Recommendation
  },
  {
    path: "/finalize",
    name: "Finalize",
    component: Finalize
  },
  {
    path: "/complete",
    name: "Complete",
    component: Complete
  },
  {
    path: "/curriculum",
    name: "Curriculum",
    component: Curriculum
  },
  {
    path: "/about",
    name: "about"
  }
];

const router = new VueRouter({
  routes
});

export default router;
