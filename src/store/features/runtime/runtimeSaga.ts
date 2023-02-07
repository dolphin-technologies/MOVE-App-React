import { all, put, take, takeLatest, fork, takeLeading, call, select, delay } from 'redux-saga/effects';
import MoveSdk, { AuthState, ErrorListType, SdkState, TripState } from 'react-native-move-sdk';
import { AppState } from 'react-native';

import { addLog, createAndroidChannel, initializeApp, refreshToken, registerPushNotifications, setAppState, setInitialized } from '@store/features/runtime/runtimeSlice';

import { loadStorageData, removeStorageDataOnInitialRun } from './loadStorageData';
import { loadFont } from './loadFonts';
import { createAndroidChannelSaga, pushNotificationsSaga } from './pushNotifications';
import { initAppListeners } from './appListeners';
import { tokenRefresherSaga } from './tokenRefresher';
import { getMessages } from '../messages/messagesSlice';
import { refreshMoveSdkToken, setErrors, setSdkState, setTripState, setWarnings } from '../moveSdk/moveSdkSlice';
import { getUser } from '../user/userSlice';

function* initializeAppSaga() {
	const start = Date.now();
	yield put(addLog('[APP] - 1 WAIT INIT ACTION'));

	yield take(initializeApp.type);
	yield put(addLog('[APP] - 2 REMOVE SECURE STORAGE FOR FIRST LAUNCH'));
	yield call(removeStorageDataOnInitialRun);

	yield put(addLog('[APP] - 3 START FONT LOADING & STORAGE DATA'));
	yield all([loadFont(), loadStorageData()]);

	yield put(addLog('[APP] - 4 FONT & STORAGE DATA LOADED -> INIT APP -> TRUE'));
	yield put(setInitialized(true));

	yield put(setAppState({ previousAppState: 'terminated', appState: AppState.currentState === 'unknown' ? 'active' : AppState.currentState }));
	yield put(addLog('[APP] - 5 INIT APP LISTENERS'));
	yield fork(initAppListeners);

	yield put(addLog('[APP] - 6 APP SAGA DONE'));
	const end = Date.now();

	console.log('END-START', end - start);
}

function* appStateChangeSaga() {
	const previousAppState: string = yield select((store) => store.runtime.previousAppState);
	const appState: string = yield select((store) => store.runtime.appState);
	const contractId: string = yield select((store) => store.user.contractId);

	yield put(addLog(`[APPSTATE] - PREV: ${previousAppState} / CURR: ${appState} (${contractId})`));
	const fromInactivetoActive = previousAppState === 'inactive' && appState === 'active';
	const fromTerminatedtoActive = previousAppState === 'terminated' && appState === 'active';
	const fromBackgroundtoActive = previousAppState === 'background' && appState === 'active';
	const fromLogintoActive = previousAppState === 'login' && appState === 'active';
	const fromRegistertoActive = previousAppState === 'register' && appState === 'active';
	const fromTerminatedtoBackground = previousAppState === 'terminated' && appState === 'background';
	if (contractId) {
		if (fromTerminatedtoActive || fromBackgroundtoActive || fromLogintoActive || fromRegistertoActive || fromTerminatedtoBackground) {
			yield put(getUser());
			yield put(getMessages());
		}
	}

	if (fromTerminatedtoActive || fromBackgroundtoActive || fromInactivetoActive) {
		MoveSdk.resolveError();

		const sdkState: SdkState = yield MoveSdk.getState();
		const tripState: TripState = yield MoveSdk.getTripState();
		const authState: AuthState = yield MoveSdk.getAuthState();
		const warnings: ErrorListType = yield MoveSdk.getWarnings();
		const errors: ErrorListType = yield MoveSdk.getErrors();

		yield put(addLog(`[MOVESDKSTATES] CURRENT SDK/AUTH/TRIP: ${sdkState} / ${authState} / ${tripState}`));

		if (contractId && authState === MoveSdk.AUTH_EXPIRED) {
			yield put(addLog(`[MOVESDKSTATES] AUTH EXPIRED CALL TOKEN REFRESHER`));
			yield put(refreshMoveSdkToken());
		}

		yield put(setWarnings(warnings));
		yield put(setErrors(errors));

		yield put(setSdkState(sdkState));
		yield put(setTripState(tripState));
	}
}

export default function* runtimeSaga() {
	yield fork(initializeAppSaga);
	yield all([
		takeLatest(setAppState.type, appStateChangeSaga),
		takeLatest(registerPushNotifications.type, pushNotificationsSaga),
		takeLeading(refreshToken.type, tokenRefresherSaga),
		takeLeading(createAndroidChannel.type, createAndroidChannelSaga),
	]);
}
