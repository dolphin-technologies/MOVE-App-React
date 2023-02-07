import { put, call, select } from 'redux-saga/effects';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { AxiosResponse } from 'axios';
import { getBundleId } from 'react-native-device-info';

import { ResponseType } from '@services/api';
import { Api } from '@config/index';

import { addLog, setPushToken } from './runtimeSlice';
import { authenticatedRequestSaga } from './requestSaga';

export function* pushNotificationsSaga() {
	yield put(addLog(`[PUSH] - REQUEST PUSH TOKEN`));

	if (Device.isDevice) {
		const result: Notifications.NotificationPermissionsStatus = yield Notifications.getPermissionsAsync();
		if (!result.granted) {
			return;
		}
		const { pushToken } = yield select((store) => store.runtime);

		const token: Notifications.DevicePushToken = yield Notifications.getDevicePushTokenAsync();

		if (pushToken !== '' && token && token.data === pushToken) {
			yield put(addLog(`[PUSH] - PUSH TOKEN EXISTS`));

			return;
		}
		if (token && token.data) {
			yield put(addLog(`[PUSH] - PUSH TOKEN ${token.data}`));

			try {
				const response: AxiosResponse<ResponseType> = yield call(authenticatedRequestSaga, {
					method: Api.ENDPOINT.POST_PUSH_TOKEN.method,
					url: Api.ENDPOINT.POST_PUSH_TOKEN.getUrl(),
					data: {
						deviceToken: token.data,
						deviceTokenType: __DEV__ ? 'sandbox' : 'production',
						deviceTokenBundle: getBundleId(),
						payloadVersion: 2,
					},
				});

				if (response) {
					const { data } = response;

					if (data.status.code === 0) {
						yield put(addLog(`[PUSH] - PUSH TOKEN SAVED`));
						yield put(setPushToken(token.data));
					} else {
						yield put(addLog(`[PUSH] - PUSH TOKEN SAVE FAILED`));
					}
				}
			} catch (e) {
				console.log('error', e);
			}
		}
	}
}

export function* createAndroidChannelSaga() {
	if (Platform.OS === 'android') {
		console.log('create android channel');
		yield Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
		});
	}
}
