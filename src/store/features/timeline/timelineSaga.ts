import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { setLoading } from '@store/features/runtime/runtimeSlice';
import { Api } from '@config/index';
import { ResponseType } from '@services/api';

import { getTimeline, getTimelineDetails, setTimeline, setTimelineDetails, TimelineBaseListType, TimelineDetailsType } from './timelineSlice';
import { authenticatedRequestSaga } from '../runtime/requestSaga';

export function* fetchTimeline(action: ReturnType<typeof getTimeline>) {
	yield put(setLoading({ visible: true }));
	try {
		const response: AxiosResponse<ResponseType<TimelineBaseListType>> = yield call(authenticatedRequestSaga, {
			method: Api.ENDPOINT.GET_TIMELINE.method,
			url: Api.ENDPOINT.GET_TIMELINE.getUrl(),
			data: action.payload.data,
		});

		if (response) {
			const { data } = response;
			if (data.data && data.status.code === 0) {
				yield put(setTimeline(data.data));
			}
		}
	} catch (e) {
		console.log('error', e);
	} finally {
		yield put(setLoading({ visible: false }));
	}
}
export function* fetchTimelineDetails(action: ReturnType<typeof getTimelineDetails>) {
	yield put(setLoading({ visible: true, indicatorVisible: true }));
	try {
		const response: AxiosResponse<ResponseType<TimelineDetailsType>> = yield call(authenticatedRequestSaga, {
			method: Api.ENDPOINT.GET_TIMELINE_DETAILS.method,
			url: Api.ENDPOINT.GET_TIMELINE_DETAILS.getUrl(`${action.payload.data.timelineId}`),
		});

		if (response) {
			const { data } = response;
			if (data.data && data.status.code === 0) {
				yield put(setTimelineDetails(data.data));
			}
		}
	} catch (e) {
		console.log('error', e);
	} finally {
		yield put(setLoading({ visible: false, indicatorVisible: false }));
	}
}

export default function* timelineSaga() {
	yield all([takeLatest(getTimeline.type, fetchTimeline)]);
	yield all([takeLatest(getTimelineDetails.type, fetchTimelineDetails)]);
}
