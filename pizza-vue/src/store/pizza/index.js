import { GET_PIZZAS,
         GET_FILTERED_PIZZAS,
         SET_PIZZAS,
         EDIT_PIZZAS,
         DEL_PIZZAS,
         LOAD_PIZZAS } from '../types'

export default {
  state: {
    pizzas: [],
  },
  actions: {
    [LOAD_PIZZAS] ({getters, commit}, resource) {
      commit('setLoading', true)
      let currentSort = getters.getCurrentSort
      resource.get({
        _sort: currentSort.item.type,
        _order: currentSort.order
      })
      .then(response => response.json())
      .then(pizzas => commit(SET_PIZZAS, pizzas))
      .catch((error) => {
        commit('setError', error.message)
      })
      .finally(() => {
        commit('setLoading', false)
      })
    }
  },
  mutations: {    
    [SET_PIZZAS] (state, pizzas) {
      state.pizzas = pizzas;
    },
    [EDIT_PIZZAS] (state, {idx, pizza}) {
      state.pizzas[idx] = pizza
    },
    [DEL_PIZZAS] (state, idx) {
      state.pizzas.splice(idx, 1);
    },
  },
  getters: {
    [GET_PIZZAS] (state) {
      return state.pizzas;
    },
    [GET_FILTERED_PIZZAS] (state, getters) {
      return state.pizzas.filter(item => {
        return item.categories.includes(getters.getCurrentCategory);
      })
    },
  }
}