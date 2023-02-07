import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import PercentCircle from '@components/common/PercentCircle';
import { Scores } from '@store/features/timeline/timelineSlice';
import { Colors, Metrics, Typography } from '@styles/index';

type OverviewProps = {
	scores: Scores;
};

const cardNames = [
	{ label: i18next.t('txt_total'), key: 'total' },
	{ label: i18next.t('txt_distraction'), key: 'distraction' },
	{ label: i18next.t('btn_safeness'), key: 'safeness' },
	{ label: i18next.t('btn_speed'), key: 'speed' },
];

const Overview = ({ scores }: OverviewProps) => {
	const { t } = useTranslation();
	return (
		<View style={styles.cardsWrapper}>
			{cardNames.map((cardName) => (
				<View key={cardName.key} style={styles.card}>
					<View style={{ marginBottom: Metrics.normalize(12) }}>
						<PercentCircle percent={scores[cardName.key as keyof Scores]} radius={20}></PercentCircle>
					</View>
					<Text style={Typography.p}>{cardName.label}</Text>
					<Text style={[Typography.p, styles.scorePanelSecondaryLine]}>{t('txt_score').toUpperCase()}</Text>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	scorePanelSecondaryLine: {
		color: Colors.GREY,
		fontSize: Metrics.normalize(9),
		lineHeight: Metrics.normalize(9),
	},
	cardsWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		paddingTop: Metrics.normalize(16),
	},
	card: {
		backgroundColor: Colors.PALE_GREY,
		alignItems: 'center',
		paddingVertical: Metrics.normalize(12),
		width: Metrics.wp(20),
		borderRadius: Metrics.normalize(10),
		height: Metrics.normalize(104),
	},
});

export default Overview;
