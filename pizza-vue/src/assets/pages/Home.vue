<template>
  <div>
    <menu-site></menu-site>
    <main class="main">
      <h2 class="main__title" v-if="!getLoading">{{selectedCategory}} пиццы</h2>
      <h2 class="main__title" v-else>Готовим пиццу...</h2>
      <div class="main-grid pizzas">
        <card-pizza 
          v-for="pizza in getPizzas" 
          :key="pizza.id"
          :pizza="pizza"
        ></card-pizza>
      </div>
    </main>
  </div>
</template>

<script>
import CardPizza from '../components/CardPizza'
import MenuSite from '../components/Menu/Menu'
export default {
  name: 'HomePage',
  components: { CardPizza, MenuSite },
  computed: {
    getPizzas() {
      return this.$store.getters.getFilteredPizzas
    },
    selectedCategory() {
      return this.$store.getters.getCurrentCategory
    },
    getLoading() {
      return this.$store.getters.getLoading
    }
  }
}
</script>