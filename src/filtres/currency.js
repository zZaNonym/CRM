import store from '../store';

export default function(value, currency = 'MDL') {
  return Intl.NumberFormat(store.getters.info.locale, {
    style: 'currency',
    currency,
  }).format(value);
}
