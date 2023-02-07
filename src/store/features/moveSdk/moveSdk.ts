import MoveSdk, { MoveSdkAuth, SdkState } from 'react-native-move-sdk';
import Toast from 'react-native-toast-message';
import { put, select } from 'redux-saga/effects';

import { Api, MoveSdkConfig } from '@config/index';

import { addLog } from '../runtime/runtimeSlice';

export function* initMoveSdk() {
	const initialState: SdkState = yield MoveSdk.getState();

	yield put(addLog(`[MOVESDK/INIT] - 3/1 INIT SDK CURRENT STATE: ${initialState}`));

	if (initialState === MoveSdk.UNINITIALIZED) {
		const { contractId, sdkAuth } = yield select((store) => store.user);

		if (contractId && sdkAuth.accessToken && sdkAuth.refreshToken) {
			const auth: MoveSdkAuth = {
				userId: contractId,
				accessToken: sdkAuth.accessToken,
				refreshToken: sdkAuth.refreshToken,
				projectId: Api.PRODUCT_ID,
			};

			try {
				yield put(addLog(`[MOVESDK/INIT] - 3/2 TRY INIT SDK: ${contractId}`));
				yield MoveSdk.setup(MoveSdkConfig.CONFIG, auth, MoveSdkConfig.ANDROID_CONFIG);
				yield MoveSdk.startAutomaticDetection();
				yield put(addLog(`[MOVESDK/INIT] - 3/3 SDK INIT DONE: ${contractId}`));
			} catch (e) {
				yield put(addLog(`[MOVESDK/INIT] - 3/3 SDK INIT ERROR`));
				Toast.show({
					type: 'error',
					text1: `MOVE SDK INIT ERROR: ${e}`,
				});
			}
		} else {
			yield put(addLog(`[MOVESDK/INIT] - 3/0 USER DATA NOT READY`));
		}
	} else {
		yield put(addLog(`[MOVESDK/INIT] - 3/99 SDK ALREADY RUNNING: ${initialState}`));
	}
}
