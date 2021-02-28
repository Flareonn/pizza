<template>
  <div class="main-grid__item pizzas-card">
    <div class="pizzas-card__image">
      <img :src="pizza.imageUrl" alt="pizza image"/>
    </div>
    <h3 class="pizzas-card__title">{{pizza.name}}</h3>
    <div class="pizzas-settings">
      <div class="pizzas-settings__height">
        <button 
          class="pizzas-settings__button"
          v-for="(type, index) in Object.entries(pizza.types)"
          :key="type[0]"
          :class="{
            active: currentTypeIndex === index,
            disabled: !type[1],
          }"
          @click="currentTypeIndex = index"
        >
          {{type[0]}}
        </button>
      </div>
      <div class="pizzas-settings__width">
        <button 
          class="pizzas-settings__button"
          v-for="(size, index) in Object.entries(pizza.sizes)"
          :key="size[0]"
          :class="{
            active: currentSizeIndex === index,
            disabled: !size[1],
          }"
          @click="currentSizeIndex = index"
        >
          {{size[0]}} см.
        </button>
      </div>
    </div>
    <div class="pizzas-card-wrapper">
      <strong class="pizzas-card__price">от {{pizza.price}} &#8381;</strong>
      <button class="pizzas-card__button button button-active" 
        @click="addPizza(pizza)"
        @contextmenu.prevent="removePizza(pizza)"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
            fill="#EB5A1E"
          />
        </svg>
        Добавить
        <span class="circle" v-show="count" >{{count}}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pizza: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      currentSizeIndex: Object.values(this.pizza.sizes).indexOf(true),
      currentTypeIndex: Object.values(this.pizza.types).indexOf(true),
      count: 0
    }
  },
  methods: {
    addPizza(pizza) {
      let hash = this.createHash;
      let pizzas = this.getSelectedPizzas;
      let constructorPizza = {};
      
      pizzas.hasOwnProperty(hash)      
      ? constructorPizza = {...pizzas[hash], count: pizzas[hash].count += 1}
      : constructorPizza = { name: pizza.name, price: pizza.price, imageUrl: pizza.imageUrl,
                             type: Object.keys(this.pizza.types)[this.currentTypeIndex], size: Object.keys(this.pizza.sizes)[this.currentSizeIndex],
                             categories: pizza.categories, count: 1 }

      this.$store.commit('setPizza', {
        hash,
        pizza: constructorPizza,
        totalCount: 1,
        totalPrice: pizza.price
      })
      this.count += 1;
    },
    removePizza() {
      let hash = this.createHash;
      let pizzas = this.getSelectedPizzas;
      if(pizzas.hasOwnProperty(hash)) {
        this.$store.commit('setPizza', {
          hash: hash,
          pizza: {
            ...pizzas[hash],
            count: pizzas[hash].count -= 1,
          },
          totalCount: -1,
          totalPrice: -pizzas[hash].price
        })
        this.count -= 1;
      }
    }
  },
  computed: {
    createHash() {
      let selectedType = Object.keys(this.pizza.types)[this.currentTypeIndex]
      let selectedCategory = Object.keys(this.pizza.sizes)[this.currentSizeIndex]
      return selectedType + selectedCategory + this.pizza.id
    },
    getSelectedPizzas() {
      return this.$store.getters.getSelectedPizzas;
    },
  },
  created() {
    this.createHash;
  },
  beforeMount() {
    // При изменении Фильтрации / Сортировки - сохранять кол-во выбранных пицц.
    if(this.getSelectedPizzas[this.createHash])
      this.count = this.getSelectedPizzas[this.createHash].count
  }
}
</script>