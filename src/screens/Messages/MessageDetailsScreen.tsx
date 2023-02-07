import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import moment from 'moment';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Screen from '@components/common/Screen';
import { BlackTrashBin, MessageNavigationBack, MessageNavigationForward } from '@components/common/Icons';
import { MessageStackParamList } from '@navigation/mainStacks/MessageStack';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { MessageType, patchMessage } from '@store/features/messages/messagesSlice';
import { Colors, Metrics, Typography } from '@styles/index';
import OverlayActivityIndicator from '@components/common/OverlayActivityIndicator';

type MessageHeaderProps = {
	sendTime: string;
	title: string;
};

const MessageHeader = ({ sendTime, title }: MessageHeaderProps) => (
	<View style={styles.messageHeader}>
		<Text style={styles.messageHeaderDate}>{moment.parseZone(sendTime, moment.ISO_8601).format('MMMM Do YYYY, HH:mm')}</Text>
		<Text style={styles.messageHeaderTitle}>{title}</Text>
	</View>
);

const MessageDetailsScreen = ({ navigation, route }: NativeStackScreenProps<MessageStackParamList, 'MessageDetails'>) => {
	const [messageId, setMessageId] = useState<number>(route.params.messageId);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const messages = useAppSelector((state) => state.messages.messages);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (route.params.messageId > 0) {
			setMessageId(route.params.messageId);
		}
	}, [route.params.messageId]);

	const handleMessageDelete = (message: MessageType) => () => {
		dispatch(patchMessage({ messages: [{ ...message, deleted: true }] }));
		if (messages.length < 2) {
			return navigation.navigate('MessagesOverview');
		}
		if (nextMessage) {
			return switchToNextMessage();
		} else {
			switchToPrevMessage();
		}
	};

	const chosenMessage = useMemo(() => messages.find(({ id }) => id === messageId), [messageId, messages]);

	useEffect(() => {
		if (!chosenMessage || chosenMessage.read) {
			return;
		}
		dispatch(patchMessage({ messages: [{ ...chosenMessage, read: true }] }));
	}, [chosenMessage, dispatch]);

	if (!chosenMessage) {
		return <OverlayActivityIndicator />;
	}

	const prevMessage = messages.find((_: MessageType, index, arr) => arr[index + 1]?.id === messageId);
	const nextMessage = messages.find((_: MessageType, index, arr) => arr[index - 1]?.id === messageId);

	const switchToNextMessage = () => {
		if (!nextMessage) {
			return;
		}
		setIsLoading(true);
		setMessageId(nextMessage.id);
	};
	const switchToPrevMessage = () => {
		if (!prevMessage) {
			return;
		}
		setIsLoading(true);
		setMessageId(prevMessage.id);
	};

	return (
		<Screen scroll={false} edges={['left', 'right', 'bottom']} style={styles.screenContainer} header={<MessageHeader sendTime={chosenMessage.sentTime} title={chosenMessage.text} />}>
			{isLoading && <OverlayActivityIndicator />}
			<WebView
				source={{ uri: chosenMessage.url }}
				showsVerticalScrollIndicator={false}
				style={{ opacity: isLoading ? 0 : 1 }}
				contentInset={{ top: 16 }} // TODO: add top padding in webview
				onLoadEnd={() => setIsLoading(false)}
			/>
			<View style={styles.controlButtonsContainer}>
				<View style={styles.navigationButtons}>
					<Pressable onPress={switchToPrevMessage} style={{ marginRight: Metrics.normalize(40) }} disabled={!prevMessage}>
						<MessageNavigationBack type={prevMessage ? 'active' : 'inactive'} />
					</Pressable>
					<Pressable onPress={switchToNextMessage} disabled={!nextMessage}>
						<MessageNavigationForward type={nextMessage ? 'active' : 'inactive'} />
					</Pressable>
				</View>
				<Pressable onPress={handleMessageDelete(chosenMessage)}>
					<BlackTrashBin />
				</Pressable>
			</View>
		</Screen>
	);
};

const styles = StyleSheet.create({
	messageHeader: {
		paddingHorizontal: Metrics.normalize(16),
		backgroundColor: Colors.PALE_GREY,
		paddingTop: Metrics.normalize(16),
		paddingBottom: Metrics.normalize(27),
	},
	messageHeaderDate: {
		...Typography.p,
		color: Colors.GREY,
		marginBottom: Metrics.normalize(14),
	},
	messageHeaderTitle: {
		...Typography.b,
		fontSize: Metrics.normalize(17),
	},
	screenContainer: {
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
	controlButtonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: Metrics.normalize(16),
		marginBottom: Metrics.normalize(20),
	},
	navigationButtons: {
		flexDirection: 'row',
	},
});

export default MessageDetailsScreen;
