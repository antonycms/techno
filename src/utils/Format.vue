<template>
  <span :class="this.className" :id="this.id">{{ getValue() }}</span>
</template>

<script>
export default {
  props: {
    money: [String, Number],
    className: String,
    id: [String, Number],
  },
  methods: {
    getValue() {
      return this.formatMoney();
    },

    formatMoney() {
      let prefix = 'R$ ';

      if (!this.money) {
        return `${prefix}0,00`;
      }

      return `${this.money.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    },
  },
};
</script>

<style></style>
