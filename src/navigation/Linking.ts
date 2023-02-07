import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { IMPRINT_ABOUT, INFO_HELP, PRIVACY_ANALYTICS, PRIVACY_POLICY, TERMS_OF_USE } from '@config/urls';

import { RootStackParamList } from './Root';

export type LinkingType = 'trips' | 'messages' | 'status' | null;

const prefix = Linking.createURL('/');

export const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [prefix],
	config: {
		initialRouteName: 'MainTabs',
		screens: {
			MainTabs: {
				screens: {
					PermissionsStack: {
						initialRouteName: 'Permissions',
						screens: {
							Permissions: {
								path: 'status',
							},
						},
					},
					TimelineStack: {
						initialRouteName: 'Timeline',
						screens: {
							Timeline: {
								path: 'trips',
							},
							TimelineDetails: {
								path: 'trips/:tripId',
								parse: {
									tripId: (tripId) => parseInt(tripId, 10),
								},
							},
						},
					},
					MoreStack: {
						initialRouteName: 'More',
						screens: {
							Profile: {
								path: 'profile',
							},
						},
					},
				},
			},
			AuthStack: {
				screens: {
					Register: {
						path: 'register',
					},
					Login: {
						path: 'login',
					},
					Password: {
						path: 'password',
					},
				},
			},
			WebView: {
				path: 'webview/:url',
				parse: {
					url: (url) => {
						switch (url) {
							case 'help':
								return INFO_HELP;
							case 'tou':
								return TERMS_OF_USE;
							case 'privacy':
								return PRIVACY_POLICY;
							case 'analytics':
								return PRIVACY_ANALYTICS;
							case 'imprint':
								return IMPRINT_ABOUT;
							default:
								return INFO_HELP;
						}
					},
				},
			},
			MessageStack: {
				initialRouteName: 'MessagesOverview',
				screens: {
					MessagesOverview: {
						path: 'messages',
					},
					MessageDetails: {
						path: 'messages/:messageId',
						parse: {
							messageId: (messageId) => parseInt(messageId, 10),
						},
					},
				},
			},
		},
	},
};
