import firebase from 'firebase/app';

export default {
  state: { info: {} },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getuid');
        const info = (
          await firebase
            .database()
            .ref(`users/${uid}/info`)
            .once('value')
        ).val();
        commit('setInfo', info);
      } catch (error) {
        commit('setError', error.code);
      }
    },
    async updateInfo({ dispatch, commit, getters }, data) {
      try {
        const uid = await dispatch('getuid');
        const updateData = { ...getters.info, ...data };

        await firebase
          .database()
          .ref(`users/${uid}/info`)
          .update(updateData);

        commit('setInfo', updateData);
      } catch (error) {
        commit('setError', error.code);
      }
    },
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  getters: {
    info: ({ info }) => info,
  },
};
