<template>
  <footer class="footer" v-show="!getLoading">
    <h5 class="footer__title">
      Благодарность <a target="_blank" href="https://vk.com/archakov_im">Archakov Blog</a> за дизайн & идею
      </h5>
  </footer>
</template>

<script>
export default {
  computed: {
    getLoading() {
      return this.$store.getters.getLoading
    }
  }
}
</script>

<style lang="sass">
  .footer
    padding-top: 65px;
    text-align: center
    &__title a
      color: #fe5f1e
      font-weight: bold
</style>