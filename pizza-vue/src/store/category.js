import { SET_CATEGORY, GET_CATEGORY } from './types'

export default {
  state: {
    currentCategory: 'Все',
  },
  getters: {
    [GET_CATEGORY] (state) {
      return state.currentCategory;
    },
  },
  mutations: {
    [SET_CATEGORY] (state, category) {
      state.currentCategory = category;
    },
  }
}