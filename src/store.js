import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    carrinho: window.localStorage.carrinho ? JSON.parse(window.localStorage.carrinho) : [],
  },
  mutations: {
    setCarrinho(state, payload) {
      state.carrinho = payload;

      window.localStorage.carrinho = JSON.stringify(state.carrinho);
    },
  },
});
