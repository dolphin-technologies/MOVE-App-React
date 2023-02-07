import React, { useEffect, useCallback } from 'react';
import { FlatList, ListRenderItem, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Screen from '@components/common/Screen';
import MessageCard from '@components/messages/MessageCard';
import NoMessages from '@components/messages/NoMessages';
import { MessageStackParamList } from '@navigation/mainStacks/MessageStack';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { getMessages, MessageType, patchMessage } from '@store/features/messages/messagesSlice';
import { Metrics } from '@styles/index';

const MessagesOverviewScreen = ({ navigation }: NativeStackScreenProps<MessageStackParamList, 'MessagesOverview'>) => {
	const loading = useAppSelector((state) => state.runtime.loading);
	const messages = useAppSelector((state) => state.messages.messages);
	const messagesLoaded = useAppSelector((state) => state.messages.messagesLoaded);

	const dispatch = useAppDispatch();

	const handleMessageDelete = (message: MessageType) => () => dispatch(patchMessage({ messages: [{ ...message, deleted: true }] }));

	const messagePressHandler = (message: MessageType) => () => navigation.navigate('MessageDetails', { messageId: message.id });

	const renderItem: ListRenderItem<MessageType> = ({ item }) => <MessageCard message={item} handleMessagePress={messagePressHandler(item)} handleMessageDelete={handleMessageDelete(item)} />;

	const onRefresh = useCallback(() => {
		dispatch(getMessages());
	}, [dispatch]);

	useEffect(() => {
		onRefresh();
	}, [onRefresh]);

	return (
		<Screen scroll={false} style={styles.screenContainer}>
			<FlatList
				showsVerticalScrollIndicator={false}
				style={styles.listContainer}
				data={messages}
				renderItem={renderItem}
				keyExtractor={(item) => `${item.id}`}
				onRefresh={onRefresh}
				refreshing={loading.visible}
				ListEmptyComponent={messagesLoaded ? <NoMessages /> : <View />}
				contentContainerStyle={{ flexGrow: 1 }}
			/>
		</Screen>
	);
};

const styles = StyleSheet.create({
	screenContainer: {
		paddingTop: 0,
	},
	listContainer: {
		paddingTop: Metrics.normalize(16),
	},
});

export default MessagesOverviewScreen;
