import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import VueMeta from 'vue-meta';

import App from './App.vue';
import router from './router';
import store from './store';
import DateFilter from './filtres/date';
import LocaleFilter from './filtres/locale';
import CurrencyFilter from './filtres/currency';
import ToolTipDirective from './directives/tooltip';
import MessagePlugin from './utils/message.plugin';
import TitlePlugin from './utils/title.plugin';

import Loader from './components/app/Loader';

import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.filter('currency', CurrencyFilter);
Vue.filter('localize', LocaleFilter);

Vue.use(Vuelidate);
Vue.use(MessagePlugin);
Vue.use(TitlePlugin);
Vue.use(VueMeta);

Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

Vue.directive('tooltip', ToolTipDirective);

firebase.initializeApp({
  apiKey: 'AIzaSyCgEOMrhH6IUEzuOSMQvXyfGSPDd8Knk_M',
  authDomain: 'vue-crm-6fc4d.firebaseapp.com',
  databaseURL: 'https://vue-crm-6fc4d.firebaseio.com',
  projectId: 'vue-crm-6fc4d',
  storageBucket: 'vue-crm-6fc4d.appspot.com',
  messagingSenderId: '1025028870750',
  appId: '1:1025028870750:web:e7843f5c09d15152285acf',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
