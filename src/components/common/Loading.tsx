import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAppSelector } from '@hooks/redux';

const Loading = () => {
	const loading = useAppSelector((state) => state.runtime.loading);
	if (!loading.visible) {
		return null;
	}
	return <View style={styles.loading}>{loading.indicatorVisible ? <ActivityIndicator size="small" color="#000000" /> : null}</View>;
};

export default Loading;

const styles = StyleSheet.create({
	loading: {
		backgroundColor: 'rgba(0,0,0,0)',
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
