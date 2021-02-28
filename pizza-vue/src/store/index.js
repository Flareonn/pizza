import Vue from 'vue'
import Vuex from 'vuex'
import category from './category'
import sort from './sort'
import cart from './cart'
import { SET_PIZZA, DEL_PIZZAS, GET_PIZZAS, FILTERED_PIZZAS, LOAD_PIZZAS } from './types'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pizzas: [],
    selectedPizzas: {}
  },
  actions: {
    [LOAD_PIZZAS] ({getters, state}, resource) {
      let currentSort = getters.getCurrentSort
      resource.get({
        _sort: currentSort.item.type,
        _order: currentSort.order
      })
      .then(response => response.json())
      .then(pizzas => state.pizzas = pizzas)
    }
  },
  getters: {
    [FILTERED_PIZZAS] (state) {
      return state.pizzas.filter(item => {
        return item.categories.includes(state.category.currentCategory);
      })
    },
    [GET_PIZZAS] (state) {
      return state.selectedPizzas
    }
  },
  mutations: {
    [SET_PIZZA] (state, payload) {
      state.selectedPizzas[payload.hash] = payload.pizza

      state.cart.totalCount += payload.totalCount;
      state.cart.totalPrice += payload.totalPrice;

      // Если количество = 0 - удалить из хранимого объекта
      if(state.selectedPizzas[payload.hash].count == 0) {
        delete state.selectedPizzas[payload.hash]
      }
    },
    [DEL_PIZZAS] (state) {
      state.selectedPizzas = {};
      state.cart.totalPrice = 0;
      state.cart.totalCount = 0;
    },
  },
  modules: {
    category,
    sort,
    cart,
  }
})