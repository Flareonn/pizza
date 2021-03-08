<template>
  <header class="header">
    <router-link to="/" class="header-logo">
      <picture
        ><source srcset="../img/logo.svg" type="image/webp"/>
        <img src="../img/logo.svg" alt="logo" class="header-logo__image"
      /></picture>
      <div class="header-logo__wrapper">
        <h1>Vue pizza!</h1>
        <h2>Самая вкуснейшая пицца во вселенной</h2>
      </div>
    </router-link>
    <div class="header-actions-group">
      <div 
        class="button button_dark header-auth" 
        :class="{closed: !isOpenAuthMenu}"
        @click='isOpenAuthMenu = !isOpenAuthMenu'
        v-show="isAuthPage"
      >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#fff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <div class="header-auth-group" v-show="isOpenAuthMenu">
            <div class="header-auth-group__wrapper" v-if="checkAuth">
              <router-link to="/admin" class="header-auth__link">{{getUser.email}}</router-link>
              <a class="header-auth__link" @click.stop="onLogout">Выйти</a>
            </div>
            <div class="header-auth-group__wrapper" v-else>
              <router-link to="/register" class="header-auth__link">Регистрация</router-link>
              <router-link to="/login" class="header-auth__link">Войти</router-link>
            </div>
          </div>
      </div>
      <router-link to="cart" class="header-cart" v-show="$route.path == '/'">
        <button class="button-active button header-cart__button">
          <span>{{getPrice}} &#8381;</span>
          <span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{getCount}}
          </span>
        </button>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      isOpenAuthMenu: false,
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logoutUser')
      if(this.$route.path !== '/')
        this.$router.push('/');
    },
  },
  computed: {
    checkAuth() {
      return this.getUser ? true : false;
    },
    isAuthPage() {
      return !(this.$route.path == '/login' || this.$route.path == '/register')
    },
    getCount() {
      return this.$store.getters.getTotalCount
    },
    getPrice() {
      return this.$store.getters.getTotalPrice
    },
    getUser() {
      if(!this.$store.getters.getUser) return ''
      return this.$store.getters.getUser
    },
    getLoading() {
      return this.$store.getters.getLoading
    }
  },
  created() {
    this.checkAuth
  }
}
</script>