<template>
  <div @click="emitCloseEvent" v-if="produto.id" class="modal">
    <div class="modal_container">
      <div class="modal_img">
        <img :src="produto.img" :alt="produto.nome" />
      </div>

      <div class="modal_dados">
        <button @click="emitCloseEvent" class="btn_close">X</button>
        <span class="modal_preco"><Format :money="produto.preco"/></span>
        <h2 class="modal_titulo">{{ produto.nome }}</h2>
        <p>{{ produto.descricao }}</p>
        <button class="modal_btn">Adicionar Item</button>

        <div class="avaliacoes">
          <h2 class="avaliacoes_subtitulo">Avaliações</h2>
          <ul class="container-avaliacoes">
            <li class="avaliacao" v-for="avaliacao in produto.reviews" :key="avaliacao.id">
              <p class="avaliacao_descricao">{{ avaliacao.descricao }}</p>
              <p class="avaliacao_usuario">{{ avaliacao.nome }} | {{ avaliacao.estrelas }} estrelas</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    produto: {
      default: () => {},
      required: true,
      type: Object,
    },
  },

  methods: {
    emitCloseEvent({ target, currentTarget }) {
      if (target && target !== currentTarget) return;

      this.$emit('close-modal');
    },
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

.modal::before {
  content: '';
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
}

.modal {
  position: fixed;
  left: 0;
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
  padding: 50px 50px 50px 0;
  display: flex;
}

.modal_img img {
  max-width: 300px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.modal_dados {
  max-width: 600px;
  margin-left: 5%;
}

.modal .avaliacoes {
  margin-top: 8%;
}

.modal_titulo {
  font-size: 3rem;
}

.modal_btn {
  background-color: black;
  margin-top: 5%;
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

.container-avaliacoes {
  max-height: 210px;
  overflow-y: auto;
}

.container-avaliacoes::-webkit-scrollbar {
  width: 4px;
}
.container-avaliacoes::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 4px;
}
.container-avaliacoes::-webkit-scrollbar-track {
  background-color: transparent;
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
