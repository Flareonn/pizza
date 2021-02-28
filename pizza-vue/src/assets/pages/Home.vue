<template>
  <div>
    <header-site></header-site>
      <menu-site></menu-site>
      <main class="main">
        <h2 class="main__title">{{selectedCategory}} пиццы</h2>
        <div class="main-grid pizzas">
          <card-pizza 
            v-for="pizza in getAllPizzas" 
            :key="pizza.id"
            :pizza="pizza"
          ></card-pizza>
        </div>
      </main>
  </div>
</template>

<script>
import HeaderSite from '../components/Header'
import CardPizza from '../components/CardPizza'
import MenuSite from '../components/Menu/Menu'
export default {
  name: 'HomePage',
  components: { HeaderSite, CardPizza, MenuSite },
  computed: {
    getAllPizzas() {
      return this.$store.getters.filterPizzas
    },
    selectedCategory() {
      return this.$store.getters.getCurrentCategory
    }
  },
  created() {
    this.$store.dispatch('getPizzas', this.$resource('pizzas'))
  },
}
</script>