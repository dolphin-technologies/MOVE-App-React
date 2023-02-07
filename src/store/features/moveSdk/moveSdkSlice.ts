import { SdkState, TripState, AuthState, ErrorListType } from 'react-native-move-sdk';
import { PayloadAction, createSlice, createAction } from '@reduxjs/toolkit';

import { logout } from '../runtime/runtimeSlice';

export const listenersReady = createAction('listenersReady');
export const initializeMoveSdk = createAction('initializeMoveSdk');
export const refreshMoveSdkToken = createAction('refreshMoveSdkToken');

export type MoveSdkState = {
	sdkState: SdkState | null;
	tripState: TripState | null;
	authState: AuthState | null;
	errors: ErrorListType;
	warnings: ErrorListType;
};

const initialState: MoveSdkState = { sdkState: null, tripState: null, authState: null, errors: [], warnings: [] };

const moveSdk = createSlice({
	name: 'moveSdk',
	initialState,
	reducers: {
		setSdkState: (state, { payload }: PayloadAction<SdkState | null>) => {
			state.sdkState = payload;
		},
		setTripState: (state, { payload }: PayloadAction<TripState | null>) => {
			state.tripState = payload;
		},
		setAuthState: (state, { payload }: PayloadAction<AuthState | null>) => {
			state.authState = payload;
		},
		setErrors: (state, { payload }: PayloadAction<ErrorListType>) => {
			state.errors = payload;
		},
		setWarnings: (state, { payload }: PayloadAction<ErrorListType>) => {
			state.warnings = payload;
		},
	},
	extraReducers: {
		[logout.type]: () => {
			return { ...initialState };
		},
	},
});

export const { setSdkState, setTripState, setAuthState, setErrors, setWarnings } = moveSdk.actions;

export default moveSdk.reducer;
