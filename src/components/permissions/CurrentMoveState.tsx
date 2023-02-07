import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import MoveSdk from 'react-native-move-sdk';
import { useTranslation } from 'react-i18next';

import AnimatedLinearGradient from '@components/common/AnimatedLinearGradient';
import { useAppSelector } from '@hooks/redux';
import { Colors, Metrics, Typography } from '@styles/index';

const CurrentMoveState = () => {
	const { t } = useTranslation();
	const sdkState = useAppSelector((state) => state.moveSdk.sdkState);
	const [boxGradient, setBoxGradient] = useState<Array<string>>();

	const warnings = useAppSelector((state) => state.moveSdk.warnings);
	const errors = useAppSelector((state) => state.moveSdk.errors);
	const [statusText, setStatusText] = useState();

	useEffect(() => {
		if (errors && errors.length > 0) {
			setStatusText(t('lbl_not_recording'));
			setBoxGradient(['#f5515f', '#9f041b']);
		} else {
			if (sdkState === MoveSdk.RUNNING) {
				setBoxGradient(['#b4ec51', '#429321']);
				setStatusText(t('lbl_rec'));
			} else {
				setStatusText(t('lbl_not_recording'));
				setBoxGradient(['#f5515f', '#9f041b']);
			}
		}
	}, [warnings, errors, sdkState, t]);

	const onSwitchChange = useCallback(async () => {
		if (sdkState === MoveSdk.RUNNING) {
			MoveSdk.stopAutomaticDetection();
		} else if (sdkState === MoveSdk.READY) {
			MoveSdk.startAutomaticDetection();
		}
	}, [sdkState]);

	return (
		<View style={styles.container}>
			<View style={styles.background}>
				<AnimatedLinearGradient
					startColors={[
						['#000000', '#000000'],
						['#000000', '#000000'],
					]}
					colors={boxGradient}
					duration={2500}
					locations={[0, 1]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
				/>
			</View>
			<View>
				<Text style={styles.title}>{t('subtit_current_state')}</Text>
				<View style={styles.toggleBackground}>
					<Text style={styles.toggleText}>{statusText}</Text>
					<Switch
						trackColor={{ false: Colors.DARK_GREY, true: Colors.GREEN_LIGHT }}
						thumbColor={Colors.WHITE}
						ios_backgroundColor={Colors.DARK_GREY}
						onValueChange={onSwitchChange}
						value={sdkState === MoveSdk.RUNNING}
						style={styles.switch}
					/>
				</View>
			</View>
		</View>
	);
};

export default CurrentMoveState;

const styles = StyleSheet.create({
	container: {
		padding: Metrics.normalize(16),
		marginTop: 1,
	},
	background: {
		flex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	title: {
		...Typography.h2,
		color: Colors.WHITE,
		marginBottom: Metrics.normalize(16),
	},
	toggleBackground: {
		backgroundColor: Colors.WHITE,
		paddingVertical: Metrics.normalize(8),
		paddingHorizontal: Metrics.normalize(16),
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	toggleText: {
		...Typography.b,
		textTransform: 'uppercase',
	},
	switch: {
		transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
	},
});
