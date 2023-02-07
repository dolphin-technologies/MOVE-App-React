import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Metrics, Typography } from '@styles/index';

const NoMessages = () => {
	const { t } = useTranslation();
	return (
		<View style={styles.noMessages}>
			<Text style={styles.title}>{t('tit_no_messages_availale_yet')}</Text>
			<Text style={styles.text}>{t('txt_as_soon_as_messages_received')}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	noMessages: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: Metrics.normalize(16),
		flex: 1,
	},
	title: {
		...Typography.h1,
		fontSize: Metrics.normalize(16),
		textTransform: 'none',
		textAlign: 'center',
	},
	text: {
		...Typography.p,
		textAlign: 'center',
	},
});

export default NoMessages;
