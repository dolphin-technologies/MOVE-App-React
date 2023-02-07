import Constants from 'expo-constants';

export const PRODUCT_ID = Constants.manifest?.extra?.productId;
export const BASE_URL = Constants.manifest?.extra?.baseUrl;

type EndpointName =
	| 'LOGIN'
	| 'REGISTER'
	| 'GET_USER'
	| 'UPDATE_USER'
	| 'UPDATE_USER_EMAIL'
	| 'GET_TIMELINE'
	| 'GET_TIMELINE_DETAILS'
	| 'GET_MESSAGES'
	| 'PATCH_MESSAGE'
	| 'POST_PUSH_TOKEN'
	| 'GET_SDK_TOKEN'
	| 'POST_REFRESH_TOKEN'
	| 'POST_RESET_PASSWORD'
	| 'PUT_CHANGE_PASSWORD'
	| 'POST_DELETE_ACCOUNT';

type EndpointType = {
	method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';
	getUrl: (...args: Array<string>) => string;
};

export const ENDPOINT: Record<EndpointName, EndpointType> = {
	LOGIN: {
		getUrl: () => '/api/v1/users/login',
		method: 'POST',
	},
	REGISTER: {
		getUrl: () => '/api/v1/users',
		method: 'POST',
	},
	GET_USER: {
		getUrl: () => '/api/v1/users',
		method: 'GET',
	},
	UPDATE_USER: {
		getUrl: () => '/api/v1/users',
		method: 'PATCH',
	},
	UPDATE_USER_EMAIL: {
		getUrl: () => '/api/v1/users/email',
		method: 'PUT',
	},
	GET_TIMELINE: {
		getUrl: () => '/api/v1/timeline',
		method: 'GET',
	},
	GET_TIMELINE_DETAILS: {
		getUrl: (timelineId: string) => `/api/v1/timeline/${timelineId}/details`,
		method: 'GET',
	},
	GET_MESSAGES: {
		getUrl: () => '/api/v1/messages',
		method: 'GET',
	},
	PATCH_MESSAGE: {
		getUrl: () => '/api/v1/messages',
		method: 'PATCH',
	},
	POST_PUSH_TOKEN: {
		getUrl: () => '/api/v1/messages/tokens',
		method: 'POST',
	},
	GET_SDK_TOKEN: {
		getUrl: () => '/api/v1/users/tokens/sdks',
		method: 'GET',
	},
	POST_REFRESH_TOKEN: {
		getUrl: () => '/api/v1/users/tokens/products',
		method: 'POST',
	},
	POST_RESET_PASSWORD: {
		getUrl: () => '/api/v1/users/passwords/resets',
		method: 'POST',
	},
	PUT_CHANGE_PASSWORD: {
		getUrl: () => '/api/v1/users/passwords',
		method: 'PUT',
	},
	POST_DELETE_ACCOUNT: {
		getUrl: () => '/api/v1/users/delete',
		method: 'POST',
	},
};
