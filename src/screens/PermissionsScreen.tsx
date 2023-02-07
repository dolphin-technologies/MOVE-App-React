import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';
import { PERMISSIONS } from 'react-native-permissions';
import { useTranslation } from 'react-i18next';

import Screen from '@components/common/Screen';
import CurrentMoveState from '@components/permissions/CurrentMoveState';
import PermissionItem from '@components/permissions/PermissionItem';
import { Colors, Metrics, Typography } from '@styles/index';
import { getStorageData, setStorageData } from '@services/localStorage';

const PermissionsScreen = () => {
	const { t } = useTranslation();

	useEffect(() => {
		const showPopup = async () => {
			const locationPopup = await getStorageData('locationPupup');
			if (!locationPopup) {
				Alert.alert(t('anot_tit_prominent_disclosure'), t('anot_prominent_disclosure'), [
					{
						text: 'OK',
						onPress: async () => {
							setStorageData('locationPupup', 'true');
						},
					},
				]);
			}
		};
		if (Platform.OS === 'android') {
			showPopup();
		}
	}, [t]);

	return (
		<Screen header={<CurrentMoveState />}>
			<View style={styles.container}>
				<Text style={styles.title}>{t('subtit_permissions')}</Text>
				<Text style={styles.description}>{t('txt_permissions')}</Text>

				{Platform.OS === 'ios' ? (
					<>
						<PermissionItem title={t('alert_location')} text={t('alert_loctext')} permission={PERMISSIONS.IOS.LOCATION_WHEN_IN_USE} additionalPermission={PERMISSIONS.IOS.LOCATION_ALWAYS} />

						<PermissionItem title={t('alert_motion')} text={t('alert_mottext')} permission={PERMISSIONS.IOS.MOTION} />

						<PermissionItem title={t('alert_messeges')} text={t('alert_mestext')} customPermission="notification" />
					</>
				) : (
					<>
						<PermissionItem
							title={t('alert_location')}
							text={t('alert_loctext')}
							permission={PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION}
							additionalPermission={Platform.Version >= 29 ? PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION : null}
						/>

						{Platform.Version >= 29 && <PermissionItem text={t('alert_mottext')} title={t('alert_motion')} permission={PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION} />}

						<PermissionItem text={t('alert_mottext')} title={t('alert_telephony')} permission={PERMISSIONS.ANDROID.READ_PHONE_STATE} />

						{Platform.Version >= 23 && (
							<>
								<PermissionItem text={t('alert_mottext')} title={t('alert_overlay')} customPermission="drawOverlay" />

								<PermissionItem text={t('alert_mottext')} title={t('alert_battery')} customPermission="battery" />
							</>
						)}

						<PermissionItem title={t('alert_messeges')} text={t('alert_mestext')} customPermission="notification" />
					</>
				)}
			</View>
		</Screen>
	);
};

export default PermissionsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		...Typography.h2,
		marginBottom: Metrics.normalize(8),
	},
	description: {
		...Typography.p,
		color: Colors.GREY,
		marginBottom: Metrics.normalize(16),
	},
});
