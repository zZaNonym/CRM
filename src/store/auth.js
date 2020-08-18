import firebase from 'firebase/app';

export default {
  state: {},
  mutations: {},
  actions: {
    async login({ commit }, { password, email }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit('setError', error.code);
        throw error;
      }
    },
    async logout({ commit }) {
      try {
        await firebase.auth().signOut();
        commit('clearInfo');
      } catch (error) {
        throw error;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getuid');
        await firebase
          .database()
          .ref(`users/${uid}/info`)
          .set({ bill: 1000, locale: 'en-EN', name });
      } catch (error) {
        commit('setError', error.code);
        throw error;
      }
    },
    getuid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
};
