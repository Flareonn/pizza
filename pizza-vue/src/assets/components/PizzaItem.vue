<template>  
  <div class="pizzas-list__item">
    <div class="pizzas-item-group">
      <img :src="pizza.imageUrl" alt="pizza image" v-show="!isEdit">
      <input v-model="pizza.imageUrl" v-show="isEdit" @keyup.enter="changePizza(pizza.id)" type="text" class="builder-form__input" placeholder="Например: https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/65f40f94-8181-4042-ae2c-10cd31c0a178.jpg">
    </div>
    <div class="pizzas-item-group">
      <h4 v-show="!isEdit">"{{pizza.name}}"</h4>
      <input v-model="pizza.name" v-show="isEdit" @keyup.enter="changePizza(pizza.id)" type="text" class="builder-form__input" placeholder="Например: Сырная">
    </div>
    <div class="pizzas-item-group">
      <h4 v-show="!isEdit">{{pizza.price}} &#8381;</h4>
      <input v-model.number="pizza.price" v-show="isEdit" @keyup.enter="changePizza(pizza.id)" step="10" type="number" class="builder-form__input">
    </div>
    <div class="pizzas-item-group">
      <ul v-show="!isEdit">
        <li v-for="(type, i) in Object.entries(pizza.types)" :key="i" v-show="type[1]">{{type[0]}}</li>
      </ul>
      <div v-show="isEdit">
        <label 
          v-for="(type, i) in Object.entries(pizza.types)" 
          :class="{active: type[1]}" 
          :key="i" 
          :for="type[0] + pizza.id" 
          class="builder-form__checkbox-label"
        >
          {{type[0]}}
          <input type="checkbox" v-model="pizza.types[type[0]]" class="builder-form__input" :id='type[0] + pizza.id'>
        </label>
      </div>
    </div>
    <div class="pizzas-item-group">
      <ul v-show="!isEdit">
        <li v-for="(size, i) in Object.entries(pizza.sizes)" :key="i" v-show="size[1]">{{size[0]}}</li>
      </ul>
      <div v-show="isEdit">
        <label 
          v-for="(size, i) in Object.entries(pizza.sizes)" 
          :class="{active: size[1]}" 
          :key="i" 
          :for="size[0] + pizza.id" 
          class="builder-form__checkbox-label"
        >
          {{size[0]}}
          <input type="checkbox" v-model="pizza.sizes[size[0]]" class="builder-form__input" :id='size[0] + pizza.id'>
        </label>
      </div>
    </div>
    <div class="pizzas-item-group">
      <ul v-show="!isEdit">
        <li v-for="cat in pizza.categories" :key="cat">{{cat}}</li>
      </ul>
      <select multiple v-model="pizza.categories" v-show="isEdit">
        <option v-for="item in cats"  :key="item">{{item}}</option>
      </select>
    </div>
    <div class="pizzas-item-group">
      <h4 v-show="!isEdit">{{pizza.popularity}}</h4>
      <input id="popularity" v-show="isEdit" v-model.number="pizza.popularity" type="number" class="builder-form__input">
    </div>
    <div class="pizzas-item-group pizzas-item-group__actions">
      <button @click="deletePizza()" class="button-circle button-circle_dark">+</button>
      <button @click="changePizza()" :class="{active: isEdit}" class="button-circle button-circle_dark" style="transform: rotate(0deg)">
        <svg height="16px" viewBox="-15 -15 484.00019 484" width="16px" xmlns="http://www.w3.org/2000/svg">
          <path fill="#D3D3D3" d="m401.648438 18.234375c-24.394532-24.351563-63.898438-24.351563-88.292969 0l-22.101563 22.222656-235.269531 235.144531-.5.503907c-.121094.121093-.121094.25-.25.25-.25.375-.625.746093-.871094 1.121093 0 .125-.128906.125-.128906.25-.25.375-.371094.625-.625 1-.121094.125-.121094.246094-.246094.375-.125.375-.25.625-.378906 1 0 .121094-.121094.121094-.121094.25l-52.199219 156.96875c-1.53125 4.46875-.367187 9.417969 2.996094 12.734376 2.363282 2.332031 5.550782 3.636718 8.867188 3.625 1.355468-.023438 2.699218-.234376 3.996094-.625l156.847656-52.324219c.121094 0 .121094 0 .25-.121094.394531-.117187.773437-.285156 1.121094-.503906.097656-.011719.183593-.054688.253906-.121094.371094-.25.871094-.503906 1.246094-.753906.371093-.246094.75-.621094 1.125-.871094.125-.128906.246093-.128906.246093-.25.128907-.125.378907-.246094.503907-.5l257.371093-257.371094c24.351563-24.394531 24.351563-63.898437 0-88.289062zm-232.273438 353.148437-86.914062-86.910156 217.535156-217.535156 86.914062 86.910156zm-99.15625-63.808593 75.929688 75.925781-114.015626 37.960938zm347.664062-184.820313-13.238281 13.363282-86.917969-86.917969 13.367188-13.359375c14.621094-14.609375 38.320312-14.609375 52.945312 0l33.964844 33.964844c14.511719 14.6875 14.457032 38.332031-.121094 52.949218zm0 0"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PizzaItem',
  props: {
    pizza: {
      type: Object
    }
  },
  data () {
    return {
      isEdit: false,
      cats: [
        "Мясные",
        "Вегетарианские",
        "Гриль",
        "Острые",
        "Закрытые"
      ],
    }
  },
  methods: {
    toggleEditMenu() {
      this.isEdit = !this.isEdit
    },
    changePizza(){
      if(!this.isEdit) {
        this.toggleEditMenu();
        return
      }        
      this.$store.dispatch('editDbPizza', this.pizza)
      .finally(() => this.toggleEditMenu())

    },
    deletePizza() {
      let isSure
      if(this.isEdit) {
        isSure = confirm('Вы хотите отменить изменения?')
        if(!isSure) return
        this.toggleEditMenu();
        return;
      }
      isSure = confirm('Вы уверены, что хотите удалить этот элемент из БД?\nВосстановить его будет невозможно\nУверены?')
      if(!isSure) return
      this.$store.dispatch('delDbPizza', this.pizza);
    }
  },
  computed: {
    pizzas() {
      return this.$store.getters.getPizzas
    }
  }
}
</script>

<style>

</style>