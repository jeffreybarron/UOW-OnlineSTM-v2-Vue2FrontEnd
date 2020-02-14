import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import JSONView from 'vue-json-component';

Vue.use(JSONView);

Vue.config.productionTip = false;

Vue.mixin({});

new Vue({
  el: '#app',
  router,
  store,
  axios,
  render: (h) => h(App)
}).$mount('#app');
