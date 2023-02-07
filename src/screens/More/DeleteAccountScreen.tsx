import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from '@components/common/Button';
import Screen from '@components/common/Screen';
import { useAppDispatch } from '@hooks/redux';
import { Typography, Colors, Common, Metrics } from '@styles/index';
import { deleteAccount } from '@store/features/user/userSlice';

type FormData = {
	password: string;
	newPassword: string;
	repeatPassword: string;
};
const DeleteAccountScreen = () => {
	const { t } = useTranslation();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const dispatch = useAppDispatch();

	const onSubmit = (data: FormData) => {
		const { password } = data;
		dispatch(deleteAccount({ password }));
	};

	return (
		<Screen edges={['bottom']}>
			<View style={styles.box}>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_password')} *</Text>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								secureTextEntry
								importantForAutofill="yes"
								placeholder={'~Password'}
								style={styles.input}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								autoCorrect={false}
								autoCapitalize="none"
								returnKeyType="done"
								textContentType="password"
								underlineColorAndroid="transparent"
								multiline={false}
							/>
						)}
						name="password"
					/>
					{errors.password && <Text style={styles.error}>{t('err_required_fields')} *</Text>}
				</View>

				<View style={{ marginBottom: Metrics.normalize(16) }}>
					<Button title={t('lnk_delete_account')} onPress={handleSubmit(onSubmit)} />
				</View>
			</View>
		</Screen>
	);
};

export default DeleteAccountScreen;

const styles = StyleSheet.create({
	link: {
		...Typography.p,
		color: Colors.GREEN,
		marginBottom: Metrics.normalize(8),
	},

	inputHolder: {
		marginBottom: Metrics.normalize(24),
	},

	radioHolder: {
		marginTop: Metrics.normalize(8),
		width: Metrics.normalize(90),
		flexDirection: 'row',
		alignItems: 'center',
	},

	error: {
		marginTop: Metrics.normalize(8),
		...Typography.p,
		color: Colors.RED,
	},
	checkboxText: {
		marginLeft: Platform.OS === 'android' ? 16 : 8,
		...Typography.p,
		color: Colors.GREY,
		lineHeight: Metrics.normalize(18),
	},

	box: {
		...Common.greyBox,
		marginBottom: Metrics.normalize(24),
	},

	input: {
		...Common.input,
	},
	lable: {
		...Common.lable,
	},

	registerHolder: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
