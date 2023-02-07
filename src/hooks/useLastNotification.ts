import { useEffect } from 'react';
import { Linking } from 'react-native';

import { LinkingType } from '@navigation/Linking';

import { useAppSelector } from './redux';

const useLastNotification = (navigationReady: boolean) => {
	const lastNotification = useAppSelector((state) => state.runtime.lastNotification);

	useEffect(() => {
		if (lastNotification && navigationReady) {
			let type: LinkingType = null;
			let value: string | number | unknown = 0;

			console.log('lastNotification.notification.request', lastNotification.notification.request);
			if (lastNotification.notification.request.trigger.type === 'push') {
				if ('remoteMessage' in lastNotification.notification.request.trigger) {
					// android
					type = lastNotification.notification.request.trigger.remoteMessage.data.type as LinkingType;
					value = lastNotification.notification.request.trigger.remoteMessage.data.value;
				} else if ('payload' in lastNotification.notification.request.trigger) {
					// ios
					type = lastNotification.notification.request.trigger.payload.type as LinkingType;
					value = lastNotification.notification.request.trigger.payload.value;
				}
			}

			switch (type) {
				case 'messages':
					if (value) {
						Linking.openURL(`dolphinmove://messages/${value}`);
					} else {
						Linking.openURL(`dolphinmove://messages`);
					}
					break;

				case 'trips':
					if (value) {
						Linking.openURL(`dolphinmove://trips/${value}`);
					} else {
						Linking.openURL(`dolphinmove://trips`);
					}
					break;

				case 'status':
					if (value) {
						Linking.openURL(`dolphinmove://status`);
					}
					break;
			}
		}
	}, [lastNotification, navigationReady]);
};

export default useLastNotification;
