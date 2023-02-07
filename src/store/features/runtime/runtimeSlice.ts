import { PayloadAction, createSlice, createAction } from '@reduxjs/toolkit';
import { NotificationResponse } from 'expo-notifications';
import moment from 'moment';

export const initializeApp = createAction('initializeApp');
export const loadStorageData = createAction('loadStorageData');
export const registerPushNotifications = createAction('registerPushNotifications');
export const refreshToken = createAction('refreshToken');
export const createAndroidChannel = createAction('createAndroidChannel');
export const refreshTokenSuccess = createAction('refreshTokenSuccess');
export const refreshTokenFailure = createAction('refreshTokenFailure');
export const logout = createAction('logout');
export const appStateChange = createAction('appStateChange');

export type RefreshTokenType = {
	productAuthInfo: {
		accessToken: string;
		refreshToken: string;
	};
};

export type LoadingType = {
	visible: boolean;
	indicatorVisible?: boolean;
};
export type CustomAppStateType = 'terminated' | 'background' | 'register' | 'login' | 'unknown' | 'active' | 'inactive' | 'extension';

export type AppStateType = {
	previousAppState: CustomAppStateType;
	appState: CustomAppStateType;
};

export type UiState = {
	loading: LoadingType;
	initialized: boolean;
	pushToken: string;
	lastNotification: NotificationResponse | null;
	previousAppState: CustomAppStateType;
	appState: CustomAppStateType;
	log: Array<string>;
};

const initialState: UiState = {
	loading: { visible: false, indicatorVisible: false },
	initialized: false,
	pushToken: '',
	previousAppState: 'terminated',
	appState: 'terminated',
	log: [],
	lastNotification: null,
};

const runtime = createSlice({
	name: 'runtime',
	initialState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<LoadingType>) => {
			state.loading = payload;
		},
		setInitialized: (state, { payload }: PayloadAction<boolean>) => {
			state.initialized = payload;
		},
		setPushToken: (state, { payload }: PayloadAction<string>) => {
			state.pushToken = payload;
		},
		setAppState: (state, { payload }: PayloadAction<AppStateType>) => {
			state.appState = payload.appState;
			state.previousAppState = payload.previousAppState;
		},

		setLastNotification: (state, { payload }: PayloadAction<NotificationResponse>) => {
			state.lastNotification = payload;
		},

		addLog: (state, { payload }: PayloadAction<string>) => {
			console.log(`${moment().format()} ${payload}`);
			state.log = [...state.log, `${moment().format()} ${payload}`].slice(-100);
		},
		clearLog: (state) => {
			state.log = [];
		},
	},
	extraReducers: {
		[logout.type]: () => {
			return { ...initialState, initialized: true };
		},
	},
});

export const { setLoading, setInitialized, setAppState, setPushToken, addLog, clearLog, setLastNotification } = runtime.actions;

export default runtime.reducer;
