import { GET_TOTAL_COUNT, GET_TOTAL_PRICE } from './types'

export default {
  state: {
    totalCount: 0,
    totalPrice: 0
  },
  getters: {
    [GET_TOTAL_COUNT] (state) {
      return state.totalCount;
    },
    [GET_TOTAL_PRICE] (state) {
      return state.totalPrice
    }
  }
}