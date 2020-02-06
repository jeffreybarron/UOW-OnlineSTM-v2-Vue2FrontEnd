import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ostmBegin from '../views/ostmBegin.vue';
import ostmConsent from '../views/ostmConsent.vue';
import ostmInstructions from '../views/ostmInstructions.vue';
import ostmStudy from '../views/ostmStudy.vue';
import ostmCompletion from '../views/ostmCompletion.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/ostm/begin',
    name: 'ostm-begin',
    component: ostmBegin
  },
  {
    path: '/ostm/consent',
    // name: 'consent',
    component: ostmConsent
  },
  {
    path: '/ostm/instructions',
    name: 'ostm-instructions',
    component: ostmInstructions
  },
  {
    path: '/ostm/study',
    name: 'ostm-study',
    component: ostmStudy
  },
  {
    path: '/ostm/completion',
    name: 'ostm-completion',
    component: ostmCompletion
  },
  {
    path: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
