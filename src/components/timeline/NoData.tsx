import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Metrics, Typography } from '@styles/index';

const NoData = () => {
	const { t } = useTranslation();

	return (
		<View style={styles.noData}>
			<Text style={styles.title}>{t('tit_no_data_for_chosen_day')}</Text>
			<Text style={styles.text}>{t('txt_as_soon_as_we_record')}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	noData: {
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

export default NoData;
