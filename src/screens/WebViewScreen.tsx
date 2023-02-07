import { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';

import { RootStackParamList } from '@navigation/Root';
import { extractHostname } from '@utils/index';

const WebViewScreen = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'WebView'>) => {
	useEffect(() => {
		if (route.params.title) {
			navigation.setOptions({ title: route.params.title });
		}
	}, [navigation, route.params.title]);

	return (
		<WebView
			source={{ uri: route.params.url }}
			originWhitelist={['https://', 'mailto:', 'tel:']}
			onShouldStartLoadWithRequest={(event) => {
				if (!event.url.startsWith(`https://${extractHostname(route.params.url)}`)) {
					Linking.openURL(event.url);
					return false;
				}
				return true;
			}}
		/>
	);
};

export default WebViewScreen;
