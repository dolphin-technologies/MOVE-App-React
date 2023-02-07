import { PayloadAction, createSlice, createAction } from '@reduxjs/toolkit';

import { LocalStorage } from '@services/index';

import { logout } from '../runtime/runtimeSlice';

export type MoveSdkLoginInfoType = {
	contractId: string;
	audience: string;
	installationId: string;
	productId: number;
	jwt: string;
	refreshToken: string;
	accessToken: string;
};

export type LoginDataType = {
	contractId: string;
	sdkUserLoginInfo: MoveSdkLoginInfoType;
	productAuthInfo: {
		accessToken: string;
		refreshToken: string;
	};
	consents: Array<{
		type: string;
		state: boolean;
		webUrl: string;
		docVersion: string;
	}>;
};

export type AuthType = {
	accessToken: string;
	refreshToken: string;
};

export type ContractIdType = {
	contractId: string;
};

export type UserType = {
	contractId: string;
	firstName: string;
	lastName: string;
	email: string;
	gender: string;
	phone: string;
	company: string;
	consents: Array<{
		type: string;
		state: boolean;
		webUrl?: string;
		docVersion?: string;
	}>;
};

type LoginUserPayload = {
	email: string;
	password: string;
};
export const loginUser = createAction<LoginUserPayload>('loginUser');

type GetNewPasswordPayload = {
	email: string;
};
export const getNewPassword = createAction<GetNewPasswordPayload>('getNewPassword');
export const changePassword = createAction<ChangePasswordPayload>('changePassword');
export const deleteAccount = createAction<DeleteAccountPayload>('deleteAccount');

export const getUser = createAction('getUser');

type RegisterUserPayload = Omit<UserType, 'contractId'> & { password: string };

export const registerUser = createAction<RegisterUserPayload>('registerUser');

export type UpdateUserPayload = {
	gender: string;
	firstName: string;
	lastName: string;
	email?: string;
	password?: string;
	phone: string;
	company: string;
};
export const updateUser = createAction<UpdateUserPayload>('updateUser');

export type UpdateUserEmailPayload = {
	email: string;
	password: string;
};
export const updateUserEmail = createAction<UpdateUserEmailPayload>('updateUserEmail');

export type ChangePasswordPayload = {
	password: string;
	newPassword: string;
};

export type DeleteAccountPayload = {
	password: string;
};

export type UserState = {
	contractId: string | null;
	company: string;
	email: string;
	phone: string;
	firstName: string;
	lastName: string;
	gender: string;

	auth: {
		accessToken: string | null;
		refreshToken: string | null;
	};
	sdkAuth: {
		accessToken: string | null;
		refreshToken: string | null;
	};
};

const initialState: UserState = {
	contractId: null,
	auth: {
		accessToken: null,
		refreshToken: null,
	},
	sdkAuth: {
		accessToken: null,
		refreshToken: null,
	},

	company: '',
	email: '',
	phone: '',
	firstName: '',
	lastName: '',
	gender: '',
};

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setContractId: (state, { payload }: PayloadAction<ContractIdType>) => {
			state.contractId = payload.contractId;
			const setStorageData = async () => {
				try {
					await LocalStorage.setLoginData({ contractId: payload.contractId });
				} catch (e) {
					console.log('error save contractid', e);
				}
			};
			setStorageData();
		},
		setAuth: (state, { payload }: PayloadAction<AuthType>) => {
			state.auth.accessToken = payload.accessToken;
			state.auth.refreshToken = payload.refreshToken;

			const setStorageData = async () => {
				try {
					await Promise.all([LocalStorage.setAppAccessToken(payload.accessToken), LocalStorage.setAppRefreshToken(payload.refreshToken)]);
				} catch (e) {
					console.log('error save setAuth', e);
				}
			};
			setStorageData();
		},

		setSdkAuth: (state, { payload }: PayloadAction<AuthType>) => {
			state.sdkAuth.accessToken = payload.accessToken;
			state.sdkAuth.refreshToken = payload.refreshToken;

			const setStorageData = async () => {
				try {
					await Promise.all([LocalStorage.setSdkAccessToken(payload.accessToken), LocalStorage.setSdkRefreshToken(payload.refreshToken)]);
				} catch (e) {
					console.log('error save setSdkAuth', e);
				}
			};
			setStorageData();
		},

		setProfile: (state, { payload }: PayloadAction<UserType>) => {
			state.company = payload.company;
			state.email = payload.email;
			state.firstName = payload.firstName;
			state.lastName = payload.lastName;
			state.phone = payload.phone;
			state.gender = payload.gender;
		},
	},
	extraReducers: {
		[logout.type]: () => {
			LocalStorage.deleteAllData();
			return initialState;
		},
	},
});

export const { setProfile, setAuth, setSdkAuth, setContractId } = user.actions;

export default user.reducer;
