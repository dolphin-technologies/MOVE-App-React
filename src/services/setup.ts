import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Sentry from 'sentry-expo';
import * as SplashScreen from 'expo-splash-screen';
import Constants from 'expo-constants';
if (!__DEV__) {
	if (Constants.manifest?.extra?.sentryDsn) {
		Sentry.init({
			dsn: Constants.manifest?.extra?.sentryDsn,
			enableInExpoDevelopment: false,
			environment: Constants.manifest?.extra?.environment || 'test',
			debug: __DEV__,
		});
	}
}

const preventSplashScreenHide = async () => {
	try {
		await SplashScreen.preventAutoHideAsync();
	} catch {
		// no SplashScreen in background mode
	}
};

preventSplashScreenHide();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

if (Platform.OS === 'android') {
	Notifications.setNotificationChannelAsync('default', {
		name: 'default',
		importance: Notifications.AndroidImportance.MAX,
	});
}
