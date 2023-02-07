import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const OverlayActivityIndicator = () => {
	return (
		<View style={styles.loading}>
			<ActivityIndicator size="small" color="#000000" />
		</View>
	);
};

export default OverlayActivityIndicator;

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 999,
	},
});
