import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import { store } from '@store';
import { initializeApp } from '@store/features/runtime/runtimeSlice';

import '@services/setup';
import '@utils/i18n';

import App from './src/App';

store.dispatch(initializeApp());

registerRootComponent(App);
