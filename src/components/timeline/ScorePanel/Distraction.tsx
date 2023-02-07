import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import PercentCircle from '@components/common/PercentCircle';
import { EndPointMarker, PhoneIcon, StartPointMarker, TouchIcon } from '@components/common/Icons';
import { DistractionEvent, TimelineDetails } from '@store/features/timeline/timelineSlice';
import { Colors, Metrics, Typography } from '@styles/index';

type DistractionProps = {
	timelineDetails: TimelineDetails;
};

const Distraction = ({ timelineDetails }: DistractionProps) => {
	const { t } = useTranslation();
	const { startTs, durationMinutes, distractionEvents, distractionDetails, scores } = timelineDetails;
	const startTripDate = useMemo(() => moment.parseZone(startTs), [startTs]);

	const calculateGapFromStartPercentage = useCallback(
		(startIsoTime: string): string => {
			const startDistractionDate = moment.parseZone(startIsoTime, moment.ISO_8601);
			const minutesBeforeDistractionStarts = moment.duration(startDistractionDate.diff(startTripDate)).asMinutes();
			return `${(minutesBeforeDistractionStarts / durationMinutes) * 100}%`;
		},
		[durationMinutes, startTripDate]
	);

	const calculateDurationPercentage = useCallback((distractionDurationMinutes: number): string => `${(distractionDurationMinutes / durationMinutes) * 100}%`, [durationMinutes]);

	const renderDistractionIcon = (distractionType: DistractionEvent['type']) => {
		switch (distractionType) {
			case 'SWP_TYPE':
				return <TouchIcon />;
			case 'PH_HHELD':
				return <PhoneIcon />;
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.distractionBarWrapper}>
				<View style={styles.distractionBarBorderBox}>
					<View style={styles.gradientBar}>
						<LinearGradient colors={[Colors.GREEN_LIGHT, Colors.GREEN]} style={styles.gradientBarBackground} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
						<View style={[styles.pointIcons, { backgroundColor: Colors.GREEN_LIGHT, right: 10 }]}>
							<StartPointMarker />
						</View>
						<View style={[styles.pointIcons, { backgroundColor: Colors.GREEN, left: 10 }]}>
							<EndPointMarker />
						</View>
						{distractionEvents.map((distractionEvent) => (
							<View
								key={distractionEvent.startIsoTime}
								style={[
									styles.distractionBarPart,
									{
										width: calculateDurationPercentage(distractionEvent.durationMinutes),
										left: calculateGapFromStartPercentage(distractionEvent.startIsoTime),
									},
								]}
							>
								<View style={styles.distractionIconWrapper}>{renderDistractionIcon(distractionEvent.type)}</View>
							</View>
						))}
					</View>
				</View>
				<Text style={styles.distractionText}>
					<Text style={{ ...Typography.b, fontSize: Metrics.normalize(10) }}>
						{distractionDetails.totalDistractedMinutes} {t('txt_min')}
					</Text>{' '}
					{t('txt_distraction')}{' '}
					<Text style={{ ...Typography.b, fontSize: Metrics.normalize(10) }}>
						• {distractionDetails.distractionFreeMinutes} {t('txt_min')}
					</Text>{' '}
					{t('txt_distraction')} {t('txt_free')}
				</Text>
			</View>
			<View style={styles.percentCircleWrapper}>
				<PercentCircle radius={Metrics.normalize(23)} percent={scores.distraction} />
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
	pointIcons: {
		width: Metrics.normalize(20),
		height: Metrics.normalize(20),
		borderRadius: Metrics.normalize(10),
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: Colors.WHITE,
		borderWidth: 1.5,
		position: 'relative',
		zIndex: 2,
	},
	distractionBarWrapper: {
		backgroundColor: Colors.PALE_GREY,
		paddingTop: Metrics.normalize(37),
		height: Metrics.normalize(104),
		paddingHorizontal: Metrics.normalize(26),
		width: '80%',
		borderTopLeftRadius: Metrics.normalize(10),
		borderBottomLeftRadius: Metrics.normalize(10),
	},
	distractionBarBorderBox: {
		borderColor: Colors.WHITE,
		borderWidth: 1.5,
		width: '100%',
		marginBottom: Metrics.normalize(4),
	},
	gradientBar: {
		height: Metrics.normalize(17),
		width: '100%',
		position: 'relative',
		overflow: 'visible',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	gradientBarBackground: {
		height: Metrics.normalize(17),
		width: '100%',
		position: 'absolute',
	},
	distractionBarPart: {
		height: Metrics.normalize(17),
		zIndex: 1,
		backgroundColor: Colors.RED,
		position: 'absolute',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	distractionIconWrapper: {
		position: 'relative',
		top: Metrics.normalize(-27),
		height: Metrics.normalize(27),
	},
	distractionText: {
		...Typography.p,
		fontSize: Metrics.normalize(10),
		position: 'relative',
		right: Metrics.normalize(5),
	},
	percentCircleWrapper: {
		backgroundColor: Colors.PALE_GREY,
		alignItems: 'center',
		justifyContent: 'center',
		width: '20%',
		borderBottomRightRadius: Metrics.normalize(10),
		borderTopRightRadius: Metrics.normalize(10),
		borderLeftWidth: 1,
		borderLeftColor: Colors.WHITE,
	},
});

export default Distraction;
