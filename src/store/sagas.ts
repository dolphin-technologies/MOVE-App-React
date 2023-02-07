import { all, fork } from 'redux-saga/effects';

import userSaga from './features/user/userSagas';
import runtimeSaga from './features/runtime/runtimeSaga';
import moveSdkSaga from './features/moveSdk/moveSdkSaga';
import timelineSaga from './features/timeline/timelineSaga';
import messagesSaga from './features/messages/messagesSaga';

export default function* rootSaga() {
	yield all([fork(runtimeSaga), fork(userSaga), fork(moveSdkSaga), fork(timelineSaga), fork(messagesSaga)]);
}
