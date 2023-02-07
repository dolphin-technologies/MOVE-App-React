import * as Font from 'expo-font';
import { put } from 'redux-saga/effects';

import { addLog } from './runtimeSlice';

export function* loadFont() {
	const customFonts = {
		FontBold: require('../../../../assets/fonts/Inter-Bold.ttf'),
		FontBlack: require('../../../../assets/fonts/Inter-Black.ttf'),
		FontRegular: require('../../../../assets/fonts/Inter-Regular.ttf'),
	};
	yield Font.loadAsync(customFonts);

	yield put(addLog('[APP/FONTS] - 2/1 FONTS LOADED'));
}
