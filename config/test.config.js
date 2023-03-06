const config = {
	name: 'MOVE Test',
	slug: 'xxxxxxxxxxxxxxxxx', // TODO: replace with real slug
	version: '1.3.0',
	orientation: 'portrait',
	icon: './assets/icon.png',
	userInterfaceStyle: 'light',
	jsEngine: 'hermes',
	scheme: 'dolphinmove',
	splash: {
		image: './assets/splash.png',
		resizeMode: 'cover',
		backgroundColor: '#ffffff',
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ['**/*'],
	ios: {
		supportsTablet: false,
		bundleIdentifier: 'com.example.move', // TODO: replace with real bundle identifier
		infoPlist: {
			NSLocationAlwaysAndWhenInUseUsageDescription: 'App requires NSLocationAlwaysAndWhenInUseUsageDescription',
			NSLocationAlwaysUsageDescription: 'App requires NSLocationAlwaysUsageDescription',
			NSLocationWhenInUseUsageDescription: 'App requires NSLocationWhenInUseUsageDescription',
			NSMotionUsageDescription: 'App requires NSMotionUsageDescription',
			UIBackgroundModes: ['location', 'remote-notification'],
			UIStatusBarStyle: 'UIStatusBarStyleLightContent',
		},
		buildNumber: process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER.toString() : '187',
		config: {
			usesNonExemptEncryption: false,
		},
	},
	android: {
		allowBackup: false,
		adaptiveIcon: {
			foregroundImage: './assets/adaptive-icon.png',
			backgroundColor: '#FFFFFF',
		},
		package: 'com.example.move',
		permissions: ['ACCESS_BACKGROUND_LOCATION', 'ACCESS_FINE_LOCATION', 'ACTIVITY_RECOGNITION', 'READ_PHONE_STATE'],
		versionCode: process.env.BUILD_NUMBER ? Number(process.env.BUILD_NUMBER) : 187,
		config: {
			googleMaps: {
				apiKey: 'xxxxxxxxxxxxxxxxx', // TODO: replace with real api key
			},
		},
		googleServicesFile: './config/test/google-services.json', // TODO: replace with real google services file
	},
	androidStatusBar: {
		translucent: true,
		barStyle: 'light-content',
	},
	plugins: [
		'./plugins/move/index.js',
		'sentry-expo',
		'expo-system-ui',
		[
			'expo-build-properties',
			{
				android: {
					minSdkVersion: 26,
					kotlinVersion: '1.7.10',
					compileSdkVersion: 33,
					targetSdkVersion: 33,
				},
				ios: {
					deploymentTarget: '13.0',
					flipper: true,
				},
			},
		],
	],
	extra: {
		baseUrl: 'xxxxxxxxxxxxxxxxx', // TODO: replace with real base url
		productId: 9999999, // TODO: replace with real product id
		environment: 'test',
		sentryDsn: 'xxxxxxxxxxxxxxxxx', // TODO: replace with real dsn
		eas: {
			projectId: 'xxxxxxxxxxxxxxxxx', // TODO: replace with real project id
		},
		buildNumber: process.env.BUILD_NUMBER ? Number(process.env.BUILD_NUMBER) : 187,
	},
	// https://docs.expo.dev/guides/using-sentry/ for more info
	hooks: {
		postPublish: [
			{
				file: 'sentry-expo/upload-sourcemaps',
				config: {
					organization: 'xxxxxxxxxxxxxxxxx', // TODO: replace with real organization
					project: 'xxxxxxxxxxxxxxxxx', //	TODO: replace with real project
					authToken: 'xxxxxxxxxxxxxxxxx', // TODO: replace with real auth token
				},
			},
		],
	},
};

module.exports = config;
