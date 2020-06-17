import Vue from 'vue';
import App from './App.vue';
import Format from './utils/Format.vue';

Vue.config.productionTip = false;

Vue.component('Format', Format);

new Vue({
  render: h => h(App),
}).$mount('#app');
