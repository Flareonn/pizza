<template>
  <div id="app" class="body-container">
    <header-site></header-site>
    <router-view></router-view>
    <footer-site></footer-site>
  </div>
</template>

<script>
import styles from './sass/style.sass'

import HeaderSite from './assets/components/Header'
import FooterSite from './assets/components/Footer'
export default {
  name: "app",
  components: {
    HeaderSite,
    FooterSite
  },
};
</script>