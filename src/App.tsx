import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import Toast from 'react-native-toast-message';

import { toastTheme } from '@utils/theme';
import { setLastNotification } from '@store/features/runtime/runtimeSlice';
import { store } from '@store/index';
import Loading from '@components/common/Loading';
import Root from '@navigation/Root';

const App = () => {
	const lastNotificationResponse = Notifications.useLastNotificationResponse();

	useEffect(() => {
		if (lastNotificationResponse) {
			store.dispatch(setLastNotification(lastNotificationResponse));
		}
	}, [lastNotificationResponse]);

	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<GestureHandlerRootView style={styles.gestureRootView}>
					<Root />
					<Toast config={toastTheme} position="top" />
					<Loading />
				</GestureHandlerRootView>
			</SafeAreaProvider>
		</Provider>
	);
};

const styles = StyleSheet.create({
	gestureRootView: {
		flex: 1,
	},
});

export default App;
