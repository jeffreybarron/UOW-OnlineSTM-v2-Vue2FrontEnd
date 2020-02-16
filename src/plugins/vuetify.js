// src/plugins/vuetify.js

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  iconfont: 'md',
  theme: {
    themes: {
      light: {
        primary: '#0c2340',
        secondary: '#BBDEFB',
        accent: '#03a9f4',
        error: '#f44336',
        warning: '#ff5722',
        info: '#ffc107',
        success: '#4caf50'
      }
    }
  }
});
