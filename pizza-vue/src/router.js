import VueRouter from 'vue-router'
import Home from './assets/pages/Home.vue';

// Lazy loading
const Cart = resolve => {
  require.ensure(['./assets/pages/Cart.vue'], () => {
    resolve(
      require('./assets/pages/Cart.vue')
    )
  })
}

const page404 = resolve => {
  require.ensure(['./assets/pages/404.vue'], () => {
    resolve(
      require('./assets/pages/404.vue')
    )
  })
}


export default new VueRouter({
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '*',
      component: page404
    }
  ],
  mode: 'history'  
})