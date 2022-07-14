import I18n from 'react-native-i18n';
import en from './locales/en';
import sv from './locales/sv';

I18n.fallbacks = true;

I18n.translations = {
  en,
  sv
};

export default I18n;
