import React from 'react';
import { PermissionStatus as ExpoPermissionStatus } from 'expo-modules-core';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { RESULTS, openSettings, Permission, PermissionStatus } from 'react-native-permissions';
import { useTranslation } from 'react-i18next';

import { Colors, Metrics, Typography } from '@styles/index';

import { customPermissionType, RequestPermissionType } from './PermissionItem';

type PermissionStateButtonType = {
	result: PermissionStatus;
	resultDrawOverlays: boolean | null;
	resultBattery: boolean | null;
	resultNotifications: ExpoPermissionStatus | null;
	requestPermission: (data: RequestPermissionType) => () => void;
	customPermission?: customPermissionType;
	permission?: Permission;
};

const PermissionStateButton = ({ result, resultDrawOverlays, resultBattery, resultNotifications, requestPermission, customPermission, permission }: PermissionStateButtonType) => {
	const { t } = useTranslation();
	if (result === RESULTS.GRANTED || resultNotifications === ExpoPermissionStatus.GRANTED || resultDrawOverlays || resultBattery) {
		return (
			<Pressable style={styles.buttonGranted}>
				<Text style={styles.buttonTextGranted}>{t('btn_granted')}</Text>
			</Pressable>
		);
	}
	if (result === RESULTS.BLOCKED || result === RESULTS.LIMITED || resultNotifications === ExpoPermissionStatus.DENIED) {
		return (
			<Pressable
				onPress={() => {
					openSettings().catch(() => console.warn('Cannot open settings'));
				}}
				style={styles.button}
			>
				<Text style={styles.buttonText}>{t('btn_open_settings')}</Text>
			</Pressable>
		);
	}

	if (result === RESULTS.DENIED || resultNotifications === ExpoPermissionStatus.UNDETERMINED || resultDrawOverlays === false || resultBattery === false) {
		return (
			<Pressable onPress={requestPermission({ customPermission, permission: permission || null })} style={styles.button}>
				<Text style={styles.buttonText}>{t('btn_continue')}</Text>
			</Pressable>
		);
	}
	if (result === RESULTS.UNAVAILABLE) {
		return (
			<Pressable
				onPress={() => {
					Alert.alert(t('txt_feature_not_available'));
				}}
				style={styles.button}
			>
				<Text style={styles.buttonText}>{t('btn_unavailable')}</Text>
			</Pressable>
		);
	}

	return <Text style={styles.buttonText}>{t('btn_loading')}</Text>;
};

export default PermissionStateButton;

const styles = StyleSheet.create({
	button: {
		borderWidth: 1,
		borderColor: Colors.DARK_GREY,
		paddingHorizontal: Metrics.normalize(8),
		paddingVertical: Metrics.normalize(4),
	},
	buttonGranted: {
		borderWidth: 1,
		borderColor: Colors.GREEN_LIGHT,
		backgroundColor: Colors.GREEN_LIGHT,
		paddingHorizontal: Metrics.normalize(8),
		paddingVertical: Metrics.normalize(4),
	},
	buttonText: {
		...Typography.b,
		color: Colors.DARK_BLUE,
		minWidth: Metrics.normalize(70),
		textAlign: 'center',
		fontSize: Metrics.normalize(12),
	},
	buttonTextGranted: {
		...Typography.b,
		color: Colors.WHITE,
		minWidth: Metrics.normalize(70),
		textAlign: 'center',
		fontSize: Metrics.normalize(12),
	},
});
