<template>
  <div @click="emitCloseEvent" v-if="produto.id" class="modal">
    <div :class="alertaAddItemAtivo ? 'alerta_item_adicionado ativo' : 'alerta_item_adicionado'">
      <p>{{ produto.nome }} adicionado(a) ao carrinho!</p>
    </div>

    <div class="modal_container">
      <div class="modal_img">
        <img :src="produto.img" :alt="produto.nome" />
      </div>

      <div class="modal_dados">
        <button @click="emitCloseEvent" class="btn_close">X</button>
        <span class="modal_preco"><Format :money="produto.preco"/></span>
        <h2 class="modal_titulo">{{ produto.nome }}</h2>
        <p class="descricao">{{ produto.descricao }}</p>
        <button
          @click="() => addProdutoCarrinho(produto)"
          :class="!produto.estoque ? 'modal_btn disabled' : 'modal_btn'"
        >
          Adicionar Item
        </button>

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
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    produto: {
      default: () => {},
      required: true,
      type: Object,
    },
  },

  data: () => ({
    alertaAddItemAtivo: false,
  }),

  computed: {
    ...mapState(['carrinho']),
  },

  watch: {
    carrinho() {
      if (this.alertaAddItemAtivo) return;

      this.alertaAddItemAtivo = true;

      setTimeout(() => {
        this.alertaAddItemAtivo = false;
      }, 1500);
    },
  },

  methods: {
    ...mapActions(['changeCarrinho']),

    emitCloseEvent({ target, currentTarget }) {
      if (target && target !== currentTarget) return;

      this.$emit('close-modal');
    },

    addProdutoCarrinho(produto) {
      if (!this.produto.estoque) return;

      this.changeCarrinho([...this.carrinho, produto]);
      --this.produto.estoque;
    },
  },
};
</script>

<style scoped>
.btn_close {
  position: absolute;
  top: -10px;
  right: -10px;
  color: white;
  border-radius: 10%;
  font-weight: bold;
  background-color: black;
  width: 35px;
  height: 35px;
  border: 0;
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

.modal_btn.disabled {
  background-color: #2c2c2c;
  cursor: not-allowed;
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

.alerta_item_adicionado {
  display: none;
  background-color: white;
  border: 1px solid black;
  border-radius: 2px;
  box-shadow: 0.5px 1px 3px black;
  position: absolute;
  z-index: 10;
  top: 10px;
  padding: 12px 15px;
  max-width: 950px;
}

.alerta_item_adicionado.ativo {
  display: block;
  animation: fadeInDown 0.3s forwards;
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

@media (max-width: 780px) {
  .modal {
    padding: 80px 20px;
  }

  .modal_titulo {
    font-size: 2rem;
  }

  .modal_dados .descricao {
    font-size: 14px;
  }

  .avaliacoes_subtitulo {
    font-size: 1rem;
  }

  .avaliacao_descricao {
    font-size: 12px;
  }

  .avaliacao_usuario {
    font-size: 12px;
  }

  .modal_btn {
    margin-top: 8%;
    margin-bottom: 4%;
  }
}

@media (max-width: 500px) {
  .modal {
    padding: 20px;
  }
  .modal_container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;

    padding: 0;
  }

  .modal_img img {
    width: 100%;
    max-height: 250px;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  .modal_titulo {
    font-size: 1.4rem;
  }

  .modal_dados .descricao {
    font-size: 12px;
  }

  .avaliacoes_subtitulo {
    font-size: 0.8rem;
  }

  .avaliacao_descricao {
    font-size: 12px;
  }

  .avaliacao_usuario {
    font-size: 10px;
  }

  .modal_btn {
    margin-top: 8%;
    margin-bottom: 2%;
    padding: 5px 12px;
  }
}
</style>
