import Vue from 'vue'
import Vuex from 'vuex'

import category from './category'
import sort from './sort'
import cart from './cart'
import user from './user'
import shared from './shared'
import admin from './admin'
import storePizza from './pizza'

import { SET_SELECTED_PIZZA,
         DEL_SELECTED_PIZZAS,
         GET_SELECTED_PIZZAS } from './types'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedPizzas: {}
  },
  getters: {
    [GET_SELECTED_PIZZAS] (state) {
      return state.selectedPizzas
    }
  },
  mutations: {
    [SET_SELECTED_PIZZA] (state, payload) {
      state.selectedPizzas[payload.hash] = payload.pizza

      state.cart.totalCount += payload.totalCount;
      state.cart.totalPrice += payload.totalPrice;

      // Если количество = 0 - удалить из хранимого объекта
      if(state.selectedPizzas[payload.hash].count == 0) {
        delete state.selectedPizzas[payload.hash]
      }
    },
    [DEL_SELECTED_PIZZAS] (state) {
      state.selectedPizzas = {};
      state.cart.totalPrice = 0;
      state.cart.totalCount = 0;
    },
  },
  modules: {
    category,
    sort,
    cart,
    user,
    shared,
    admin,
    storePizza
  }
})