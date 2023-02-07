import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import LoginScreen from '@screens/Auth/LoginScreen';
import { mainStackOptions } from '@utils/theme';
import RegisterScreen from '@screens/Auth/RegisterScreen';
import PasswordScreen from '@screens/Auth/PasswordScreen';

export type AuthStackParamList = {
	Login: undefined;
	Register: undefined;
	Password: undefined;
};

const MainStack = () => {
	const { t } = useTranslation();
	const Stack = createNativeStackNavigator<AuthStackParamList>();

	return (
		<Stack.Navigator
			screenOptions={{
				...mainStackOptions,
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: t('tit_login') }} />
			<Stack.Screen name="Register" component={RegisterScreen} options={{ headerTitle: t('tit_register') }} />
			<Stack.Screen name="Password" component={PasswordScreen} options={{ headerTitle: t('tit_forgot_password') }} />
		</Stack.Navigator>
	);
};

export default MainStack;
