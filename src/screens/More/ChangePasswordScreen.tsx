import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from '@components/common/Button';
import Screen from '@components/common/Screen';
import { useAppDispatch } from '@hooks/redux';
import { Typography, Colors, Common, Metrics } from '@styles/index';
import { changePassword } from '@store/features/user/userSlice';

type FormData = {
	password: string;
	newPassword: string;
	repeatPassword: string;
};
const ChangePasswordScreen = () => {
	const { t } = useTranslation();
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();

	const dispatch = useAppDispatch();

	const onSubmit = (data: FormData) => {
		const { password, newPassword } = data;
		dispatch(changePassword({ password, newPassword }));
	};

	return (
		<Screen edges={['bottom']}>
			<View style={styles.box}>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_current_password')} *</Text>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								secureTextEntry
								importantForAutofill="yes"
								placeholder={t('lbl_your_password')}
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
					{errors.password && <Text style={styles.error}>{t('err_required_fields')}</Text>}
				</View>

				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_set_new_password')} *</Text>

					<Controller
						control={control}
						rules={{
							required: true,
							pattern: {
								value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&._-]?)[A-Za-z\d@$!%*#?&._-]{8,}$/,
								message: t('hint_password'),
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								secureTextEntry
								importantForAutofill="yes"
								placeholder={t('placeholder_choose_password')}
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
						name="newPassword"
					/>

					{errors.newPassword && <Text style={styles.error}>{errors.newPassword?.message || t('hint_password')}</Text>}
				</View>

				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_repeat_password')} *</Text>
					<Controller
						control={control}
						rules={{
							required: t('err_required_fields'),
							validate: (value) => {
								if (value !== watch('newPassword')) {
									return t('err_password_missmatch');
								}
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								secureTextEntry
								importantForAutofill="yes"
								placeholder={t('placeholder_repeat_password')}
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
						name="repeatPassword"
					/>
					{errors.repeatPassword && <Text style={styles.error}>{errors.repeatPassword.message}</Text>}
				</View>

				<View style={{ marginBottom: Metrics.normalize(16) }}>
					<Button title={t('btn_save')} onPress={handleSubmit(onSubmit)} />
				</View>
			</View>
		</Screen>
	);
};

export default ChangePasswordScreen;

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
