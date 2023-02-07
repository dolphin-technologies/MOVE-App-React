import React from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { BaseToast, BaseToastProps } from 'react-native-toast-message';

import NavigationHeader from '@components/common/NavigationHeader';
import { Colors, Metrics, Typography } from '@styles/index';

export const moveTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: Colors.WHITE,
	},
};

export const mainStackOptions: NativeStackNavigationOptions = {
	headerTintColor: Colors.WHITE,
	headerTitleAlign: 'center',

	header: ({ navigation, route, options, back }) => {
		return <NavigationHeader navigation={navigation} route={route} options={options} back={back} />;
	},
	headerBackTitleStyle: {
		fontFamily: Typography.font.fontBlack,
	},
	headerTitleStyle: {
		fontFamily: Typography.font.fontBlack,
	},
};

export const toastTheme = {
	success: (props: BaseToastProps) => (
		<BaseToast
			{...props}
			style={[styles.toast, styles.toastSuccess]}
			text1NumberOfLines={3}
			text2NumberOfLines={2}
			contentContainerStyle={styles.toastContainer}
			text1Style={styles.toastText1}
			text2Style={styles.toastText2}
		/>
	),
	info: (props: BaseToastProps) => (
		<BaseToast
			{...props}
			style={[styles.toast, styles.toastInfo]}
			text1NumberOfLines={3}
			text2NumberOfLines={2}
			contentContainerStyle={styles.toastContainer}
			text1Style={styles.toastText1}
			text2Style={styles.toastText2}
		/>
	),
	error: (props: BaseToastProps) => (
		<BaseToast
			{...props}
			style={[styles.toast, styles.toastError]}
			text1NumberOfLines={3}
			text2NumberOfLines={2}
			contentContainerStyle={styles.toastContainer}
			text1Style={styles.toastText1}
			text2Style={styles.toastText2}
		/>
	),
};

const styles = StyleSheet.create({
	toast: {
		borderRadius: 10,
		marginTop: 15,
		width: Metrics.wp(90),
		paddingTop: 15,
		paddingBottom: 12,
		height: 'auto',
	},
	toastSuccess: {
		borderLeftColor: Colors.GREEN,
	},
	toastInfo: {
		borderLeftColor: Colors.GREY,
	},
	toastError: {
		borderLeftColor: Colors.RED,
	},
	toastContainer: {
		paddingHorizontal: Metrics.normalize(20),
	},
	toastText1: {
		fontSize: Metrics.normalize(14),
		fontFamily: Typography.font.fontBold,
		marginBottom: Metrics.normalize(4),
		color: Colors.DARK_BLUE,
	},
	toastText2: {
		fontSize: Metrics.normalize(13),
		fontFamily: Typography.font.fontRegular,

		color: Colors.GREY,
	},
});
