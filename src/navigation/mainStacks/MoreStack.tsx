import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import MoreScreen from '@screens/More/MoreScreen';
import { mainStackOptions } from '@utils/theme';
import ProfileScreen from '@screens/More/ProfileScreen';
import ChangePasswordScreen from '@screens/More/ChangePasswordScreen';
import DeleteAccountScreen from '@screens/More/DeleteAccountScreen';
import DebugScreen from '@screens/More/DebugScreen';

export type MoreStackParamList = {
	More: undefined;
	Profile: undefined;
	ChangePassword: undefined;
	DeleteAccount: undefined;
	Debug: undefined;
};

const MoreStack = () => {
	const { t } = useTranslation();
	const Stack = createNativeStackNavigator<MoreStackParamList>();

	return (
		<Stack.Navigator
			screenOptions={{
				...mainStackOptions,
			}}
		>
			<Stack.Screen name="More" component={MoreScreen} options={{ headerTitle: t('tit_more') }} />
			<Stack.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: t('tit_my_profile') }} />
			<Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerTitle: t('tit_change_password') }} />
			<Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} options={{ headerTitle: t('tit_delete_account') }} />
			<Stack.Screen name="Debug" component={DebugScreen} options={{ headerTitle: t('tit_debug') }} />
		</Stack.Navigator>
	);
};

export default MoreStack;
