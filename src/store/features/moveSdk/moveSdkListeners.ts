import MoveSdk, { AuthStateEvent, ErrorListType, SdkState, TripState } from 'react-native-move-sdk';
import { eventChannel } from 'redux-saga';
import { put, take, fork } from 'redux-saga/effects';

import { setSdkAuth } from '@store/features/user/userSlice';

import { addLog } from '../runtime/runtimeSlice';
import { setAuthState, setSdkState, setTripState, listenersReady, setErrors, setWarnings, refreshMoveSdkToken } from './moveSdkSlice';

function* sdkStateChannelSaga() {
	let sdkStateChannel;
	try {
		sdkStateChannel = eventChannel((emitter) => {
			const listener = MoveSdk.addSdkStateListener((state: SdkState) => {
				emitter(state === null ? 'UNINITIALIZED' : state);
			});
			return () => {
				console.log('REMOVE LISTENER sdkStateChannel');
				listener.remove();
			};
		});
		console.log('addSDKStateListener READY: ');
		while (true) {
			const sdkState: SdkState = yield take(sdkStateChannel);
			yield put(addLog(`[SDK LISTENER]: ${sdkState}`));
			yield put(setSdkState(sdkState));
		}
	} finally {
		if (sdkStateChannel) {
			console.log('CLOSE CHANNEL: sdkStateChannel');
			sdkStateChannel.close();
		}
	}
}

function* tripStateChannelSaga() {
	let tripStateChannel;
	try {
		tripStateChannel = eventChannel((emitter) => {
			const listener = MoveSdk.addTripStateListener((state: TripState) => {
				emitter(state);
			});
			return () => {
				console.log('REMOVE LISTENER tripStateChannel');
				listener.remove();
			};
		});
		console.log('tripStateChannel READY: ');
		while (true) {
			const tripState: TripState = yield take(tripStateChannel);
			yield put(addLog(`[TRIP LISTENER]: ${tripState}`));
			yield put(setTripState(tripState));
		}
	} finally {
		if (tripStateChannel) {
			console.log('CLOSE CHANNEL: tripStateChannel');
			tripStateChannel.close();
		}
	}
}

function* authStateChannelSaga() {
	let authStateChannel;
	try {
		authStateChannel = eventChannel((emitter) => {
			const listener = MoveSdk.addAuthStateListener((event: AuthStateEvent) => {
				emitter(event);
			});
			return () => {
				console.log('REMOVE LISTENER authStateChannel');
				listener.remove();
			};
		});
		console.log('authStateChannel READY: ');
		while (true) {
			const authState: AuthStateEvent = yield take(authStateChannel);
			yield put(addLog(`[AUTH LISTENER]: ${authState.state}`));
			yield put(setAuthState(authState.state));

			if (authState.state === MoveSdk.AUTH_VALID) {
				const { accessToken, refreshToken } = authState;
				if (accessToken && refreshToken) {
					yield put(setSdkAuth({ accessToken, refreshToken }));
				}
			} else if (authState.state === MoveSdk.AUTH_EXPIRED) {
				yield put(addLog(`[MOVESDKSTATES] AUTH EXPIRED CALL TOKEN REFRESHER (LISTENER)`));
				yield put(refreshMoveSdkToken());
			}
		}
	} finally {
		if (authStateChannel) {
			console.log('CLOSE CHANNEL: authStateChannel');
			authStateChannel.close();
		}
	}
}

function* errorsChannelSaga() {
	let errorsChannel;
	try {
		errorsChannel = eventChannel((emitter) => {
			const listener = MoveSdk.addErrorsListener((event: ErrorListType) => {
				emitter(event);
			});
			return () => {
				console.log('REMOVE LISTENER errorsChannel');
				listener.remove();
			};
		});
		console.log('errorsChannel READY: ');
		while (true) {
			const errors: ErrorListType = yield take(errorsChannel);
			console.log('SET ERRORS IN REDUX', errors);
			yield put(setErrors(errors));
			console.log(errors);
		}
	} finally {
		if (errorsChannel) {
			console.log('CLOSE CHANNEL: errorsChannel');
			errorsChannel.close();
		}
	}
}

function* warningsChannelSaga() {
	let warningsChannel;
	try {
		warningsChannel = eventChannel((emitter) => {
			const listener = MoveSdk.addWarningsListener((event: ErrorListType) => {
				emitter(event);
			});
			return () => {
				console.log('REMOVE LISTENER warningsChannel');
				listener.remove();
			};
		});
		console.log(' warningsChannel READY: ');
		while (true) {
			const warnings: ErrorListType = yield take(warningsChannel);
			console.log('SET WARNINGS IN REDUX', warnings);
			yield put(setWarnings(warnings));
		}
	} finally {
		if (warningsChannel) {
			console.log('CLOSE CHANNEL:  warningsChannel');
			warningsChannel.close();
		}
	}
}

export function* initMoveSdkListeners() {
	yield put(addLog('[MOVESDK/LISTENERS] - 1/1 START FORK LISTENERS'));

	yield fork(sdkStateChannelSaga);
	yield fork(tripStateChannelSaga);
	yield fork(authStateChannelSaga);
	yield fork(errorsChannelSaga);
	yield fork(warningsChannelSaga);

	yield put(addLog('[MOVESDK/LISTENERS] - 1/2 END FORK LISTENERS'));
	yield put(listenersReady());
}
