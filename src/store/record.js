import firebase from 'firebase/app';

export default {
  state: { records: [] },
  mutations: {
    setRecords(state, records) {
      state.records = records;
    },
    addRecord(state, record) {
      state.records.push(record);
    },
  },
  actions: {
    async createRecord({ commit, dispatch }, data) {
      try {
        const uid = await dispatch('getuid');
        const record = await firebase
          .database()
          .ref(`users/${uid}/records`)
          .push(data);

        commit('addRecord', { ...data, id: record.key });
      } catch (error) {
        commit('setError', error.code);
      }
    },
    async fetchRecords({ commit, dispatch, state }) {
      if (!state.records.length) {
        try {
          const uid = await dispatch('getuid');
          const records =
            (
              await firebase
                .database()
                .ref(`users/${uid}/records`)
                .once('value')
            ).val() || {};

          const r = Object.keys(records).map((key) => ({
            ...records[key],
            id: key,
          }));
          commit('setRecords', r);
          return r;
        } catch (error) {
          commit('setError', error.code);
        }
      } else {
        return state.records;
      }
    },
    async fetchRecordById({ commit, dispatch, state }, id) {
      if (!state.records.length) {
        try {
          const uid = await dispatch('getuid');
          const record =
            (
              await firebase
                .database()
                .ref(`users/${uid}/records`)
                .child(id)
                .once('value')
            ).val() || {};
          return { ...record, id };
        } catch (error) {
          commit('setError', error.code);
        }
      } else {
        return state.records.find((record) => record.id === id);
      }
    },
  },
};
