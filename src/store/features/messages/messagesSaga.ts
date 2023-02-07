import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { setLoading } from '@store/features/runtime/runtimeSlice';
import { Api } from '@config/index';
import { ResponseType } from '@services/api';

import { authenticatedRequestSaga } from '../runtime/requestSaga';
import { getMessages, MessagesListType, patchMessage, setMessages } from './messagesSlice';

export function* handleGetMessages() {
	yield put(setLoading({ visible: true }));
	try {
		const response: AxiosResponse<ResponseType<MessagesListType>> = yield call(authenticatedRequestSaga, {
			method: Api.ENDPOINT.GET_MESSAGES.method,
			url: Api.ENDPOINT.GET_MESSAGES.getUrl(),
		});

		if (response) {
			const { data } = response;
			if (data.data && data.status.code === 0) {
				yield put(setMessages(data.data));
			}
		}
	} catch (e) {
		console.log('error', e);
	} finally {
		yield put(setLoading({ visible: false }));
	}
}

export function* handlePatchMessage(action: ReturnType<typeof patchMessage>) {
	yield put(setLoading({ visible: true }));
	try {
		const response: AxiosResponse<ResponseType<MessagesListType>> = yield call(authenticatedRequestSaga, {
			method: Api.ENDPOINT.PATCH_MESSAGE.method,
			url: Api.ENDPOINT.PATCH_MESSAGE.getUrl(),
			data: action.payload,
		});
		if (response) {
			const { data } = response;
			if (data.data && data.status.code === 0) {
				yield put(setMessages(data.data));
			}
		}
	} catch (e) {
		console.log('error', e);
	} finally {
		yield put(setLoading({ visible: false }));
	}
}

export default function* messagesSaga() {
	yield all([takeLatest(getMessages.type, handleGetMessages)]);
	yield all([takeLatest(patchMessage.type, handlePatchMessage)]);
}
