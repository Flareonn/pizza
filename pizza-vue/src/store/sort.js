import { SET_SORT, GET_SORT,
  SET_PIZZAS, GET_FILTERED_PIZZAS} from './types'
import fb from 'firebase/app'
import 'firebase/database'

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