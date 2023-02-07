import createSagaMiddleware from 'redux-saga';
import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit';

import userReducer from '@store/features/user/userSlice';
import runtimeReducer from '@store/features/runtime/runtimeSlice';
import moveSdkReducer from '@store/features/moveSdk/moveSdkSlice';
import timelineReducer from '@store/features/timeline/timelineSlice';
import messagesReducer from '@store/features/messages/messagesSlice';
import rootSaga from '@store/sagas';
import { injectStore } from '@services/api';

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
	moveSdk: moveSdkReducer,
	user: userReducer,
	runtime: runtimeReducer,
	timeline: timelineReducer,
	messages: messagesReducer,
});

const middlewares: Array<Middleware> = [sagaMiddleware];

if (__DEV__) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const createDebugger = require('redux-flipper').default;
	middlewares.push(createDebugger());
}

export const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), ...middlewares],
});

export type Store = typeof store;
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);

injectStore(store);
