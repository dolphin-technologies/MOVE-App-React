import { AxiosResponse, Method } from 'axios';
import { call, put, take, select } from 'redux-saga/effects';
import * as Sentry from 'sentry-expo';
import Toast from 'react-native-toast-message';
import i18next from 'i18next';

import { Codes } from '@config/index';
import { Api } from '@services/index';

import { refreshTokenSuccess, refreshTokenFailure, addLog, logout } from './runtimeSlice';

type RequestSagaType<T> = {
	method: Method;
	url: string;
	data?: T;
};

const authDontRetryOn = [400, 402, 403, 404, 405, 406, 500, 501, 502, 505]; // https://stackoverflow.com/questions/47680711/which-http-errors-should-never-trigger-an-automatic-retry
const dontRetryOn = [400, 401, 402, 403, 404, 405, 406, 500, 501, 502, 505];

export function* authenticatedRequestSaga<T>({ method, url, data }: RequestSagaType<T>) {
	const contractId: string | null = yield select((store) => store.user.contractId);

	if (!contractId) {
		yield put(addLog(`[REQUEST SAGA] - NOT LOGGED IN: ${method} ${url}`));
		throw new Error('NOT LOGGED IN');
	}

	for (let i = 0; i < 3; i++) {
		yield put(addLog(`[REQUEST SAGA] - TRY (${i}): ${method} ${url}`));
		try {
			const response: AxiosResponse = yield call(Api.request, method, url, data);
			yield put(addLog(`[REQUEST SAGA] - SUCCESS (${i}): ${method} ${url}`));
			return response;
		} catch (e) {
			yield put(addLog(`[REQUEST SAGA] - ERROR (${i}): ${method} ${url} -> ${e.response?.status}`));
			if (e.response?.status === 401) {
				if (e.response?.data?.status?.code === Codes.JWT_EXPIRED || e.response?.data?.status?.code === Codes.JWT_EXPIRED_DEPRECATED) {
					yield put(addLog(`[REQUEST SAGA] - GOT 401 -> WAIT HERE UNTIL TOKEN REFRESHER COMPLETE (${i}): ${url}`));
					const takeResult: ReturnType<typeof refreshTokenSuccess | typeof refreshTokenFailure> = yield take([refreshTokenSuccess.type, refreshTokenFailure.type]);

					if (takeResult.type === refreshTokenFailure.type) {
						yield put(addLog(`[REQUEST SAGA] - TOKEN REFRESHER FAILED, STOP RETRY REQUEST (${i}): ${url}`));
						break;
					}
					yield put(addLog(`[REQUEST SAGA] - GOT NEW TOKEN, RETRY REQUEST (${i}): ${url}`));
				} else {
					// don't repeat 401 if not jwt expired
					break;
				}
			}
			if (e.response?.status === 400) {
				if (e.response?.data?.status?.code === Codes.SIGNED_IN_ANOTHER_DEVICE) {
					yield put(addLog(`[REQUEST SAGA] - SIGNED IN ON ANOTHER DEVICE`));
					yield put(logout());
					Toast.show({
						type: 'info',
						text1: i18next.t('txt_signed_in_on_another_device'),
					});
					Sentry.Native.captureMessage('AUTO LOGOUT: SIGNED IN ON ANOTHER DEVICE');
					break;
				}
			}
			if (authDontRetryOn.includes(e.response?.status)) {
				// don't repeat
				break;
			}
		}
	}
	// attempts failed after 3 attempts
	throw new Error('API REQUEST FAILED');
}

export function* requestSaga<T>({ method, url, data }: RequestSagaType<T>) {
	for (let i = 0; i < 3; i++) {
		try {
			const response: AxiosResponse = yield call(Api.request, method, url, data);
			yield put(addLog(`[REQUEST SAGA] - SUCCESS: ${method} ${url}`));
			return response;
		} catch (e) {
			yield put(addLog(`[REQUEST SAGA] - ERROR: ${method} ${url} -> ${e.response.status}`));

			if (dontRetryOn.includes(e.response?.status)) {
				// don't repeat
				break;
			}
		}
	}
	throw new Error('API REQUEST FAILED');
}
