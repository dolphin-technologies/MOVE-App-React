import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as Sentry from 'sentry-expo';

export type StoreLoginDataType = {
	contractId: string;
};
export type StoreAuthTokenType = {
	appAccessToken: string;
	appRefreshToken: string;
	sdkAccessToken: string;
	sdkRefreshToken: string;
};

export const setAppAccessToken = (token: string) => {
	return SecureStore.setItemAsync('appAccessToken', JSON.stringify({ appAccessToken: token }));
};

export const setAppRefreshToken = (token: string) => {
	return SecureStore.setItemAsync('appRefreshToken', JSON.stringify({ appRefreshToken: token }));
};

export const setSdkAccessToken = (token: string) => {
	return SecureStore.setItemAsync('sdkAccessToken', JSON.stringify({ sdkAccessToken: token }));
};

export const setSdkRefreshToken = (token: string) => {
	return SecureStore.setItemAsync('sdkRefreshToken', JSON.stringify({ sdkRefreshToken: token }));
};

export const setLoginData = (loginData: StoreLoginDataType) => {
	return SecureStore.setItemAsync('loginData', JSON.stringify(loginData));
};

export const getAllTokens = async () => {
	const allTokens = {
		appAccessToken: '',
		appRefreshToken: '',
		sdkAccessToken: '',
		sdkRefreshToken: '',
	};
	try {
		await Promise.all([
			SecureStore.getItemAsync('appAccessToken'),
			SecureStore.getItemAsync('appRefreshToken'),
			SecureStore.getItemAsync('sdkAccessToken'),
			SecureStore.getItemAsync('sdkRefreshToken'),
		]).then((values) => {
			values.map((data) => {
				if (data) {
					const storageData = JSON.parse(data);

					if (storageData?.appAccessToken) {
						allTokens.appAccessToken = storageData.appAccessToken;
					}
					if (storageData?.appRefreshToken) {
						allTokens.appRefreshToken = storageData.appRefreshToken;
					}
					if (storageData?.sdkAccessToken) {
						allTokens.sdkAccessToken = storageData.sdkAccessToken;
					}
					if (storageData?.sdkRefreshToken) {
						allTokens.sdkRefreshToken = storageData.sdkRefreshToken;
					}
				}
			});
		});
	} catch (error) {
		console.log('START DELETING DATA sdkAccessToken');
		await SecureStore.deleteItemAsync('appAccessToken');
		await SecureStore.deleteItemAsync('appRefreshToken');
		await SecureStore.deleteItemAsync('sdkAccessToken');
		await SecureStore.deleteItemAsync('sdkRefreshToken');
		console.log('END DELETING DATA');
		Sentry.Native.captureException(error);
	}

	return allTokens;
};

export const getLoginData = async () => {
	let loginData: StoreLoginDataType | null = null;
	try {
		const loginDataStore = await SecureStore.getItemAsync('loginData');
		if (loginDataStore) {
			loginData = JSON.parse(loginDataStore);
		}
	} catch (error) {
		await SecureStore.deleteItemAsync('loginData');
		Sentry.Native.captureException(error);
	}

	return loginData;
};

export const getToken = async (type: 'appAccessToken' | 'appRefreshToken' | 'sdkAccessToken' | 'sdkRefreshToken') => {
	let token: string | null = null;
	try {
		const tokenStore = await SecureStore.getItemAsync(type);
		if (tokenStore) {
			const tokenData = JSON.parse(tokenStore);
			if (tokenData[type]) {
				token = tokenData[type];
			}
		}
	} catch (error) {
		console.log('START DELETING DATA getToken');
		await SecureStore.deleteItemAsync(type);
		Sentry.Native.captureException(error);
	}

	return token;
};

export const deleteAllData = async () => {
	console.log('########################deleteAllData##################################');
	try {
		await Promise.all([
			SecureStore.deleteItemAsync('appAccessToken'),
			SecureStore.deleteItemAsync('appRefreshToken'),
			SecureStore.deleteItemAsync('sdkAccessToken'),
			SecureStore.deleteItemAsync('sdkRefreshToken'),
			SecureStore.deleteItemAsync('loginData'),
		]);
	} catch (error) {
		console.log('error deleteAllData');
		Sentry.Native.captureException(error);
	}
};

export const deleteAllDataOnInitialRun = async () => {
	try {
		const isFirstAppStart = await AsyncStorage.getItem('isFirstAppStart');
		if (isFirstAppStart) {
			return;
		}
		await deleteAllData();
		AsyncStorage.setItem('isFirstAppStart', 'true');
	} catch (error) {
		console.log('error getItem isFirstAppStart');
		Sentry.Native.captureException(error);
	}
};

export const setStorageData = async (key: string, value: string) => {
	try {
		await AsyncStorage.setItem(key, value);
		console.log('setStorageData', key);
	} catch (error) {
		console.log('error setStorageData');
		Sentry.Native.captureException(error);
	}
};

export const getStorageData = async (key: string) => {
	try {
		const data = await AsyncStorage.getItem(key);
		if (data) {
			return data;
		}
		return null;
	} catch (error) {
		Sentry.Native.captureException(error);
	}
};

export const removeData = async (key: string) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {
		Sentry.Native.captureException(error);
	}
};
