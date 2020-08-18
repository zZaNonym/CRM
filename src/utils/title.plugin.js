import localize from '../filtres/locale';

export default {
  install(Vue, options) {
    Vue.prototype.$title = function(title) {
      return `${localize(title)} | by zZaNonym`;
    };
  },
};
