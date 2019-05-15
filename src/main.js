import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue';

import jQuery from 'jquery';
import 'popper.js';
import 'bootstrap';
import axios from 'axios'

import {  routes  } from './router';

window.$ = jQuery;

Vue.use(VueRouter);

axios.defaults.baseURL = 'http://slimapi' 
//axios.defaults.headers.get['Accepts'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const router =  new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
