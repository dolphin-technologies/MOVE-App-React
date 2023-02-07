import { put } from 'redux-saga/effects';

import { initializeMoveSdk } from '@store/features/moveSdk/moveSdkSlice';
import * as localStorage from '@services/localStorage';

import { setAuth, setContractId, setSdkAuth } from '../user/userSlice';
import { addLog } from './runtimeSlice';

export function* loadStorageData() {
	const loginData: localStorage.StoreLoginDataType = yield localStorage.getLoginData();

	if (loginData?.contractId) {
		const appTokens: localStorage.StoreAuthTokenType = yield localStorage.getAllTokens();

		if (appTokens.appAccessToken && appTokens.appRefreshToken && appTokens.sdkAccessToken && appTokens.sdkRefreshToken) {
			yield put(addLog('[APP/STORAGE] - 2/3 SET AUTH FROM STORAGE'));
			yield put(setContractId({ contractId: loginData.contractId }));
			yield put(setAuth({ accessToken: appTokens.appAccessToken, refreshToken: appTokens.appRefreshToken }));
			yield put(setSdkAuth({ accessToken: appTokens.sdkAccessToken, refreshToken: appTokens.sdkRefreshToken }));
			yield put(addLog(`[APP/STORAGE] - 2/4 INIT MOVE SDK FROM STORAGE (${loginData.contractId})`));
			yield put(initializeMoveSdk());
		}
	}
}

export function* removeStorageDataOnInitialRun() {
	yield localStorage.deleteAllDataOnInitialRun();
}
