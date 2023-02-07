import React from 'react';
import { StyleSheet, View, Text, Pressable, Linking } from 'react-native';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { Colors, Metrics, Typography } from '@styles/index';
import { Activity } from '@store/features/timeline/timelineSlice';
import { getHandMFromMinutes } from '@utils/index';
import { useAppSelector } from '@hooks/redux';

import ActivityIcon from './ActivityIcon';

type TimelineFilterProps = {
	activities: Record<string, number>;
	selectedDate: moment.Moment;
	activeFilter: Activity | null;
	setActiveFilter: (type: Activity | null) => void;
};

const TimelineFilter = ({ activeFilter, setActiveFilter, selectedDate, activities }: TimelineFilterProps) => {
	const { t } = useTranslation();

	const errors = useAppSelector((state) => state.moveSdk.errors);

	const setFilter = (type: Activity) => () => {
		if (activeFilter === type) {
			setActiveFilter(null);
		} else {
			setActiveFilter(type);
		}
	};

	const onPermissionPress = () => {
		Linking.openURL(`dolphinmove://status`);
	};

	const getDuration = (type: Activity) => {
		let duration = 0;

		if (activities[type]) {
			duration = activities[type];
		}
		if (type === Activity.PUBLIC_TRANSPORT) {
			if (activities[Activity.TRAM]) {
				duration += activities[Activity.TRAM];
			}
			if (activities[Activity.METRO]) {
				duration += activities[Activity.METRO];
			}
			if (activities[Activity.TRAIN]) {
				duration += activities[Activity.TRAIN];
			}
		}

		if (duration > 0) {
			return getHandMFromMinutes(duration);
		}
		return '0h 00m';
	};
	return (
		<>
			<View style={styles.filter}>
				<View style={[styles.typeHolder, styles.typeHolderActive]}>
					<Text style={[styles.dayText]}>{moment(selectedDate).format('ddd')}</Text>
					<View>
						<Text style={[styles.date]}>{moment(selectedDate).format('DD.MM')}</Text>
					</View>
				</View>

				{[Activity.CAR, Activity.CYCLING, Activity.PUBLIC_TRANSPORT, Activity.WALKING, Activity.IDLE].map((type, index) => {
					const duration = getDuration(type);
					return (
						<Pressable key={type} onPress={setFilter(type)} style={{ opacity: duration !== '0h 00m' ? 1 : 0.3 }}>
							<View style={[styles.typeHolder, activeFilter === type ? styles.typeHolderActive : null]}>
								<View style={styles.iconHolder}>
									<ActivityIcon type={type} active={activeFilter === type} />
								</View>
								<View>
									<Text style={[styles.time, activeFilter === type ? styles.timeActive : null]}>{duration}</Text>
								</View>
							</View>
						</Pressable>
					);
				})}
			</View>
			{errors && errors.length > 0 && (
				<Pressable onPress={onPermissionPress}>
					<View style={styles.info}>
						<Text style={styles.infoText}>{t('err_permissions')}</Text>
					</View>
				</Pressable>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	info: {
		margin: Metrics.normalize(12),
		padding: Metrics.normalize(12),
		alignItems: 'center',
		backgroundColor: Colors.ORANGE,
		borderRadius: 10,
	},
	infoText: {
		textAlign: 'center',
		color: Colors.WHITE,
	},
	filter: {
		flexDirection: 'row',
		backgroundColor: Colors.PALE_GREY,
		padding: Metrics.normalize(8),
		justifyContent: 'space-between',
	},
	typeHolder: {
		alignItems: 'center',
		height: Metrics.normalize(57),
		width: Metrics.normalize(57),
		alignContent: 'center',
		justifyContent: 'center',
	},
	typeHolderActive: {
		backgroundColor: Colors.BLUE,
		borderRadius: 10,
	},
	iconHolder: {
		height: Metrics.normalize(20),
		width: Metrics.normalize(20),
		marginBottom: Metrics.normalize(5),
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	time: {
		...Typography.p,
		fontSize: Metrics.normalize(10),
		lineHeight: Metrics.normalize(10),
	},
	timeActive: {
		color: Colors.WHITE,
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
});

export default TimelineFilter;
