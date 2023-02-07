import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import PercentCircle from '@components/common/PercentCircle';
import { TimelineDetails } from '@store/features/timeline/timelineSlice';
import { Colors, Metrics, Typography } from '@styles/index';

type TimelineOverviewProps = {
	timelineDetails: TimelineDetails | null;
};

const TimelineOverview = ({ timelineDetails }: TimelineOverviewProps) => {
	const { t } = useTranslation();
	if (!timelineDetails) {
		return null;
	}
	const { startTs, endTs, startAddress, endAddress, scores, durationMinutes } = timelineDetails;
	const startDate = moment.parseZone(startTs);
	const endDate = moment.parseZone(endTs);
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row' }}>
				<View style={[styles.typeHolder, styles.typeHolderActive]}>
					<Text style={[styles.dayText]}>{moment(startDate).format('ddd')}</Text>
					<View>
						<Text style={[styles.date]}>{moment(startDate).format('DD.MM')}</Text>
					</View>
				</View>
				<View style={styles.textWrapper}>
					<Text style={[styles.boldText, { paddingBottom: Metrics.normalize(8), lineHeight: Metrics.normalize(11) }]}>{`${startDate.format('HH:mm')}-${endDate.format('HH:mm')} (${durationMinutes} ${t(
						'txt_min'
					)})`}</Text>
					{startAddress && (
						<Text numberOfLines={1}>
							<Text style={styles.boldText}>{t('txt_from')}: </Text>
							<Text style={styles.overviewText}>{startAddress}</Text>
						</Text>
					)}
					{endAddress && (
						<Text numberOfLines={1}>
							<Text style={styles.boldText}>{t('txt_to_big')}: </Text>
							<Text style={styles.overviewText}>{endAddress}</Text>
						</Text>
					)}
				</View>
			</View>
			<View>
				<PercentCircle percent={scores.total} radius={20} />
			</View>
		</View>
	);
};

export default TimelineOverview;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: Colors.PALE_GREY,
		paddingVertical: Metrics.normalize(8),
		paddingHorizontal: Metrics.normalize(16),
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	typeHolderActive: {
		backgroundColor: Colors.BLUE,
		borderRadius: Metrics.normalize(10),
	},
	typeHolder: {
		alignItems: 'center',
		height: Metrics.normalize(57),
		width: Metrics.normalize(57),
		alignContent: 'center',
		justifyContent: 'center',
	},
	textWrapper: {
		marginLeft: Metrics.normalize(20),
		paddingVertical: 4,
		width: Metrics.wp(58),
	},
	dayText: {
		...Typography.p,
		color: Colors.WHITE,
		fontSize: Metrics.normalize(12),
	},
	date: {
		...Typography.h2,
		fontSize: Metrics.normalize(14),
		lineHeight: Metrics.normalize(16),
		color: Colors.WHITE,
	},
	boldText: {
		...Typography.b,
		fontSize: Metrics.normalize(10),
	},
	overviewText: {
		...Typography.p,
		fontSize: Metrics.normalize(10),
	},
});
