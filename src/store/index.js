import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import info from './info';
import category from './category';
import record from './record';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { error: null, currency: null },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
    setCurrency(state, currency) {
      state.currency = currency;
    },
  },
  getters: {
    error: ({ error }) => error,
  },
  actions: {
    async fetchCurrency({ commit, state }) {
      if (!state.currency) {
        const API_KEY = process.env.VUE_APP_FIXER;
        const res = await fetch(
          `http://data.fixer.io/api/latest?access_key=${API_KEY}&symbols=USD,EUR,MDL`
        );
        const currency = await res.json();
        commit('setCurrency', currency);
        return currency;
      } else {
        return state.currency;
      }
    },
  },
  modules: { auth, info, category, record },
});
