import { PayloadAction, createSlice, createAction } from '@reduxjs/toolkit';
import * as Notifications from 'expo-notifications';

import { logout } from '../runtime/runtimeSlice';

export type MessageType = {
	id: number;
	text: string;
	url: string;
	preview: string;
	action: string;
	deleted: boolean;
	read: boolean;
	topic: string;
	sentTime: string;
	vote: string;
	iconType: string;
};

export type MessagesListType = {
	messages: Array<MessageType>;
};

type PatchMessagePayload = {
	messages: Array<MessageType>;
};
export const getMessages = createAction('getMessages');
export const patchMessage = createAction<PatchMessagePayload>('patchMessage');

export type MessagesState = {
	messages: Array<MessageType>;
	messagesLoaded: boolean;
	unreadMessages: number;
};

const initialState: MessagesState = { messages: [], messagesLoaded: false, unreadMessages: 0 };

const messages = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		setMessages: (state, { payload }: PayloadAction<MessagesListType>) => {
			state.messagesLoaded = true;
			state.messages = payload.messages;
			state.unreadMessages = payload.messages.filter(({ read }) => !read).length;
			Notifications.setBadgeCountAsync(state.unreadMessages);
		},
		removeMessage: (state, { payload }: PayloadAction<number>) => {
			state.messages = state.messages.filter(({ id }) => id !== payload);
		},
	},
	extraReducers: {
		[logout.type]: () => {
			return { ...initialState };
		},
	},
});

export const { setMessages, removeMessage } = messages.actions;

export default messages.reducer;
