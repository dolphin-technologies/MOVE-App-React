import { fork, take, put, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as Notifications from 'expo-notifications';
import { AppState, AppStateStatus } from 'react-native';

import { CustomAppStateType, setAppState } from './runtimeSlice';

function* appStateChannelSaga() {
	let appStateChannel;
	try {
		appStateChannel = eventChannel((emitter) => {
			const listener = AppState.addEventListener('change', (appState) => {
				console.log('appstate changed ', appState);

				emitter(appState);
			});

			return () => {
				listener.remove();
			};
		});

		while (true) {
			const appState: AppStateStatus = yield take(appStateChannel);
			const previousAppState: CustomAppStateType = yield select((store) => store.runtime.appState);
			yield put(setAppState({ appState, previousAppState }));
		}
	} finally {
		if (appStateChannel) {
			console.log('CLOSE CHANNEL: appStateChannel');
			appStateChannel.close();
		}
	}
}

function* notificationReceivedChannelSaga() {
	let notificationReceivedChannel;
	try {
		notificationReceivedChannel = eventChannel((emitter) => {
			const listener = Notifications.addNotificationReceivedListener((notification) => {
				emitter(notification);
			});
			return () => {
				listener.remove();
			};
		});

		while (true) {
			const notification: Notifications.Notification = yield take(notificationReceivedChannel);
			console.log(notification);
		}
	} finally {
		if (notificationReceivedChannel) {
			console.log('CLOSE CHANNEL: notificationReceivedChannel');
			notificationReceivedChannel.close();
		}
	}
}

function* notificationResponseReceivedChannelSaga() {
	let notificationResponseReceivedChannel;
	try {
		notificationResponseReceivedChannel = eventChannel((emitter) => {
			const listener = Notifications.addNotificationResponseReceivedListener((notification) => {
				emitter(notification);
			});
			return () => {
				listener.remove();
			};
		});

		while (true) {
			const notification: Notifications.NotificationResponse = yield take(notificationResponseReceivedChannel);
			console.log(notification);
		}
	} finally {
		if (notificationResponseReceivedChannel) {
			console.log('CLOSE CHANNEL: notificationResponseReceivedChannel');
			notificationResponseReceivedChannel.close();
		}
	}
}

export function* initAppListeners() {
	yield fork(appStateChannelSaga);
	yield fork(notificationReceivedChannelSaga);
	yield fork(notificationResponseReceivedChannelSaga);
}
