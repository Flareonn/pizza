import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import router from './router'
import store from './store'

Vue.use(VueRouter);

Vue.use(VueResource);

Vue.http.options.root = "http://localhost:3000/"

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

function testWebP(e){var A=new Image;A.onload=A.onerror=function(){e(2==A.height)},A.src="data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"}testWebP((function(e){1==e?document.querySelector("body").classList.add("webp"):document.querySelector("body").classList.add("no-webp")}));