import { GET_PIZZAS,
         SET_FILTERS_PIZZAS,
         SET_SORTING_PIZZAS,
         SET_PIZZAS,
         EDIT_PIZZAS,
         DEL_PIZZAS,
         LOAD_PIZZAS } from '../types'

import fb from 'firebase/app'
import 'firebase/database'

export default {
  state: {
    pizzas: [],
    filterPizzas: [],
  },
  actions: {
    [LOAD_PIZZAS] ({commit}) {
      commit('setLoading', true)
      let pizzas = [];
      fb.database().ref('/pizzas').once('value', (snap) => {
        snap.forEach(child => {
          let item = child.val();
          item.id = child.key
          pizzas.push(item)
        })
      }).then(() => {
        commit(SET_PIZZAS, pizzas);
        })
        .catch((error) => {
          commit('setError', error.message)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    [SET_FILTERS_PIZZAS] ({getters, commit, dispatch}) {
      commit('setFilteredPizzas', getters[GET_PIZZAS].filter(item => {
        return item.categories.includes(getters.getCurrentCategory);
      }))
      dispatch(SET_SORTING_PIZZAS, false); // Сохранение типа сортировки
    },
    [SET_SORTING_PIZZAS] ({getters, commit}, isNeedUpdate = true) {
      let pizzas = getters.getFilteredPizzas; // Сортировка на основе уже имеющегося массива
      let currentSort = getters.getCurrentSort;

      switch(currentSort.item.type) {
        case "popularity":
          pizzas.sort(sortByPopularity);
          break;
        case "price":
          pizzas.sort(sortByPrice);
          break;
        case "name":
          pizzas.sort(sortByName);
          break;
      }
      currentSort.order === "desc" ? pizzas.reverse() : null
      isNeedUpdate ? commit('setFilteredPizzas', pizzas) : null
    }
  },
  mutations: {    
    [SET_PIZZAS] (state, pizzas) {
      state.pizzas = pizzas;
      state.filterPizzas = pizzas;
    },
    [EDIT_PIZZAS] (state, {idx, pizza}) {
      state.pizzas[idx] = pizza
    },
    [DEL_PIZZAS] (state, idx) {
      state.pizzas.splice(idx, 1);
    },
    setFilteredPizzas (state, pizzas) {
      state.filterPizzas = pizzas;
    }
  },
  getters: {
    [GET_PIZZAS] (state) {
      return state.pizzas;
    },
    getFilteredPizzas (state) {
      return state.filterPizzas
    }
  }
}

const sortByPrice = (prev, next) => {
  return prev.price - next.price
}
const sortByPopularity = (prev, next) => {
  return prev.popularity - next.popularity
}
const sortByName = (prev, next) => {
  if(prev.name < next.name) return -1;
  if(prev.name < next.name) return 1;
}