import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import axios from 'axios';
export default new Vuex.Store({
  state: {
    study: ''
  },
  mutations: {},
  actions: {
    loadStudy() {
      axios
        .get('http://localhost:3000/ostm/resources/studies/20200103-jeffbarron-01.json')
        .then((response) => {
          console.log(response);
          this.state.study = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  modules: {}
});
