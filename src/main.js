import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash, faPiggyBank, faTrash, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import App from './App.vue';

library.add(faEye, faEyeSlash, faPiggyBank, faTrash, faAngleUp);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
