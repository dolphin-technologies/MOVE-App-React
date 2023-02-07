import axios, { AxiosResponse, Method } from 'axios';
import moment from 'moment';
import { Platform } from 'react-native';
import { getVersion, getUniqueId } from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import * as Sentry from 'sentry-expo';
import { CANCEL } from 'redux-saga';

import { Api, Codes } from '@config/index';
import { refreshToken } from '@store/features/runtime/runtimeSlice';
import { Store } from '@store/index';

type PlatformName = 'ios' | 'android' | 'windows' | 'web' | 'macos';
const os: Record<PlatformName, string> = { ios: 'iOS', android: 'Android', windows: 'windows', web: 'web', macos: 'macos' };

const axiosResource = axios.create({
	baseURL: Api.BASE_URL,
	timeout: 20000,
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
		'Cache-Control': 'no-cache',
		'Accept-Language': 'de',
		'x-app-appversion': getVersion(),
		'x-app-appid': getUniqueId(),
		'x-app-platform': os[Platform.OS],
		Accept: '*/*',
	},
});

let store: Store;
export const injectStore = (_store: Store) => {
	store = _store;
};

axiosResource.interceptors.request.use(
	(config) => {
		const accessToken = store.getState().user.auth.accessToken;

		const contractId = store.getState().user.contractId;
		if (config) {
			if (config.headers) {
				config.headers['Date'] = moment().format();
				if (contractId) {
					config.headers['x-app-contractId'] = contractId;
				}

				if (accessToken) {
					config.headers['Authorization'] = `Bearer ${accessToken}`;
				}
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosResource.interceptors.response.use(
	(response) => {
		if (response.data?.status !== 0) {
			if (response.data?.status?.code) {
				Toast.show({
					type: 'error',
					text1: `Status: ${response.data.status.code}`,
					text2: response.data.status?.message,
				});
			}
		}
		return response;
	},
	(error) => {
		let showAlert = true;
		if (error.response.status === 401) {
			if (error.response?.data?.status?.code === Codes.JWT_EXPIRED || error.response?.data?.status?.code === Codes.JWT_EXPIRED_DEPRECATED) {
				store.dispatch(refreshToken());
				showAlert = false;
			}
		}
		if (error?.response?.status !== 0) {
			if (showAlert) {
				Toast.show({
					type: 'error',
					text1: `Status: ${error?.response?.status} ${error?.response?.data?.status?.message || ''}`,
					text2: `Code: ${error?.response?.data?.status?.code || ''} ${error?.response?.data?.status?.technicalMsg || ''}`,
				});
			}
			Sentry.Native.captureException(error);
		} else {
			Toast.show({
				type: 'error',
				text1: `~Please check your internet connection`,
			});
		}

		console.log('message', error?.response?.status, error?.response?.data?.status?.message, error?.response?.data?.status?.code, error?.response?.data?.status?.technicalMsg);

		return Promise.reject(error);
	}
);

export type ResponseType<T = void> = {
	status: { code: number; message: string };
	data?: T;
};

export function request<T>(method: Method, url: string, data?: T) {
	const controller = new AbortController();
	const dataOrParams = method === 'GET' ? 'params' : 'data';

	const axiosRequest: Promise<AxiosResponse> = axiosResource.request({
		url,
		method,
		[dataOrParams]: data,

		signal: controller.signal,
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	axiosRequest[CANCEL] = () => controller.abort();

	return axiosRequest;
}
