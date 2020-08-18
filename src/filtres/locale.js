import store from '@/store';
import EN from '../localise/en.json';
import RO from '../localise/ro.json';

const locales = {
  'ro-RO': RO,
  'en-EN': EN,
};

export default function(key) {
  const locale = store.getters.info.locale || 'en-EN';

  return locales[locale][key] || `[Localize error]:key ${key} not found`;
}
