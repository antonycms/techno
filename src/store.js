import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    CARRINHO: window.localStorage.CARRINHO ? JSON.parse(window.localStorage.CARRINHO) : [],
  },

  mutations: {
    setCarrinho(state, payload) {
      state.CARRINHO = payload;
    },
  },

  actions: {
    changeCarrinho(context, payload) {
      context.commit('setCarrinho', payload);

      window.localStorage.CARRINHO = JSON.stringify(payload);
    },
  },
});
