import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import TimelineDetailsScreen from '@screens/Timeline/TimelineDetailsScreen';
import TimelineScreen from '@screens/Timeline/TimelineScreen';
import { mainStackOptions } from '@utils/theme';

export type TimelineStackParamList = {
	Timeline: undefined;
	TimelineDetails: { tripId: number };
};

const TimelineStack = () => {
	const { t } = useTranslation();
	const Stack = createNativeStackNavigator<TimelineStackParamList>();

	return (
		<Stack.Navigator
			screenOptions={{
				...mainStackOptions,
			}}
		>
			<Stack.Screen name="Timeline" component={TimelineScreen} options={{ headerTitle: t('tit_timeline') }} />
			<Stack.Screen name="TimelineDetails" component={TimelineDetailsScreen} options={{ headerTitle: t('tit_trip_details') }} />
		</Stack.Navigator>
	);
};

export default TimelineStack;
