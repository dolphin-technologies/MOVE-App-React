import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import PercentCircle from '@components/common/PercentCircle';
import { DrivingEvent } from '@store/features/timeline/timelineSlice';
import { Colors, Metrics, Typography } from '@styles/index';

type SafenessProps = {
	score: number;
	drivingEvents: Array<DrivingEvent>;
};

type Statistic = {
	moderate: number;
	strong: number;
	extreme: number;
};

type DrivingEventsStatistic = {
	ACC: Statistic;
	BRK: Statistic;
	CRN: Statistic;
};

const Safeness = ({ score, drivingEvents }: SafenessProps) => {
	const { t } = useTranslation();
	const drivingEventsStatistic: DrivingEventsStatistic = useMemo(
		() =>
			drivingEvents.reduce(
				(acc, el) => {
					const drivingEventObj = acc[el.type];
					switch (el.value) {
						case 1:
							++drivingEventObj.moderate;
							break;
						case 2:
							++drivingEventObj.strong;
							break;
						case 3:
							++drivingEventObj.extreme;
							break;
					}
					return acc;
				},
				{
					ACC: { moderate: 0, strong: 0, extreme: 0 },
					BRK: { moderate: 0, strong: 0, extreme: 0 },
					CRN: { moderate: 0, strong: 0, extreme: 0 },
				}
			),
		[drivingEvents]
	);
	const renderStatistic = useCallback(
		(statisticObj: Statistic) => (
			<>
				<Text style={styles.statisticFieldName}>
					{t('txt_moderate')} <Text style={styles.statisticBold}>{statisticObj.moderate}</Text>
				</Text>
				<Text style={styles.statisticFieldName}>
					{t('txt_strong')} <Text style={styles.statisticBold}>{statisticObj.strong}</Text>
				</Text>
				<Text style={styles.statisticFieldName}>
					{t('txt_extreme')} <Text style={styles.statisticBold}>{statisticObj.extreme}</Text>
				</Text>
			</>
		),
		[t]
	);

	return (
		<View style={styles.container}>
			<View style={styles.statisticWrapper}>
				<View>
					<Text style={styles.statisticBold}>{t('txt_eco1')}</Text>
					{renderStatistic(drivingEventsStatistic.ACC)}
				</View>
				<View>
					<Text style={styles.statisticBold}>{t('txt_braking')}</Text>
					{renderStatistic(drivingEventsStatistic.BRK)}
				</View>
				<View>
					<Text style={styles.statisticBold}>{t('txt_cornering')}</Text>
					{renderStatistic(drivingEventsStatistic.CRN)}
				</View>
			</View>
			<View style={styles.percentCircleWrapper}>
				<PercentCircle radius={Metrics.normalize(23)} percent={score} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: Metrics.normalize(16),
		flexDirection: 'row',
		paddingHorizontal: Metrics.normalize(16),
	},
	statisticWrapper: {
		backgroundColor: Colors.PALE_GREY,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: Metrics.normalize(10),
		paddingHorizontal: Metrics.normalize(16),
		height: Metrics.normalize(104),
		width: '80%',
		borderTopLeftRadius: Metrics.normalize(10),
		borderBottomLeftRadius: Metrics.normalize(10),
	},
	statisticBold: {
		...Typography.b,
		fontSize: Metrics.normalize(12),
		lineHeight: Metrics.normalize(12),
		marginBottom: Metrics.normalize(8),
	},
	statisticFieldName: {
		...Typography.p,
		fontSize: Metrics.normalize(12),
		lineHeight: Metrics.normalize(12),
		marginBottom: Metrics.normalize(8),
	},
	percentCircleWrapper: {
		backgroundColor: Colors.PALE_GREY,
		alignItems: 'center',
		width: '20%',
		borderBottomRightRadius: Metrics.normalize(10),
		borderTopRightRadius: Metrics.normalize(10),
		borderLeftWidth: 1,
		borderLeftColor: Colors.WHITE,
		justifyContent: 'center',
	},
});

export default Safeness;
