import MoveSdk from 'react-native-move-sdk';
import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import { MoveSdkLoginInfoType, setSdkAuth } from '@store/features/user/userSlice';
import { ResponseType } from '@services/api';
import { Api } from '@config/index';

import { addLog } from '../runtime/runtimeSlice';
import { authenticatedRequestSaga } from '../runtime/requestSaga';

export function* moveSdkTokenRefresher() {
	yield put(addLog('[MOVE SDK TOKEN REFRESHER] - START REFRESH ACCESS TOKEN'));

	try {
		const response: AxiosResponse<ResponseType<{ sdkUserLoginInfo: MoveSdkLoginInfoType }>> = yield call(authenticatedRequestSaga, {
			method: Api.ENDPOINT.GET_SDK_TOKEN.method,
			url: Api.ENDPOINT.GET_SDK_TOKEN.getUrl(),
		});
		if (response) {
			const { data } = response;
			if (data.status.code === 0 && data.data) {
				yield put(addLog('[MOVE SDK TOKEN REFRESHER] - REFRESH TOKEN SUCCESS -> SET NEW TOKEN'));
				yield put(setSdkAuth({ accessToken: data.data.sdkUserLoginInfo.accessToken, refreshToken: data.data.sdkUserLoginInfo.refreshToken }));
				yield MoveSdk.updateAuth({
					userId: data.data.sdkUserLoginInfo.contractId,
					projectId: data.data.sdkUserLoginInfo.productId,
					accessToken: data.data.sdkUserLoginInfo.accessToken,
					refreshToken: data.data.sdkUserLoginInfo.refreshToken,
				});
			}
		}
	} catch (e) {
		yield put(addLog(`[MOVE SDK TOKEN REFRESHER] - REFRESH TOKEN ERROR: ${e}`));
	}

	yield put(addLog('[MOVE SDK TOKEN REFRESHER] - END REFRESH ACCESS TOKEN'));
}
