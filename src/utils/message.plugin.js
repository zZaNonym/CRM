import localize from '../filtres/locale';

export default {
  install(Vue, options) {
    Vue.prototype.$message = function(html) {
      M.toast({ html: localize(html), classes: 'success' });
    };

    Vue.prototype.$error = function(html) {
      M.toast({ html: localize(html), classes: 'error' });
    };
  },
};
