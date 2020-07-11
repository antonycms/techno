<template>
  <div class="dropdown-container" v-show="isActive">
    <p style="margin-bottom: 20px;">Carrinho</p>
    <ul v-show="carrinho.length">
      <li class="dropdown-item" v-for="(produto, index) in carrinho" :key="index">
        <div style="display: flex">
          <span class="produto-nome">{{ produto.nome }}</span>
          <span class="produto-preco">{{ produto.preco | formatToBRL }}</span>
        </div>
        <button @click="() => removeItemCarrinho(produto)">X</button>
      </li>
    </ul>

    <p style="margin-bottom: 10px" v-show="!carrinho.length">Nenhum item adicionado ao carrinho!</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  computed: {
    ...mapState(['carrinho']),
  },

  filters: {
    formatToBRL(value = 0) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
  },

  methods: {
    ...mapActions(['changeCarrinho']),

    removeItemCarrinho(produto) {
      if (!produto) return;
      const carrinhoL = [...this.carrinho];

      const produtoIndex = carrinhoL.indexOf(produto.id);

      carrinhoL.splice(produtoIndex - 1, 1);

      this.changeCarrinho(carrinhoL);
    },
  },
};
</script>

<style scoped>
.dropdown-container {
  position: absolute;
  top: 40px;
  background-color: white;
  box-shadow: 0.5px 0.5px 3px rgba(0, 0, 0, 0.651);
  border-radius: 2px;
  padding: 10px;
  left: -45px;
  animation: fadeInDown 0.3s forwards;
  min-width: 200px;
}

.dropdown-item {
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 8px 0;
  padding: 8px 5px;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.05);
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-item .produto-nome {
  margin-right: 10px;
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-item .produto-preco {
  margin-right: 5px;
}

.dropdown-item button {
  border: 0;
  padding: 3px 5px;
  border-radius: 4px;
  margin: 0 5px;
  cursor: pointer;
  background-color: black;
  color: white;
  font-weight: bold;
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -30px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0px, 0);
  }
}

@media (max-width: 980px) {
  .dropdown-container {
    left: -55px;
  }
}
</style>
