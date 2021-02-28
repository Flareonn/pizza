<template>
  <ul class="menu-list menu-categories">
    <li class="menu-list__item menu-item" v-for="category in categories" :key="category">
      <button 
        class="menu-item__button button" 
        :class="{button_dark: currentCategory == category }"
        @click="changeCat(category)"
      >{{category}}</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Categories',
  methods: {
    changeCat(category) {
      this.$store.commit('changeCategory', category)
    }
  },
  computed: {
    currentCategory() {
      return this.$store.getters.getCurrentCategory
    }
  },
  data() {
    return {
      categories: [
        "Все",
        "Мясные",
        "Вегетарианские",
        "Гриль",
        "Острые",
        "Закрытые"
      ],
    }
  },
}
</script>