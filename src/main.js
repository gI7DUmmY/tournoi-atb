import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash, faPiggyBank, faTrash, faAngleUp, faCopy, faUser, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';

library.add(faEye, faEyeSlash, faPiggyBank, faTrash, faAngleUp, faCopy, faUser, faSort);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
