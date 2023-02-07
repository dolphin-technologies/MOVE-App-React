import { all, put, take, takeLatest, fork, cancel, call, takeLeading } from 'redux-saga/effects';
import { Action } from '@reduxjs/toolkit';
import MoveSdk from 'react-native-move-sdk';
import { Task } from 'redux-saga';

import { addLog, logout } from '@store/features/runtime/runtimeSlice';
import { initializeMoveSdk, refreshMoveSdkToken } from '@store/features/moveSdk/moveSdkSlice';

import { initMoveSdk } from './moveSdk';
import { listenersReady } from './moveSdkSlice';
import { initMoveSdkListeners } from './moveSdkListeners';
import { moveSdkTokenRefresher } from './moveSdkTokenRefresher';

let moveSdkListener: Task | null = null;

export function* initializeMoveSdkSaga() {
	yield put(addLog('[MOVESDK] - 1 START MOVE SAGA INIT LISTENERS'));
	moveSdkListener = yield fork(initMoveSdkListeners);
	yield put(addLog('[MOVESDK] - 2 WAIT ACTION LISTENERS READY'));
	yield take((action: Action) => {
		return action.type === listenersReady.type;
	});
	yield put(addLog('[MOVESDK] - 3 START INIT MOVE SDK'));
	yield call(initMoveSdk);
	yield put(addLog('[MOVESDK] - 4 INIT DONE -> LOAD INIT DATA'));
	yield put(addLog('[MOVESDK] - 5 MOVE SAGA DONE -> WAIT LOGOUT'));
}

export function* shutdownMoveSdk() {
	yield MoveSdk.shutdown();
	if (moveSdkListener) {
		yield cancel(moveSdkListener);
	}
}

export default function* moveSdkSaga() {
	yield all([takeLatest(initializeMoveSdk.type, initializeMoveSdkSaga), takeLeading(refreshMoveSdkToken.type, moveSdkTokenRefresher), takeLeading(logout.type, shutdownMoveSdk)]);
}
