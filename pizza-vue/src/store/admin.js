import {
        SET_DB_PIZZA,
        DEL_DB_PIZZA,
        EDIT_DB_PIZZA,
        SET_PIZZAS,
        EDIT_PIZZAS,
        DEL_PIZZAS, } from './types'

export default {
  actions: {
    [SET_DB_PIZZA] ({getters, commit}, {http, constructorPizza: pizza}) {
      http.post('https://my-json-server.typicode.com/Flareonn/pizza/pizzas', pizza)
      .then((response) => {
        console.log(response.status)
        commit(SET_PIZZAS, [...getters.getPizzas, {
          ...pizza,
          id:response.body.id
        }])
      })
    },
    [EDIT_DB_PIZZA] ({getters, commit}, {http, pizza}) {
      http.put('https://my-json-server.typicode.com/Flareonn/pizza/pizzas/' + pizza.id, pizza)
        .then(() => {
          if(!pizza.categories.includes('Все')) pizza.categories.unshift('Все');
          let idx = getters.getPizzas.indexOf(pizza);
          commit(EDIT_PIZZAS, {pizza, idx})
        })
    },
    [DEL_DB_PIZZA] ({getters, commit}, {http, pizza}) {
      http.delete('https://my-json-server.typicode.com/Flareonn/pizza/pizzas/' + pizza.id)
        .then(() => {
          let idx = getters.getPizzas.indexOf(pizza);
          commit(DEL_PIZZAS, idx)
        })
    }
  }
}