import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import Toast from 'react-native-toast-message';
import i18next from 'i18next';

import {
	loginUser,
	getUser,
	UserType,
	registerUser,
	LoginDataType,
	setAuth,
	setSdkAuth,
	setContractId,
	setProfile,
	updateUser,
	getNewPassword,
	changePassword,
	deleteAccount,
	updateUserEmail,
} from '@store/features/user/userSlice';
import { setLoading, setAppState, logout, registerPushNotifications } from '@store/features/runtime/runtimeSlice';
import { ResponseType } from '@services/api';
import { Api } from '@config/index';
import { initializeMoveSdk } from '@store/features/moveSdk/moveSdkSlice';

import { authenticatedRequestSaga, requestSaga } from '../runtime/requestSaga';

export function* loginUserSaga(action: ReturnType<typeof loginUser>) {
	yield put(setLoading({ visible: true, indicatorVisible: true }));
	try {
		const response: AxiosResponse<ResponseType<LoginDataType>> = yield call(requestSaga, {
			method: Api.ENDPOINT.LOGIN.method,
			url: Api.ENDPOINT.LOGIN.getUrl(),
			data: action.payload,
		});

		if (response) {
			const { data } = response;
			if (data.status.code === 0 && data.data) {
				yield put(setContractId({ contractId: data.data.contractId }));
				yield put(setAuth({ accessToken: data.data.productAuthInfo.accessToken, refreshToken: data.data.productAuthInfo.refreshToken }));
				yield put(setSdkAuth({ accessToken: data.data.sdkUserLoginInfo.accessToken, refreshToken: data.data.sdkUserLoginInfo.refreshToken }));
				yield put(initializeMoveSdk());
				yield put(setAppState({ previousAppState: 'login', appState: 'active' }));
			}
		}
	} catch (e) {
		console.log('error', e);
	} finally {
		yield put(setLoading({ visible: false, indicatorVisible: false }));
	}
}

export function* registerUserSaga(action: ReturnType<typeof registerUser>) {
	yield put(setLoading({ visible: true, indicatorVisible: true }));

	try {
		const response: AxiosResponse<ResponseType<LoginDataType>> = yield call(requestSaga, {
			method: Api.ENDPOINT.REGISTER.method,
			url: Api.ENDPOINT.REGISTER.getUrl(),
			data: action.payload,
		});

		if (response) {
			const { data } = response;

			console.log('registerUserSaga', data);
			if (data.status.code === 0 && data.data) {
				console.log('got user1', data);
				yield put(setContractId({ contractId: data.data.contractId }));
				yield put(setAuth({ accessToken: data.data.productAuthInfo.accessToken, refreshToken: data.data.productAuthInfo.refreshToken }));
				yield put(setSdkAuth({ accessToken: data.data.sdkUserLoginInfo.accessToken, refreshToken: data.data.sdkUserLoginInfo.refreshToken }));
				yield put(initializeMoveSdk());
				yield put(setAppState({ previousAppState: 'register', appState: 'active' }));
			}
		}
	} catch (e) {
		console.log('error', e);
	} finally {
		yield put(setLoading({ visible: false, indicatorVisible: false }));
	}
}

export function* getUserSaga(action: ReturnType<typeof getUser>) {
	yield put(setLoading({ visible: true, indicatorVisible: true }));

	try {
		const response: AxiosResponse<ResponseType<UserType>> = yield call(authenticatedRequestSaga, {
			method: Api.ENDPOINT.GET_USER.method,
			url: Api.ENDPOINT.GET_USER.getUrl(),
			data: action.payload,
		});

		if (response) {
			const { data } = response;

			if (data.status.code === 0 && data.data) {
				yield put(setProfile(data.data));
				yield put(registerPushNotifications());
			}
		}
	} catch (e) {
		console.log('error in getUserSaga ', e);
	} finally {
		yield put(setLoading({ visible: false, indicatorVisible: false }));
	}
}

export function* updateUserSaga(action: ReturnType<typeof updateUser>) {
	yield put(setLoading({ visible: true, indicatorVisible: true }));

	try {
		const response: AxiosResponse<ResponseType<UserType>> = yield call(authenticatedRequestSaga, {
			method: Api.ENDPOINT.UPDATE_USER.method,
			url: Api.ENDPOINT.UPDATE_USER.getUrl(),
			data: action.payload,
		});

		if (response) {
			const { data } = response;
			console.log('updateUserSaga', data);
			if (data.status.code === 0 && data.data) {
				yield put(setProfile(data.data));
			}
		}
	} catch (e) {
		console.log('error in updateUserSaga ', e);
	} finally {
		yield put(setLoading({ visible: false, indicatorVisible: false }));
	}
}

export function* updateUserEmailSaga(action: ReturnType<typeof updateUserEmail>) {
	yield put(setLoading({ visible: true, indicatorVisible: true }));

	try {
		const response: AxiosResponse<ResponseType<UserType>> = yield call(authenticatedRequestSaga, {
			method: Api.ENDPOINT.UPDATE_USER_EMAIL.method,
			url: Api.ENDPOINT.UPDATE_USER_EMAIL.getUrl(),
			data: action.payload,
		});

		if (response) {
			const { data } = response;
			if (data.status.code === 0) {
				Toast.show({
					type: 'info',
					text1: i18next.t('val_check_your_mailbox'),
				});
			}
		}
	} catch (e) {
		console.log('error in updateUserEmail ', e);
	} finally {
		yield put(setLoading({ visible: false, indicatorVisible: false }));
	}
}

export function* resetPasswordSaga(action: ReturnType<typeof getNewPassword>) {
	yield put(setLoading({ visible: true, indicatorVisible: true }));

	try {
		const response: AxiosResponse<ResponseType<UserType>> = yield call(requestSaga, {
			method: Api.ENDPOINT.POST_RESET_PASSWORD.method,
			url: Api.ENDPOINT.POST_RESET_PASSWORD.getUrl(action.payload.email),
			data: action.payload,
		});

		if (response) {
			const { data } = response;
			if (data.status.code === 0) {
				Toast.show({
					type: 'info',
					text1: i18next.t('val_check_your_mailbox'),
				});
			}
		}
	} catch (e) {
		console.log('error in updateUserSaga ', e);
	} finally {
		yield put(setLoading({ visible: false, indicatorVisible: false }));
	}
}

export function* changePasswordSaga(action: ReturnType<typeof changePassword>) {
	yield put(setLoading({ visible: true, indicatorVisible: true }));

	try {
		const response: AxiosResponse<ResponseType<UserType>> = yield call(authenticatedRequestSaga, {
			method: Api.ENDPOINT.PUT_CHANGE_PASSWORD.method,
			url: Api.ENDPOINT.PUT_CHANGE_PASSWORD.getUrl(),
			data: action.payload,
		});

		if (response) {
			const { data } = response;
			if (data.status.code === 0) {
				Toast.show({
					type: 'success',
					text1: i18next.t('val_password_reset_success'),
				});
				yield put(logout());
			}
		}
	} catch (e) {
		console.log('error in updateUserSaga ', e);
	} finally {
		yield put(setLoading({ visible: false, indicatorVisible: false }));
	}
}

export function* deleteAccountSaga(action: ReturnType<typeof deleteAccount>) {
	yield put(setLoading({ visible: true, indicatorVisible: true }));

	try {
		const response: AxiosResponse<ResponseType<UserType>> = yield call(authenticatedRequestSaga, {
			method: Api.ENDPOINT.POST_DELETE_ACCOUNT.method,
			url: Api.ENDPOINT.POST_DELETE_ACCOUNT.getUrl(),
			data: action.payload,
		});

		if (response) {
			const { data } = response;
			if (data.status.code === 0) {
				Toast.show({
					type: 'success',
					text1: i18next.t('hint_delete_successful'),
				});
				yield put(logout());
			}
		}
	} catch (e) {
		console.log('error in deleteAccountSaga ', e);
	} finally {
		yield put(setLoading({ visible: false, indicatorVisible: false }));
	}
}

export default function* userSaga() {
	yield all([
		takeLatest(loginUser.type, loginUserSaga),
		takeLatest(getUser.type, getUserSaga),
		takeLatest(registerUser.type, registerUserSaga),
		takeLatest(updateUser.type, updateUserSaga),
		takeLatest(updateUserEmail.type, updateUserEmailSaga),
		takeLatest(getNewPassword.type, resetPasswordSaga),
		takeLatest(changePassword.type, changePasswordSaga),
		takeLatest(deleteAccount.type, deleteAccountSaga),
	]);
}
