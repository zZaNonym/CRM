import store from '../store';

export default function(value, format = 'date') {
  const options = {};
  if (format.includes('date')) {
    options.day = '2-digit';
    options.month = 'long';
    options.year = 'numeric';
  }
  if (format.includes('time')) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }
  return new Intl.DateTimeFormat(store.getters.info.locale, options).format(
    value
  );
}
