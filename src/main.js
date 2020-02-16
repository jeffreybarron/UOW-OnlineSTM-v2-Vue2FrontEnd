import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import JSONView from 'vue-json-component';
import vuetify from './plugins/vuetify';

Vue.use(JSONView);

Vue.config.productionTip = false;

Vue.mixin({});

new Vue({
  el: '#app',
  router,
  store,
  axios,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
