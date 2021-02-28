import { SET_SORT, GET_SORT } from './types'

export default {
  state: {
    currentSort: {
      order: 'desc',
      item: {
        type: "popularity",
        label:'популярности'
      }
    },
  },
  getters: {
    [GET_SORT] (state) {
      return state.currentSort;
    },
  },
  mutations: {
    [SET_SORT] (state, sortOptions) {
      state.currentSort.order = sortOptions.order === 'desc' ? 'asc' : 'desc';
      state.currentSort.item = sortOptions.item;
    },
  }
}