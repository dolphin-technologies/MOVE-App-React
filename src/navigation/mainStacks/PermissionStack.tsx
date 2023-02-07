import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import PermissionsScreen from '@screens/PermissionsScreen';
import { mainStackOptions } from '@utils/theme';

export type PermissionsStackParamList = {
	Permissions: undefined;
};

const PermissionsStack = () => {
	const { t } = useTranslation();
	const Stack = createNativeStackNavigator<PermissionsStackParamList>();

	return (
		<Stack.Navigator
			screenOptions={{
				...mainStackOptions,
			}}
		>
			<Stack.Screen name="Permissions" component={PermissionsScreen} options={{ headerTitle: t('tit_move') }} />
		</Stack.Navigator>
	);
};

export default PermissionsStack;
