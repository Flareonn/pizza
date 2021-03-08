import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuelidate from 'vuelidate'
import fb from 'firebase/app'
import "firebase/auth"

import App from './App.vue'
import router from './router'
import store from './store'


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuelidate);
// Vue.http.options.root = "https://my-json-server.typicode.com/Flareonn/pizza"

const configOptions = {
  apiKey: "AIzaSyDvYmO6hYPCxedSI4n_R6UN1xeADRsRIoQ",
  authDomain: "pizzapet-9298b.firebaseapp.com",
  databaseURL: "https://pizzapet-9298b-default-rtdb.firebaseio.com",
  projectId: "pizzapet-9298b",
  storageBucket: "pizzapet-9298b.appspot.com",
  messagingSenderId: "1032971399735",
  appId: "1:1032971399735:web:74fc43d2a75646cf4805b2"
}

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  created () {
    fb.initializeApp(configOptions);
    this.$store.dispatch('autoLogin');
    this.$store.dispatch('loadPizzas', this.$resource('pizzas'))
  }
})