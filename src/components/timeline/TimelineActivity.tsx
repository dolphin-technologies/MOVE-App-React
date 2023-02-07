import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { Colors, Metrics, Typography } from '@styles/index';
import { Activity, TimelineType } from '@store/features/timeline/timelineSlice';
import PercentCircle from '@components/common/PercentCircle';

import ActivityIcon from './ActivityIcon';

type ActivityProps = {
	item: TimelineType;
	first: boolean;
	last: boolean;
	index: number;
};

const TimelineActivity = ({ item, first, last, index }: ActivityProps) => {
	const { t } = useTranslation();
	const output = (
		<View style={[styles.activity, first ? { paddingTop: Metrics.normalize(24) } : null]}>
			<View style={styles.iconSpacing}>
				<View style={styles.iconHolder}>
					<ActivityIcon type={item.type} />
				</View>
				{item.type === Activity.CAR && <PercentCircle radius={11} percent={item.scores.total} fontSize={11} />}
			</View>
			<View style={styles.seperator}>
				{!last && <View style={styles.verticalLine}></View>}
				<View style={styles.circle}></View>
			</View>

			<View style={styles.content}>
				<Text style={styles.type}>{item.type}</Text>
				<View style={styles.activityDesc}>
					<Text style={styles.textLine}>
						{moment.parseZone(item.startTs).format('HH:mm')} - {moment.parseZone(item.endTs).format('HH:mm')}
					</Text>
					{item.type === Activity.CAR && (
						<>
							<Text style={[styles.textLine, styles.fromText]} numberOfLines={1}>
								<Text style={styles.bold}>{t('txt_from')}:</Text> {item.startAddress}
							</Text>
							<Text style={styles.textLine} numberOfLines={1}>
								<Text style={styles.bold}>{t('txt_to_big')}:</Text> {item.endAddress}
							</Text>
						</>
					)}
				</View>

				{!last && <View style={styles.line}></View>}
			</View>
		</View>
	);

	if (index < 10) {
		return <View key={item.startTs}>{output}</View>;
	}

	return output;
};

const styles = StyleSheet.create({
	activity: {
		flexDirection: 'row',
	},
	type: {
		...Typography.h2,
		marginBottom: Metrics.normalize(8),
	},
	iconSpacing: {
		paddingLeft: Metrics.normalize(16),
		paddingRight: Metrics.normalize(20),
	},
	iconHolder: {
		height: Metrics.normalize(20),
		width: Metrics.normalize(22),
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: Metrics.normalize(10),
	},
	activityDesc: {
		marginBottom: Metrics.normalize(16),
	},
	seperator: {
		alignItems: 'center',
	},
	content: {
		paddingLeft: Metrics.normalize(24),
		flex: 1,
	},
	textLine: {
		...Typography.p,
		fontSize: Metrics.normalize(12),
	},
	fromText: {
		marginTop: Metrics.normalize(8),
	},
	bold: {
		...Typography.b,
	},
	line: {
		height: 1,
		backgroundColor: Colors.WHITE,
		marginBottom: Metrics.normalize(16),
	},
	circle: {
		backgroundColor: Colors.PALE_GREY,
		width: Metrics.normalize(9),
		height: Metrics.normalize(9),
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Colors.DARK_BLUE,
		position: 'absolute',
		top: Metrics.normalize(5),
		zIndex: 1,
	},
	verticalLine: {
		backgroundColor: Colors.DARK_BLUE,
		width: 1,
		flex: 1,
		height: '100%',
		position: 'absolute',
		top: Metrics.normalize(10),
	},
});

export default TimelineActivity;
