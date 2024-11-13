import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Импорт файлов переводов
import translationRU from './src/locales/ru/translation.json';
import translationUA from './src/locales/ua/translation.json';

// Конфигурация i18next
i18n.use(initReactI18next).init({
    resources: {
        ru: { translation: translationRU },
        ua: { translation: translationUA },
    },
    lng: 'ua', // Язык по умолчанию
    fallbackLng: 'ua',
    interpolation: {
        escapeValue: false, // Для безопасности React не нужно экранирование
    },
});

export default i18n;