import * as types from './mutation-types'

export const mutations = {
  [types.INIT_BOOKS](state, payload) {
    state.books.push(...payload);
  }
  ,
  [types.ADD_ORDERS](state, payload) {
  	state.orders.push(...payload);
  }
}
