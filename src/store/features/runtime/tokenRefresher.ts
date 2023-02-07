import Toast from 'react-native-toast-message';
import { AxiosResponse } from 'axios';
import { call, put, select, delay, take } from 'redux-saga/effects';
import * as Sentry from 'sentry-expo';
import i18next from 'i18next';

import { setAuth } from '@store/features/user/userSlice';
import { ResponseType, request } from '@services/api';
import { Api, Codes } from '@config/index';

import { addLog, refreshTokenSuccess, refreshTokenFailure, RefreshTokenType, logout, setInitialized } from './runtimeSlice';

const showToast = (code: number) => {
	if (code === Codes.REFRESH_TOKEN_FOR_ANOTHER_USER) {
		Toast.show({
			type: 'info',
			text1: i18next.t('txt_signed_in_on_another_device'),
		});
	} else {
		Toast.show({
			type: 'info',
			text1: i18next.t('txt_session_expired'),
		});
	}
};

export function* tokenRefresherSaga() {
	let i = 0;
	for (i = 0; i < 3; i++) {
		yield put(addLog(`[TOKEN REFRESHER] - START REFRESH ACCESS TOKEN (TRY: ${i})`));
		try {
			const refreshToken: string | null = yield select((store) => store.user.auth.refreshToken);
			if (!refreshToken) {
				yield put(refreshTokenFailure());
				break;
			}
			const response: AxiosResponse<ResponseType<RefreshTokenType>> = yield call(request, Api.ENDPOINT.POST_REFRESH_TOKEN.method, Api.ENDPOINT.POST_REFRESH_TOKEN.getUrl(), {
				refreshToken: refreshToken,
			});
			if (response) {
				const { data } = response;
				if (data.status.code === 0 && data.data) {
					yield put(addLog(`[TOKEN REFRESHER] - REFRESH TOKEN SUCCESS -> SET NEW TOKEN (TRY: ${i})`));
					yield put(setAuth(data.data.productAuthInfo));
					yield put(refreshTokenSuccess());
					break;
				}
			}
		} catch (e) {
			if (e.response?.status === 401) {
				yield put(refreshTokenFailure());
				yield put(logout());
				yield put(addLog(`[TOKEN REFRESHER] - AUTO LOGOUT: TOKEN REFRESHER FAILED / STATUS: ${e.response?.status} / CODE: ${e.response?.data?.status?.code} / TRY: ${i}`));
				Sentry.Native.captureMessage(`AUTO LOGOUT: TOKEN REFRESHER FAILED / STATUS: ${e.response?.status} / CODE: ${e.response?.data?.status?.code} / TRY: ${i}`);

				const initialized: boolean = yield select((store) => store.runtime.initialized);
				if (initialized) {
					showToast(e.response?.data?.status?.code);
				} else {
					yield take(setInitialized.type);
					showToast(e.response?.data?.status?.code);
				}

				break;
			} else {
				yield put(addLog(`[TOKEN REFRESHER] - TOKEN REFRESHER FAILED / STATUS: ${e.response?.status} / CODE: ${e.response?.data?.status?.code} / TRY: ${i}`));
				Sentry.Native.captureMessage(`TOKEN REFRESHER FAILED / STATUS: ${e.response?.status} / CODE: ${e.response?.data?.status?.code} / TRY: ${i}`);
				// wait 7 seconds and try again
				yield delay(7000);
			}
		}
	}

	if (i === 3) {
		yield put(refreshTokenFailure());
		yield put(addLog(`[TOKEN REFRESHER] - FAILED MAX TRIES REACHED`));
	}
}
