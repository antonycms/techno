<template>
  <div>
    <section @click="closeModal" v-if="produto.id" class="modal">
      <div class="modal_container">
        <div class="modal_img">
          <img :src="produto.img" :alt="produto.nome" />
        </div>

        <div class="modal_dados">
          <button @click="closeModal" class="btn_close">X</button>
          <span class="modal_preco"><Format :money="produto.preco"/></span>
          <h2 class="modal_titulo">{{ produto.nome }}</h2>
          <p>{{ produto.descricao }}</p>
          <button class="modal_btn">Adicionar Item</button>
        </div>

        <div class="avaliacoes">
          <h2 class="avaliacoes_subtitulo">Avaliações</h2>
          <ul>
            <li class="avaliacao" v-for="avaliacao in produto.reviews" :key="avaliacao.id">
              <p class="avaliacao_descricao">{{ avaliacao.descricao }}</p>
              <p class="avaliacao_usuario">{{ avaliacao.nome }} | {{ avaliacao.estrelas }} estrelas</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

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
export default {
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

    closeModal({ target, currentTarget }) {
      if (target && target !== currentTarget) return;

      this.produto = {};
    },
  },

  created() {
    this.loadProducts();
  },
};
</script>

<style scoped>
.btn_close {
  position: absolute;
  top: -10px;
  right: -10px;
  border-radius: 100%;
  background-color: white;
  width: 45px;
  height: 45px;
  border: 2px solid black;
  outline: transparent;
  cursor: pointer;
}

.btn_close:focus {
  background-color: #e0e0e0;
  transition: 0.2s;
}

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

.modal::before {
  content: '';
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0px;
  top: 0px;
}

.modal {
  position: absolute;
  left: 0px;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px;
}

.modal_container {
  position: relative;
  z-index: 1;
  background: linear-gradient(to right, transparent 250px, white 250px);
  display: grid;
  display: grid;
  gap: 50px;
  align-items: end;
  padding: 50px 50px 50px 0;
}

.modal_img {
  grid-column: 1;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.modal_img img {
  max-width: 300px;
  display: block;
}

.modal_dados {
  grid-column: 2;
  max-width: 600px;
}

.modal .avaliacoes {
  grid-column: 2;
}

.modal_titulo {
  font-size: 3rem;
}

.modal_btn {
  background-color: black;
  margin-top: 80px;
  cursor: pointer;
  color: white;
  border: none;
  font-size: 1rem;
  padding: 10px 25px;
  font-weight: bold;
}

.modal_btn:focus {
  background-color: #2c2c2c;
  transition: 0.2s;
  outline: transparent;
}

.avaliacoes_subtitulo {
  font-size: 1.7rem;
}

.avaliacao {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 0;
}

.avaliacao_descricao {
  margin: 10px 0;
}

.avaliacao_usuario {
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
