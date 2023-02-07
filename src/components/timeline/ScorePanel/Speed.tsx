import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import PercentCircle from '@components/common/PercentCircle';
import { SectionDistance } from '@store/features/timeline/timelineSlice';
import { Colors, Metrics, Typography } from '@styles/index';

type SpeedProps = {
	score: number;
	sectionDistance: SectionDistance;
};

const Speed = ({ score, sectionDistance }: SpeedProps) => {
	const { t } = useTranslation();
	return (
		<View style={styles.container}>
			<View style={styles.speedStatisticWrapper}>
				<Text style={[{ ...Typography.b, marginBottom: Metrics.normalize(16) }, styles.text]}>
					{t('txt_within_limits')} <Text style={[{ ...Typography.p }, styles.text]}>{(sectionDistance.green * 0.001).toFixed(3).replace(/[.,]000$/, '')} km</Text>
				</Text>
				<Text style={[{ ...Typography.b, marginBottom: Metrics.normalize(16) }, styles.text]}>
					{`< 10% ${t('txt_over')} ${t('txt_limits')}: `}
					<Text style={[{ ...Typography.p }, styles.text]}>{(sectionDistance.yellow * 0.001).toFixed(3).replace(/[.,]000$/, '')} km</Text>
				</Text>
				<Text style={[{ ...Typography.b }, styles.text]}>
					{`> 10% ${t('txt_over')} ${t('txt_limits')}: `}
					<Text style={[{ ...Typography.p }, styles.text]}>{(sectionDistance.red * 0.001).toFixed(3).replace(/[.,]000$/, '')} km</Text>
				</Text>
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
	speedStatisticWrapper: {
		backgroundColor: Colors.PALE_GREY,
		alignItems: 'flex-start',
		paddingVertical: Metrics.normalize(20),
		paddingHorizontal: Metrics.normalize(16),
		width: '80%',
		height: Metrics.normalize(104),
		borderTopLeftRadius: Metrics.normalize(10),
		borderBottomLeftRadius: Metrics.normalize(10),
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
	text: {
		fontSize: Metrics.normalize(12),
		lineHeight: Metrics.normalize(12),
	},
});

export default Speed;
