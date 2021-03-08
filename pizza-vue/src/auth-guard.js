import store from './store'

export default function (to, from, next) {
  // Искуственная задержка для того, чтобы стейт успел появиться.
  setTimeout(() => {
    if(store.getters.getUser) {
      next()
    } else {
      next('/login?ErrorAuth=true')
    }
  }, 750)
}