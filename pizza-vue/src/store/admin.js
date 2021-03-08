import {
        SET_DB_PIZZA,
        DEL_DB_PIZZA,
        EDIT_DB_PIZZA,
        SET_PIZZAS,
        EDIT_PIZZAS,
        DEL_PIZZAS, } from './types'

import fb from 'firebase/app'
import 'firebase/database'

export default {
  actions: {
    [SET_DB_PIZZA] ({getters, commit}, {constructorPizza: pizza}) {
      commit('setLoading', true);
      fb.database().ref('/pizzas/').push(pizza)
        .then(({key}) => {
          commit(SET_PIZZAS, [...getters.getPizzas, {
            ...pizza,
            id: key
          }])
        })
        .catch((error) => commit('setError', error.message))
        .finally(() => commit('setLoading', false))
    },
    [EDIT_DB_PIZZA] ({getters, commit}, pizza) {
      // edit in global storage
      fb.database().ref('/pizzas/' + pizza.id).set(pizza)
        .then(() => {
          if(!pizza.categories.includes('Все')) pizza.categories.push('Все');
          let idx = getters.getPizzas.indexOf(pizza);
          commit(EDIT_PIZZAS, {pizza, idx}); // edit in local storage
        })
    },
    [DEL_DB_PIZZA] ({getters, commit}, pizza) {
      // delete from global storage
      fb.database().ref('/pizzas/' + pizza.id).remove()
        .then(() => {
          let idx = getters.getPizzas.indexOf(pizza);
          commit(DEL_PIZZAS, idx); // delete from local storage
        })
    }
  }
}