<template>
  <div>
    <ModalProduto v-show="produto.id" :produto="produto" @close-modal="closeModal" />

    <section class="produtos">
      <div @click="loadProduct(item.id)" v-for="item in produtos" :key="item.id" class="produto">
        <img :src="item.img" :alt="item.nome" class="produto-img" />
        <div class="produto-info">
          <Format class="produto-preco" :money="item.preco" />
          <h1 class="produto-titulo">{{ item.nome }}</h1>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ModalProduto from '../components/ModalProduto';

export default {
  components: {
    ModalProduto,
  },

  data: () => ({
    produtos: [],
    produto: {},
  }),

  methods: {
    loadProducts() {
      fetch('./api/produtos.json')
        .then(response => response.json())
        .then(response => (this.produtos = response));
    },

    loadProduct(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then(response => response.json())
        .then(response => (this.produto = response));
    },

    closeModal() {
      this.produto = {};
    },
  },

  created() {
    this.loadProducts();
  },
};
</script>

<style scoped>
.produtos {
  max-width: 900px;
  margin: 100px auto 0 auto;
}

.produto {
  display: flex;
  align-items: center;
  margin-bottom: 48px;
  background-color: white;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.produto-img {
  max-width: 300px;
  margin-right: 40px;
}

.produto-titulo {
  font-size: 3rem;
  line-height: 1;
}

.produto-preco {
  color: rgba(0, 0, 0, 0.5);
}
</style>
