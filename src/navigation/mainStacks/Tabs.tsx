import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { More, Status, Timeline } from '@components/common/Icons';
import { Colors } from '@styles/index';

import MoreStack, { MoreStackParamList } from './MoreStack';
import TimelineStack, { TimelineStackParamList } from './TimelineStack';
import PermissionsStack, { PermissionsStackParamList } from './PermissionStack';

export type TabsParamList = {
	PermissionsStack: NavigatorScreenParams<PermissionsStackParamList>;
	TimelineStack: NavigatorScreenParams<TimelineStackParamList>;
	MoreStack: NavigatorScreenParams<MoreStackParamList>;
};

const Tabs = () => {
	const { t } = useTranslation();
	const Tab = createBottomTabNavigator<TabsParamList>();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: Colors.PALE_GREY,
				},
				tabBarActiveTintColor: Colors.GREEN,
				tabBarInactiveTintColor: Colors.GREY,
				tabBarHideOnKeyboard: true,
			}}
			initialRouteName="TimelineStack"
		>
			<Tab.Screen
				name="PermissionsStack"
				component={PermissionsStack}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View style={[styles.tabBorder, focused ? styles.tabBorderActive : null]}>
								<Status type={focused ? 'active' : 'inactive'} />
							</View>
						);
					},
					tabBarLabel: t('tab_status'),
				}}
			/>
			<Tab.Screen
				name="TimelineStack"
				component={TimelineStack}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={[styles.tabBorder, focused ? styles.tabBorderActive : null]}>
							<Timeline type={focused ? 'active' : 'inactive'} />
						</View>
					),
					tabBarLabel: t('tab_timeline'),
				}}
			/>
			<Tab.Screen
				name="MoreStack"
				component={MoreStack}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={[styles.tabBorder, focused ? styles.tabBorderActive : null]}>
							<More type={focused ? 'active' : 'inactive'} />
						</View>
					),
					tabBarLabel: t('tab_more'),
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;

const styles = StyleSheet.create({
	tabBarBackground: {
		flex: 1,
		backgroundColor: Colors.PALE_GREY,
	},
	tabBorderActive: {
		borderTopColor: Colors.GREEN,
	},
	tabBorder: {
		borderTopWidth: 2,
		borderTopColor: Colors.PALE_GREY,
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
