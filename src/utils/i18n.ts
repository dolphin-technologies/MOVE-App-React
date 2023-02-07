import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en';

const de = {
	permissions: 'Permissions',
};

i18next.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	lng: 'en',
	fallbackLng: 'en',
	appendNamespaceToMissingKey: true,
	debug: false,
	resources: {
		en: {
			translation: en,
		},
		de: {
			translation: de,
		},
	},
	interpolation: {
		escapeValue: false,
	},
});
