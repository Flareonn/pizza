<template>  
  <div class="cart-body__card cart-card">
    <div class="cart-card__info">
      <!-- prettier-ignore -->
      <img :src="pizza.imageUrl" alt="pizza image" class="cart-card__image">
      <div class="cart-card-description">
        <h4 class="cart-card-description__title">{{pizza.name}}</h4>
        <span class="cart-card-description__characters">
          {{pizza.type}} тесто, {{pizza.size}} см.
        </span>
      </div>
    </div>
    <div class="cart-card__counter">
      <button class="button-circle" @click="toggleCount(-1, -pizza.price)">-</button>
      <b>{{pizza.count}}</b>
      <button class="button-circle" @click="toggleCount(1, pizza.price)">+</button>
    </div>
    <div class="cart-card__price">
      <strong><span>{{pizza.count * pizza.price}}</span> &#8381;</strong>
    </div>
    <div class="cart-card__actions" @click="fullRemovePizza">
      <button class="button-circle button-circle_dark">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    pizza: {
      type: Object,
      required: true
    },
    hash: {
      type: String,
      required: true
    }
  },
  methods: {
    toggleCount(count, price) {
      this.$store.commit('setPizza', {
        hash: this.hash,
        pizza: {
          ...this.pizza,
          count: this.pizza.count += count
        },
        totalCount: count,
        totalPrice: price
      })
    },
    fullRemovePizza() {
      this.$store.commit('setPizza', {
        hash: this.hash,
        pizza: {
          ...this.pizza,
          count: 0,
        },
        totalCount: -this.pizza.count,
        totalPrice: -(this.pizza.price * this.pizza.count)
      })
    }
  }
}
</script>