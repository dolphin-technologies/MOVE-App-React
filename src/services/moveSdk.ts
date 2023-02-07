import MoveSdk from 'react-native-move-sdk';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { check, Permission, PERMISSIONS } from 'react-native-permissions';

export const checkPermissions = async () => {
	const iosPermissions: Array<Permission> = [PERMISSIONS.IOS.LOCATION_ALWAYS];
	const androidPermissions: Array<Permission> = [PERMISSIONS.ANDROID.READ_PHONE_STATE];

	if (Device.isDevice) {
		iosPermissions.push(PERMISSIONS.IOS.MOTION);
	}
	if (Platform.Version >= 29) {
		androidPermissions.push(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
		androidPermissions.push(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
	} else {
		androidPermissions.push(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
	}

	let checkPermissions: Array<Permission> = [];
	let hasPermissions = false;
	if (Platform.OS === 'android') {
		checkPermissions = androidPermissions;
	} else if (Platform.OS === 'ios') {
		checkPermissions = iosPermissions;
	}
	try {
		hasPermissions = (await Promise.all([...checkPermissions.map((permission) => check(permission))])).every((p) => p === 'granted');

		if (Platform.OS === 'android') {
			const hasOverlayPermission = await MoveSdk.canDrawOverlays();
			hasPermissions = hasPermissions && hasOverlayPermission;
		}
	} catch (error) {
		console.log('catch hasPermissions', error);
	}

	return hasPermissions;
};
