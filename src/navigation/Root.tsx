import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Text, View } from 'react-native';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WebViewScreen from '@screens/WebViewScreen';
import { useAppSelector } from '@hooks/redux';
import useLastNotification from '@hooks/useLastNotification';
import { moveTheme } from '@utils/theme';

import Tabs, { TabsParamList } from './mainStacks/Tabs';
import AuthStack, { AuthStackParamList } from './authStacks/AuthStack';
import { linking } from './Linking';
import MessageStack, { MessageStackParamList } from './mainStacks/MessageStack';

export type RootStackParamList = {
	MainTabs: NavigatorScreenParams<TabsParamList>;
	AuthStack: NavigatorScreenParams<AuthStackParamList>;
	WebView: { url: string; title?: string };
	MessageStack: NavigatorScreenParams<MessageStackParamList>;
};
const Root = () => {
	const Stack = createNativeStackNavigator<RootStackParamList>();

	const [navigationReady, setNavigationReady] = useState(false);
	const initialized = useAppSelector((state) => state.runtime.initialized);
	const contractId = useAppSelector((state) => state.user.contractId);

	useLastNotification(navigationReady);

	if (!initialized) {
		return null;
	}

	const onNavigationReady = async () => {
		setNavigationReady(true);
		try {
			await SplashScreen.hideAsync();
		} catch {
			// no SplashScreen in background mode
		}
	};

	return (
		<NavigationContainer linking={linking} theme={moveTheme} onReady={onNavigationReady}>
			<Stack.Navigator
				screenOptions={() => ({
					headerShown: false,
				})}
			>
				{contractId ? <Stack.Screen name="MainTabs" component={Tabs} /> : <Stack.Screen name="AuthStack" component={AuthStack} />}
				<Stack.Group
					screenOptions={({ route }) => ({
						headerShown: route.name !== 'MessageStack',
						presentation: 'modal',
					})}
				>
					<Stack.Screen name="WebView" component={WebViewScreen} />
					<Stack.Screen name="MessageStack" component={MessageStack} />
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Root;
