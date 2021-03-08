import VueRouter from 'vue-router'
import authguard from './auth-guard'
import Home from './assets/pages/Home.vue';

// Lazy loading
const Cart = resolve => {
  require.ensure(['./assets/pages/Cart.vue'], () => {
    resolve(
      require('./assets/pages/Cart.vue')
    )
  })
}

const Page404 = resolve => {
  require.ensure(['./assets/pages/404.vue'], () => {
    resolve(
      require('./assets/pages/404.vue')
    )
  })
}

const Admin = resolve => {
  require.ensure(['./assets/pages/Admin.vue'], () => {
    resolve(
      require('./assets/pages/Admin.vue')
    )
  })
}

const Login = resolve => [
  require.ensure(['./assets/pages/Auth/Login.vue'], () => {
    resolve(
      require('./assets/pages/Auth/Login.vue')
    )
  })
]

const Register = resolve => [
  require.ensure(['./assets/pages/Auth/Register.vue'], () => {
    resolve(
      require('./assets/pages/Auth/Register.vue')
    )
  })
]

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home'
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/admin',
      component: Admin,
      beforeEnter: authguard
    },
    {
      path: '*',
      component: Page404
    }
  ],
  mode: 'history',
})