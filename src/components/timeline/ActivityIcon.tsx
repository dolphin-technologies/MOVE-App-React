import React from 'react';
import { StyleSheet } from 'react-native';

import { Car, Cycling, Idle, Metro, PublicTransport, Walking, More, Tram } from '@components/common/Icons';
import { Activity } from '@store/features/timeline/timelineSlice';

type ActivityIconProps = {
	type: Activity;
	active?: boolean;
};

const ActivityIcon = ({ type, active }: ActivityIconProps) => {
	const iconMap: Record<Activity, React.ReactElement> = {
		CAR: <Car type={active ? 'active' : 'inactive'} />,
		CYCLING: <Cycling type={active ? 'active' : 'inactive'} />,
		PUBLIC_TRANSPORT: <PublicTransport type={active ? 'active' : 'inactive'} />,
		WALKING: <Walking type={active ? 'active' : 'inactive'} />,
		IDLE: <Idle type={active ? 'active' : 'inactive'} />,
		METRO: <Metro type={active ? 'active' : 'inactive'} />,
		TRAM: <Tram type={active ? 'active' : 'inactive'} />,
		TRAIN: <Tram type={active ? 'active' : 'inactive'} />,
	};

	if (iconMap[type]) {
		return iconMap[type];
	}

	return <More type="inactive" />;
};

const styles = StyleSheet.create({});

export default ActivityIcon;
