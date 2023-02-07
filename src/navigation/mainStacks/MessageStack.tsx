import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import MessagesOverviewScreen from '@screens/Messages/MessagesOverviewScreen';
import MessageDetailsScreen from '@screens/Messages/MessageDetailsScreen';
import { mainStackOptions } from '@utils/theme';

export type MessageStackParamList = {
	MessagesOverview: undefined;
	MessageDetails: { messageId: number };
};

const MessageStack = () => {
	const { t } = useTranslation();
	const Stack = createNativeStackNavigator<MessageStackParamList>();

	return (
		<Stack.Navigator
			screenOptions={{
				...mainStackOptions,
			}}
		>
			<Stack.Screen name="MessagesOverview" component={MessagesOverviewScreen} options={{ headerTitle: t('tit_messages') }} />
			<Stack.Screen name="MessageDetails" component={MessageDetailsScreen} options={{ headerTitle: t('tit_messages') }} />
		</Stack.Navigator>
	);
};

export default MessageStack;
