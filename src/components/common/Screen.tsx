import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';

import { Metrics } from '@styles/index';

interface ScreenType {
	children: React.ReactNode;
	header?: React.ReactElement;
	scroll?: boolean;
	edges?: Array<Edge>;
	style?: StyleProp<ViewStyle>;
}

const Screen = ({ children, header, scroll, edges, style }: ScreenType) => {
	const headerHeight = useHeaderHeight();

	return (
		<>
			{header}
			{scroll === false ? (
				<View style={[styles.view, style]}>
					<SafeAreaView edges={edges || ['left', 'right']} style={styles.safeAreaView}>
						{children}
					</SafeAreaView>
				</View>
			) : (
				<KeyboardAvoidingView keyboardVerticalOffset={headerHeight} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
					<ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.scrollView, style]} showsVerticalScrollIndicator={false}>
						<SafeAreaView edges={edges || ['left', 'right']} style={styles.safeAreaView}>
							{children}
						</SafeAreaView>
					</ScrollView>
				</KeyboardAvoidingView>
			)}
		</>
	);
};

export default Screen;

const styles = StyleSheet.create({
	keyboardAvoidingView: {
		flex: 1,
	},
	view: {
		flex: 1,
		paddingHorizontal: Metrics.normalize(16),
		paddingVertical: Metrics.normalize(16),
	},
	scrollView: {
		paddingHorizontal: Metrics.normalize(16),
		paddingVertical: Metrics.normalize(16),
	},
	safeAreaView: {
		flex: 1,
	},
});
