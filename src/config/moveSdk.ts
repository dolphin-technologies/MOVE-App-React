import { NotificationConfig, MoveSdkAndroidConfig, MoveSdkConfig } from 'react-native-move-sdk';

const tripChannel = {
	id: 'CT',
	name: 'Trips',
	description: 'Trips Description',
};
const recognitionNotification: NotificationConfig = {
	title: 'MOVE SDK Trip Recognition',
	text: 'SDK trip recognition is running',
	channel: tripChannel,
};
const tripNotification: NotificationConfig = {
	title: 'MOVE SDK Trip Running',
	text: 'SDK is recording your trip',
	channel: tripChannel,
};

export const CONFIG: MoveSdkConfig = {
	timelineDetectionServices: ['DRIVING', 'CYCLING', 'PUBLIC_TRANSPORT', 'WALKING', 'POINTS_OF_INTEREST'],
	drivingServices: ['DISTRACTION_FREE_DRIVING', 'DRIVING_BEHAVIOUR'],
	walkingServices: [],
};

export const ANDROID_CONFIG: MoveSdkAndroidConfig = {
	notifications: {
		recognitionNotification,
		tripNotification,
	},
};
