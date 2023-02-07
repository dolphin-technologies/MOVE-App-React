import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeaderTitle, useHeaderHeight } from '@react-navigation/elements';
import { NativeStackNavigationOptions, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, Route } from '@react-navigation/native';

import { useAppSelector } from '@hooks/redux';
import { Colors, Metrics, Typography } from '@styles/index';

import HeaderBackground from './HeaderBackground';
import { Back, Message } from './Icons';

type NavigationHeaderProps = {
	back:
		| {
				title: string;
		  }
		| undefined;
	navigation: NativeStackNavigationProp<ParamListBase>;
	options: NativeStackNavigationOptions;
	route: Route<string, object | undefined>;
};
const NavigationHeader = ({ navigation, options, route, back }: NavigationHeaderProps) => {
	const contractId = useAppSelector((state) => state.user.contractId);
	const unreadMessages = useAppSelector((state) => state.messages.unreadMessages);

	const insets = useSafeAreaInsets();
	const title = getHeaderTitle(options, route.name);
	let headerHeight = useHeaderHeight();

	const isMessageScreen = route.name === 'MessagesOverview' || route.name === 'MessageDetails';
	const messageButtonPressHandler = () => navigation.navigate('MessageStack');
	const goBack = () => {
		navigation.goBack();
	};

	//headerHeight = Metrics.normalize(55) + insets.top;
	let headerPadding = insets.top;

	if (isMessageScreen && Platform.OS === 'ios') {
		headerHeight = Metrics.normalize(60);
		headerPadding = Metrics.normalize(0);
	}

	return (
		<View style={{ height: headerHeight, paddingTop: headerPadding }}>
			<View style={styles.background}>
				<HeaderBackground />
			</View>
			<View style={styles.content}>
				<View style={styles.left}>
					{back || isMessageScreen ? (
						<Pressable style={styles.leftButton} onPress={goBack}>
							<Back />
						</Pressable>
					) : null}
				</View>
				<Text numberOfLines={1} style={styles.title}>
					{title}
				</Text>
				<View style={styles.right}>
					{contractId ? (
						<Pressable style={styles.rightButton} onPress={messageButtonPressHandler}>
							<Message type={isMessageScreen ? 'active' : 'inactive'} />
							{unreadMessages ? (
								<View style={styles.unreadMessagesMark}>
									<Text style={[Typography.p, { color: Colors.WHITE, fontSize: Metrics.normalize(unreadMessages > 99 ? 8 : 12), lineHeight: Metrics.normalize(unreadMessages > 99 ? 8 : 12) }]}>
										{unreadMessages}
									</Text>
								</View>
							) : null}
						</Pressable>
					) : null}
				</View>
			</View>
		</View>
	);
};

export default NavigationHeader;

const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	left: {
		width: 30,
		marginRight: 'auto',
		justifyContent: 'center',
	},
	right: {
		width: 30,
		justifyContent: 'center',
		marginLeft: 'auto',
	},
	title: {
		...Typography.h1,
		color: Colors.WHITE,
	},
	leftButton: {
		paddingLeft: 8,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	rightButton: {
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	unreadMessagesMark: {
		alignItems: 'center',
		justifyContent: 'center',
		width: Metrics.normalize(16),
		height: Metrics.normalize(16),
		borderRadius: Metrics.normalize(8),
		backgroundColor: Colors.RED,
		position: 'absolute',
		left: Metrics.normalize(8),
		top: Metrics.normalize(0),
	},
});
