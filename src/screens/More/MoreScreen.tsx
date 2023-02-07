import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';

import Screen from '@components/common/Screen';
import { Forward } from '@components/common/Icons';
import { RootStackParamList } from '@navigation/Root';
import { MoreStackParamList } from '@navigation/mainStacks/MoreStack';
import { Urls } from '@config/index';
import { useAppSelector } from '@hooks/redux';
import { Colors, Metrics, Typography } from '@styles/index';

const DEBUG_THRESHOLD = 20;

type LinkItemProps = {
	title: string;
	onPress: () => void;
};

const LinkItem = ({ title, onPress }: LinkItemProps) => {
	return (
		<Pressable
			style={(state) => {
				return [styles.navigationItem, state.pressed && styles.navigationItemPressed];
			}}
			onPress={onPress}
		>
			<Text style={styles.navigationText}>{title}</Text>
			<Forward />
		</Pressable>
	);
};

const MoreScreen = ({ navigation }: CompositeScreenProps<NativeStackScreenProps<RootStackParamList>, NativeStackScreenProps<MoreStackParamList, 'More'>>) => {
	const { t } = useTranslation();

	const contractId = useAppSelector((state) => state.user.contractId);

	const [debugMode, setDebugMode] = useState(0);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (debugMode < DEBUG_THRESHOLD) {
				setDebugMode(0);
			}
		}, 1000);

		return () => clearInterval(timeout);
	}, [debugMode]);

	const onProfilePress = () => {
		navigation.navigate('Profile');
	};

	const onDebugPress = () => {
		navigation.navigate('Debug');
	};

	const onWebViewPress = (url: string, title: string) => () => {
		navigation.navigate('WebView', { url, title });
	};

	return (
		<Screen style={{ paddingRight: 0 }}>
			<View style={styles.navigation}>
				<LinkItem title={t('lbl_profile')} onPress={onProfilePress} />
				<LinkItem title={t('lbl_inf')} onPress={onWebViewPress(Urls.INFO_HELP, t('lbl_inf'))} />
				<LinkItem title={t('lbl_imp')} onPress={onWebViewPress(Urls.IMPRINT_ABOUT, t('lbl_imp'))} />
				<LinkItem title={t('lbl_tou')} onPress={onWebViewPress(Urls.TERMS_OF_USE, t('lbl_tou'))} />
				<LinkItem title={t('lbl_data_privacy')} onPress={onWebViewPress(Urls.PRIVACY_POLICY, t('lbl_data_privacy'))} />
				{debugMode === DEBUG_THRESHOLD ? <LinkItem title={t('tit_debug')} onPress={onDebugPress} /> : null}
			</View>

			<View style={styles.infoBox}>
				<Pressable
					onPress={() => {
						setDebugMode((state) => state + 1);
					}}
				>
					<Text>
						{t('txt_user_id')} {contractId} {debugMode > 9 && debugMode < DEBUG_THRESHOLD ? `${DEBUG_THRESHOLD - debugMode} x` : null}
					</Text>
					<Text>
						{t('txt_version')} {Constants.manifest?.version} ({Constants.manifest?.extra?.buildNumber})
					</Text>
				</Pressable>
			</View>
		</Screen>
	);
};

const styles = StyleSheet.create({
	navigation: {
		paddingBottom: Metrics.normalize(24),
	},
	navigationItem: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: Colors.LIGHT_GREY,
		paddingVertical: Metrics.normalize(16),
		paddingRight: Metrics.normalize(16),
	},
	navigationItemPressed: {
		backgroundColor: Colors.PALE_GREY,
	},
	navigationText: {
		...Typography.b,
		lineHeight: Metrics.normalize(14),
		color: Colors.DARK_BLUE,
	},
	infoBox: {
		backgroundColor: Colors.PALE_GREY,
		borderRadius: 10,
		padding: Metrics.normalize(16),
		marginRight: Metrics.normalize(16),
	},
});

export default MoreScreen;
