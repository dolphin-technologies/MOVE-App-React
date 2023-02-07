import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { TimelineStackParamList } from '@navigation/mainStacks/TimelineStack';
import Screen from '@components/common/Screen';
import TimelineOverview from '@components/timeline/TimelineOverview';
import ScorePanel, { PANEL } from '@components/timeline/ScorePanel/ScorePanel';
import TimelineMap from '@components/timeline/TimelineMap';
import { getTimelineDetails } from '@store/features/timeline/timelineSlice';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { ChevronLeft, ChevronRight } from '@components/common/Icons';
import { Colors, Metrics, Typography } from '@styles/index';

const TimelineDetailsScreen = ({ route }: NativeStackScreenProps<TimelineStackParamList, 'TimelineDetails'>) => {
	const { t } = useTranslation();
	const [chosenTripId, setChosenTripId] = useState<number | undefined>(route.params.tripId);
	const [activeScorePanel, setActiveScorePanel] = useState<PANEL>(PANEL.OVERVIEW);

	const timelineDetails = useAppSelector((state) => state.timeline.timelineDetails);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (route.params.tripId) {
			setChosenTripId(route.params.tripId);
		}
	}, [route.params.tripId]);

	useEffect(() => {
		if (chosenTripId) {
			dispatch(
				getTimelineDetails({
					data: { timelineId: chosenTripId },
				})
			);
		}
	}, [chosenTripId, dispatch]);

	const nextTrip = timelineDetails?.nextTripId;
	const prevTrip = timelineDetails?.previousTripId;

	const handleNextTripPress = () => setChosenTripId(nextTrip);
	const handlePrevTripPress = () => setChosenTripId(prevTrip);

	return (
		<Screen scroll={false} style={styles.screen} header={<TimelineOverview timelineDetails={timelineDetails} />}>
			<View style={styles.navigationButtonWrapper}>
				<Pressable onPress={handlePrevTripPress} style={styles.navigationButton} disabled={!prevTrip}>
					<ChevronLeft type={prevTrip ? 'active' : 'inactive'} />
					<Text style={{ ...Typography.b, color: !prevTrip ? Colors.LIGHT_GREY : Colors.GREEN, paddingLeft: Metrics.normalize(8) }}>{t('txt_previous_trip')}</Text>
				</Pressable>

				<Pressable onPress={handleNextTripPress} style={styles.navigationButton} disabled={!nextTrip}>
					<Text style={{ ...Typography.b, color: !nextTrip ? Colors.LIGHT_GREY : Colors.GREEN, paddingRight: Metrics.normalize(8) }}>{t('txt_next_trip')}</Text>
					<ChevronRight type={nextTrip ? 'active' : 'inactive'} />
				</Pressable>
			</View>
			<View style={styles.mapHolder}>{timelineDetails?.tripPoints?.length && <TimelineMap timelineDetails={timelineDetails} activeScorePanel={activeScorePanel} />}</View>
			{timelineDetails && <ScorePanel timelineDetails={timelineDetails} onPanelChange={setActiveScorePanel} />}
		</Screen>
	);
};

const styles = StyleSheet.create({
	screen: {
		paddingHorizontal: 0,
	},
	mapHolder: {
		flex: 1,
	},
	navigationButtonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: Metrics.normalize(16),
		paddingHorizontal: Metrics.normalize(16),
	},
	navigationButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default TimelineDetailsScreen;
