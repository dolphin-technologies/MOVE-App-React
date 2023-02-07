import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import moment from 'moment';

import { MessageChevronForward, WhiteTrashBin } from '@components/common/Icons';
import { MessageType } from '@store/features/messages/messagesSlice';
import { Colors, Metrics, Typography } from '@styles/index';

type MessageCardProps = {
	message: MessageType;
	handleMessageDelete: () => void;
	handleMessagePress: () => void;
};

const MessageCard = ({ message, handleMessageDelete, handleMessagePress }: MessageCardProps) => {
	const { text, sentTime, preview, read } = message;

	const renderRightActions = (_: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
		dragX.removeAllListeners();
		dragX.addListener(({ value }) => {
			if (value > -Metrics.wp(80)) {
				return;
			} //remove item with swipe range more than 80% of width
			handleMessageDelete();
			dragX.removeAllListeners();
		});

		return (
			<RectButton style={styles.removeButton} onPress={handleMessageDelete}>
				<WhiteTrashBin />
			</RectButton>
		);
	};

	return (
		<Swipeable containerStyle={styles.swipeContainer} renderRightActions={renderRightActions}>
			<RectButton style={styles.messageContainer} onPress={handleMessagePress}>
				{!read && <View style={styles.unreadMark} />}
				<View style={styles.firstLine}>
					<Text style={styles.messageTitle}>{text}</Text>
					<View style={styles.messageDate}>
						<Text style={styles.messageDateText}>{moment.parseZone(sentTime, moment.ISO_8601).format('D MMM.')}</Text>
						<MessageChevronForward />
					</View>
				</View>
				<Text numberOfLines={2} style={styles.messagePreviewText}>
					{preview}
				</Text>
			</RectButton>
		</Swipeable>
	);
};

const styles = StyleSheet.create({
	swipeContainer: {
		backgroundColor: Colors.RED,
		borderRadius: Metrics.normalize(10),
		marginBottom: Metrics.normalize(8),
	},
	messageContainer: {
		backgroundColor: Colors.PALE_GREY,
		borderRadius: Metrics.normalize(10),
		paddingVertical: Metrics.normalize(16),
		paddingLeft: Metrics.normalize(24),
		paddingRight: Metrics.normalize(8),
	},
	removeButton: {
		backgroundColor: Colors.RED,
		width: Metrics.normalize(70),
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexDirection: 'row',
		paddingRight: Metrics.normalize(14),
	},
	unreadMark: {
		width: Metrics.normalize(8),
		height: Metrics.normalize(8),
		backgroundColor: Colors.GREEN,
		borderRadius: Metrics.normalize(10),
		position: 'absolute',
		top: Metrics.normalize(21),
		left: Metrics.normalize(8),
	},
	firstLine: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: Metrics.normalize(8),
	},
	messageTitle: {
		...Typography.b,
		lineHeight: Metrics.normalize(17),
		width: Metrics.wp(65),
	},
	messageDate: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	messageDateText: {
		...Typography.p,
		fontSize: Metrics.normalize(12),
		marginRight: Metrics.normalize(8),
	},
	messagePreviewText: {
		...Typography.p,
		color: Colors.GREY,
		width: Metrics.wp(80),
	},
});

export default MessageCard;
