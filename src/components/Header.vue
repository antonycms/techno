<template>
  <div class="container">
    <a class="logo" href="/">
      <img src="assets/techno.svg" alt="techno" />
    </a>

    <button class="container-carrinho">
      <span class="valor">{{ valorTotal | formatToBRL }}</span>
      <div class="divisor" />
      <span class="quantidade">{{ quantidade }}</span>
      <img src="assets/carrinho.svg" alt="carrinho" />
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  filters: {
    formatToBRL(value = 0) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
  },

  computed: {
    ...mapState(['CARRINHO']),

    valorTotal() {
      let total = 0;
      this.CARRINHO.forEach(produto => (total += produto.preco));

      return total;
    },

    quantidade() {
      return this.CARRINHO.length;
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding-top: 20px;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo img {
  width: 100px;
}

.divisor {
  height: 15px;
  width: 1px;
  margin: 0 6px;
  background-color: black;
}

.container-carrinho {
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: white;
  border: 0;
  font-size: 15px;
}

.container-carrinho:focus {
  outline: transparent;
}

.container-carrinho img {
  margin-left: 10px;
  width: 18px;
}
</style>
