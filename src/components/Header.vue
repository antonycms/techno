<template>
  <div class="container">
    <a class="logo" href="/">
      <img src="assets/techno.svg" alt="techno" />
    </a>

    <button @click="event => openCarrinhoDropdown(event)" class="in-btn container-carrinho">
      <span class="in-btn valor">{{ valorTotal | formatToBRL }}</span>
      <div class="in-btn divisor" />
      <span class="in-btn quantidade">{{ quantidade }}</span>
      <img class="in-btn" src="assets/carrinho.svg" alt="carrinho" />

      <Dropdown :isActive="dropdownActive" />
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Dropdown from '@/components/Dropdown.vue';

export default {
  components: {
    Dropdown,
  },

  data: () => ({
    dropdownActive: false,
  }),

  filters: {
    formatToBRL(value = 0) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
  },

  computed: {
    ...mapState(['carrinho']),

    valorTotal() {
      let total = 0;
      this.carrinho.forEach(produto => (total += produto.preco));

      return total;
    },

    quantidade() {
      return this.carrinho.length;
    },
  },
  methods: {
    openCarrinhoDropdown({ target }) {
      if (target.classList[0] !== 'in-btn') return;

      this.dropdownActive = !this.dropdownActive;
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
  position: relative;
}

.container-carrinho:focus {
  outline: transparent;
}

.container-carrinho img {
  margin-left: 10px;
  width: 18px;
}

@media (max-width: 960px) {
  .container {
    margin: 0 50px;
  }
}
</style>
