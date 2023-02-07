import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { StyleSheet, FlatList, ListRenderItem, Pressable, Text, View } from 'react-native';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { TimelineStackParamList } from '@navigation/mainStacks/TimelineStack';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { Activity, getTimeline, setTimelineLoaded, TimelineType } from '@store/features/timeline/timelineSlice';
import Screen from '@components/common/Screen';
import TimelineFilter from '@components/timeline/TimelineFilter';
import TimelineActivity from '@components/timeline/TimelineActivity';
import NoData from '@components/timeline/NoData';
import { ChevronLeft, ChevronRight } from '@components/common/Icons';
import { getMinutesBetween } from '@utils/index';
import { Colors, Metrics, Typography } from '@styles/index';

const TimelineScreen = ({ navigation }: NativeStackScreenProps<TimelineStackParamList>) => {
	const { t } = useTranslation();
	const flatListRef = useRef<FlatList | null>(null);
	const isFocused = useIsFocused();
	const contractId = useAppSelector((state) => state.user.contractId);
	const timeline = useAppSelector((state) => state.timeline.timeline);
	const timelineLoaded = useAppSelector((state) => state.timeline.timelineLoaded);
	const loading = useAppSelector((state) => state.runtime.loading);

	const [selectedDate, setSelectedDate] = useState(moment());
	const [activeFilter, setActiveFilter] = useState<Activity | null>(null);

	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			flatListRef.current = null;
		};
	}, []);

	const activities = useMemo(() => {
		const activities: Record<string, number> = {};

		if (timeline.length > 0) {
			timeline.map((item) => {
				if (!activities[item.type]) {
					activities[item.type] = 0;
				}
				activities[item.type] = activities[item.type] + getMinutesBetween(item.startTs, item.endTs);
			});
		}

		return activities;
	}, [timeline]);

	const filteredTimeline = useMemo(() => {
		if (activeFilter === null) {
			return timeline;
		}
		if (activeFilter === Activity.PUBLIC_TRANSPORT) {
			return timeline.filter((data) => data.type === Activity.PUBLIC_TRANSPORT || data.type === Activity.TRAM || data.type === Activity.METRO || data.type === Activity.TRAIN);
		}
		return timeline.filter((data) => data.type === activeFilter);
	}, [activeFilter, timeline]);

	const onRefresh = useCallback(async () => {
		if (contractId && selectedDate) {
			dispatch(setTimelineLoaded(false));
			dispatch(
				getTimeline({
					data: { from: parseInt(moment(selectedDate).startOf('day').format('X')), to: parseInt(moment(selectedDate).endOf('day').format('X')) },
				})
			);
		}
	}, [selectedDate, contractId, dispatch]);

	useEffect(() => {
		if (!isFocused) {
			return;
		}
		onRefresh();
	}, [selectedDate, onRefresh, isFocused]);

	const activityPressHandler = (item: TimelineType) => () => navigation.navigate('TimelineDetails', { tripId: item.id });

	const renderItem: ListRenderItem<TimelineType> = ({ item, index }) => {
		return item.type === Activity.CAR ? (
			<Pressable onPress={activityPressHandler(item)}>
				<TimelineActivity item={item} index={index} first={index === 0} last={index === filteredTimeline.length - 1} />
			</Pressable>
		) : (
			<TimelineActivity item={item} index={index} first={index === 0} last={index === filteredTimeline.length - 1} />
		);
	};

	const prevDay = () => {
		setSelectedDate(moment(selectedDate).subtract(1, 'days'));
		flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
	};

	const nextDay = () => {
		setSelectedDate(moment(selectedDate).add(1, 'days'));
		flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
	};

	const nextDateDisabled = !(moment(selectedDate).startOf('day') < moment().startOf('day'));

	return (
		<Screen scroll={false} header={<TimelineFilter activities={activities} activeFilter={activeFilter} setActiveFilter={setActiveFilter} selectedDate={selectedDate} />}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Metrics.normalize(16) }}>
				<Pressable onPress={prevDay} style={styles.navigationButton}>
					<ChevronLeft type={'active'} />
					<Text style={{ ...Typography.b, color: Colors.GREEN, paddingLeft: Metrics.normalize(8) }}>{t('txt_previous_day')}</Text>
				</Pressable>

				<Pressable onPress={nextDay} style={styles.navigationButton} disabled={nextDateDisabled}>
					<Text style={{ ...Typography.b, color: nextDateDisabled ? Colors.GREY : Colors.GREEN, paddingRight: Metrics.normalize(8) }}>{t('txt_next_day')}</Text>
					<ChevronRight type={!nextDateDisabled ? 'active' : 'inactive'} />
				</Pressable>
			</View>

			<View style={styles.timelineHolder}>
				<FlatList
					ref={flatListRef}
					showsVerticalScrollIndicator={false}
					data={filteredTimeline}
					renderItem={renderItem}
					keyExtractor={(item) => item.startTs}
					onRefresh={onRefresh}
					refreshing={loading.visible}
					ListEmptyComponent={timelineLoaded ? <NoData /> : <View />}
					contentContainerStyle={{ flexGrow: 1 }}
				/>
			</View>
		</Screen>
	);
};

const styles = StyleSheet.create({
	timelineHolder: {
		backgroundColor: Colors.PALE_GREY,
		borderRadius: 10,
		flex: 1,
	},
	navigationButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default TimelineScreen;
