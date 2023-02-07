import React from 'react';
import * as Notifications from 'expo-notifications';
import { PermissionStatus as ExpoPermissionStatus } from 'expo-modules-core';
import { StyleSheet, Text, View } from 'react-native';
import { request, check, Permission, PermissionStatus, RESULTS } from 'react-native-permissions';
import { useState, useEffect } from 'react';
import MoveSdk from 'react-native-move-sdk';

import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { Colors, Metrics, Typography } from '@styles/index';

import PermissionStateButton from './PermissionStateButton';

export type customPermissionType = 'notification' | 'drawOverlay' | 'battery';

export type PermissionItemProps = {
	title: string;
	text: string;
	permission?: Permission;
	additionalPermission?: Permission | null;
	customPermission?: customPermissionType;
};

export type RequestPermissionType = {
	permission: Permission | null;
	additional?: boolean;
	customPermission?: customPermissionType;
};

const PermissionItem = ({ title, text, permission, additionalPermission, customPermission }: PermissionItemProps) => {
	const [result, setResult] = useState<PermissionStatus>(RESULTS.UNAVAILABLE);
	const [resultNotifications, setResultNotifications] = useState<ExpoPermissionStatus>(ExpoPermissionStatus.UNDETERMINED);
	const [resultDrawOverlays, setResultDrawOverlays] = useState(false);
	const [resultBattery, setResultBattery] = useState(false);
	const appState = useAppSelector((state) => state.runtime.appState);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (appState === 'active' || !appState) {
			if (permission) {
				check(permission)
					.then((result) => {
						if (result === RESULTS.GRANTED && additionalPermission) {
							check(additionalPermission)
								.then((result) => {
									setResult(result);
								})
								.catch((error) => {
									console.log('error', error);
								});
						} else {
							setResult(result);
						}
					})
					.catch((error) => {
						console.log('error', error);
					});
			}
		}
	}, [permission, additionalPermission, appState, dispatch]);

	useEffect(() => {
		if (appState === 'active' || !appState) {
			if (customPermission === 'notification') {
				Notifications.getPermissionsAsync()
					.then((result: Notifications.NotificationPermissionsStatus) => {
						setResultNotifications(result.status);
					})
					.catch((error) => {
						console.log('error', error);
					});
			} else {
				setResultNotifications(ExpoPermissionStatus.GRANTED);
			}

			if (customPermission === 'drawOverlay') {
				MoveSdk.canDrawOverlays().then((result: boolean) => {
					setResultDrawOverlays(result);
				});
			}
			if (customPermission === 'battery') {
				MoveSdk.isAppIgnoringBatteryOptimization().then((result: boolean) => {
					setResultBattery(result);
				});
			}
		}
	}, [appState, customPermission, dispatch]);

	const requestPermission =
		({ permission, customPermission, additional }: RequestPermissionType) =>
		() => {
			if (customPermission) {
				if (customPermission === 'notification') {
					Notifications.requestPermissionsAsync()
						.then((result) => {
							setResultNotifications(result.status);
							console.log('result', result);
						})
						.catch((error) => {
							console.log('error', error);
						});
				}
				if (customPermission === 'drawOverlay') {
					MoveSdk.requestDrawOverlaysPermission();
				}
				if (customPermission === 'battery') {
					MoveSdk.requestAppIgnoringBatteryOptimization();
				}
			} else if (permission) {
				request(permission)
					.then((result) => {
						if (result === RESULTS.GRANTED && additionalPermission && !additional) {
							requestPermission({ permission: additionalPermission, additional: true })();
						} else {
							setResult(result);
						}
					})
					.catch((error) => {
						console.log('error', error);
					});
			}
		};

	return (
		<View style={styles.container}>
			<View style={styles.titleHolder}>
				<Text style={styles.title}>{title}</Text>

				<PermissionStateButton
					requestPermission={requestPermission}
					permission={permission}
					customPermission={customPermission}
					result={result}
					resultDrawOverlays={customPermission === 'drawOverlay' ? resultDrawOverlays : null}
					resultBattery={customPermission === 'battery' ? resultBattery : null}
					resultNotifications={customPermission === 'notification' ? resultNotifications : null}
				/>
			</View>
			<View style={styles.line} />
			<View style={styles.textHolder}>
				<Text style={styles.text}>{text}</Text>
			</View>
		</View>
	);
};

export default PermissionItem;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.PALE_GREY,
		borderRadius: 10,
		marginBottom: Metrics.normalize(8),
	},
	titleHolder: {
		padding: Metrics.normalize(16),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		...Typography.b,
		textTransform: 'uppercase',
		color: Colors.DARK_BLUE,
	},
	line: {
		backgroundColor: Colors.WHITE,
		height: 1,
	},
	textHolder: {
		padding: Metrics.normalize(16),
	},
	text: {
		...Typography.p,
		color: Colors.GREY,
	},
});
