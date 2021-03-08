<template>
  <div class="page-404">
    <div class="page-404-content">
      <img src="../../assets/img/404.png" alt="404 image" class="page-404-content__image">
      <div class="page-404-content__wrapper">
        <h2 class="page-404-content__title">Ууупс! <br> Кажется такой страницы нет! 😕</h2>
        <button class="button button_dark" @click="goHome">
          Вернуться назад
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .page-404
    display: flex
    align-items: center
    flex-direction: column
    &-content
      display: flex
      align-items: center
      padding-top: 66px
      &__wrapper
        display: flex
        flex-direction: column
      &__image
        width: 550px
      &__title
        text-align: center
        font-size: 56px
        font-weight: bold
        padding-bottom: 20px
</style>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>