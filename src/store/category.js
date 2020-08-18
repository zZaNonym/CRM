import firebase from 'firebase/app';

export default {
  state: { categories: [] },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    addCategory(state, category) {
      state.categories.push(category);
    },
    updateCategory(state, { id, title, limit }) {
      const index = state.categories.findIndex((cat) => cat.id === id);
      state.categories[index].title = title;
      state.categories[index].limit = limit;
    },
  },
  getters: {
    categories: ({ categories }) => categories,
  },
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getuid');
        const category = await firebase
          .database()
          .ref(`users/${uid}/categories`)
          .push({ title, limit });
        commit('addCategory', { title, limit, id: category.key });
      } catch (error) {
        commit('setError', error.code);
      }
    },
    async fetchCategories({ dispatch, state, commit }) {
      if (!state.categories.length) {
        try {
          const uid = await dispatch('getuid');
          const categories =
            (
              await firebase
                .database()
                .ref(`users/${uid}/categories`)
                .once('value')
            ).val() || {};

          const cats = Object.keys(categories).map((key) => ({
            ...categories[key],
            id: key,
          }));
          commit('setCategories', cats);
          return cats;
        } catch (error) {
          commit('setError', error.code);
        }
      } else {
        return state.categories;
      }
    },
    async fetchCategoryById({ dispatch, state }, id) {
      if (!state.categories.length) {
        try {
          const uid = await dispatch('getuid');
          const category =
            (
              await firebase
                .database()
                .ref(`users/${uid}/categories`)
                .child(id)
                .once('value')
            ).val() || {};

          return { ...category, id };
        } catch (error) {
          commit('setError', error.code);
        }
      } else {
        return state.categories.find((cat) => cat.id === id);
      }
    },
    async updateCategory({ commit, dispatch }, { id, title, limit }) {
      try {
        const uid = await dispatch('getuid');

        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, limit });
        commit('updateCategory', { id, title, limit });
      } catch (error) {
        console.log(error);
        commit('setError', error.code);
      }
    },
  },
};
