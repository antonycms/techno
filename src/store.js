import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    carrinho: window.localStorage.CARRINHO ? JSON.parse(window.localStorage.CARRINHO) : [],
  },

  mutations: {
    SET_CARRINHO(state, payload) {
      state.carrinho = payload;
    },
  },

  actions: {
    changeCarrinho(context, payload) {
      context.commit('SET_CARRINHO', payload);

      window.localStorage.CARRINHO = JSON.stringify(payload);
    },
  },
});
