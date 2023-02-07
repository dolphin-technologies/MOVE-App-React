import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Image, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-toast-message';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { RootStackParamList } from '@navigation/Root';
import Button from '@components/common/Button';
import Screen from '@components/common/Screen';
import { AuthStackParamList } from '@navigation/authStacks/AuthStack';
import { registerUser } from '@store/features/user/userSlice';
import { Typography, Colors, Common, Metrics } from '@styles/index';
import { Urls } from '@config/index';

type FormData = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	company: string;
	password: string;
	repeatPassword: string;
};
const RegisterScreen = ({ navigation }: CompositeScreenProps<NativeStackScreenProps<RootStackParamList>, NativeStackScreenProps<AuthStackParamList, 'Register'>>) => {
	const { t } = useTranslation();
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();
	const [termsCheckbox, setTermsCheckbox] = useState(false);
	const [privacyCheckbox, setPrivacyCheckbox] = useState(false);
	const [gender, setGender] = useState('');

	const dispatch = useDispatch();

	const genderType = [
		{
			key: 'female',
			value: t('lbl_mrs'),
		},
		{
			key: 'male',
			value: t('lbl_mr'),
		},
		{
			key: 'diverse',
			value: t('lbl_nonbinary'),
		},
	];

	const onSubmit = (data: FormData) => {
		if (!gender) {
			Toast.show({
				type: 'info',
				text1: t('err_missing_gender'),
			});
			return false;
		}

		if (!termsCheckbox) {
			Toast.show({
				type: 'info',
				text1: t('err_tou_not_accepted'),
			});
			return false;
		}

		if (!privacyCheckbox) {
			Toast.show({
				type: 'info',
				text1: t('err_dp_not_accepted'),
			});
			return false;
		}

		dispatch(
			registerUser({
				gender: gender,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phone: data.phone,
				company: data.company,
				password: data.password,
				consents: [
					{ type: 'tou', state: true },
					{ type: 'privacy', state: true },
				],
			})
		);
	};

	return (
		<Screen edges={['bottom']}>
			<View style={styles.imageHolder}>
				<Image source={require('@assets/images/onboard-register.png')} resizeMode="contain" />
			</View>

			<Text style={styles.title}>{t('tit_reg')}</Text>
			<Text style={styles.desc}>{t('txt_plsreg')}</Text>
			<View style={styles.line}></View>

			<View style={styles.box}>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('txt_ident')} *</Text>

					<View style={{ flexDirection: 'row' }}>
						{genderType.map((item) => {
							return (
								<View key={item.key} style={styles.radioHolder}>
									<CheckBox
										style={styles.checkbox}
										onTintColor={Colors.GREEN}
										onCheckColor={Colors.GREEN}
										lineWidth={1}
										boxType="circle"
										disabled={false}
										value={gender === item.key}
										onAnimationType="one-stroke"
										onValueChange={(newValue) => setGender(newValue ? item.key : '')}
									/>
									<Text style={styles.checkboxText}>{item.value}</Text>
								</View>
							);
						})}
					</View>
				</View>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_your_firstname')} *</Text>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput placeholder={t('placeholder_first_name')} style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} multiline={false} maxLength={25} />
						)}
						name="firstName"
					/>
					{errors.firstName && <Text style={styles.error}>{t('err_required_fields')}</Text>}
				</View>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_your_lastname')} *</Text>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput placeholder={t('placeholder_last_name')} style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} multiline={false} maxLength={25} />
						)}
						name="lastName"
					/>
					{errors.lastName && <Text style={styles.error}>{t('err_required_fields')}</Text>}
				</View>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_your_email')} *</Text>
					<Controller
						control={control}
						rules={{
							required: true,
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: t('err_invalid_email'),
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								keyboardType="email-address"
								textContentType="username"
								importantForAutofill="yes"
								autoCorrect={false}
								placeholder={t('placeholder_email')}
								style={styles.input}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								autoCapitalize="none"
								multiline={false}
							/>
						)}
						name="email"
					/>
					{errors.email && <Text style={styles.error}>{errors.email?.message || `${t('err_required_fields')}`}</Text>}
				</View>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_your_cell')}</Text>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput placeholder={t('placeholder_mobile')} keyboardType="phone-pad" style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} multiline={false} maxLength={25} />
						)}
						name="phone"
					/>
				</View>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_company_name')}</Text>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput placeholder={t('placeholder_company')} style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} multiline={false} maxLength={25} />
						)}
						name="company"
					/>
				</View>
				<View style={styles.boxLine} />
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_choose_password')} *</Text>

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
						name="password"
					/>

					{errors.password && <Text style={styles.error}>{errors.password?.message || t('hint_password')}</Text>}
				</View>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_repeat_password')} *</Text>

					<Controller
						control={control}
						rules={{
							required: t('err_required_fields'),
							validate: (value) => {
								if (value !== watch('password')) {
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
				<View style={styles.boxLine} />

				<View style={styles.checkboxHolder}>
					<CheckBox
						style={styles.checkbox}
						onTintColor={Colors.GREEN}
						onCheckColor={Colors.GREEN}
						lineWidth={2}
						boxType="square"
						disabled={false}
						value={termsCheckbox}
						onAnimationType="one-stroke"
						onValueChange={(newValue) => setTermsCheckbox(newValue)}
					/>
					<Text style={styles.checkboxText}>
						{t('lbl_accept')}{' '}
						<Text
							style={styles.checkboxTextLink}
							onPress={() => {
								navigation.navigate('WebView', { url: Urls.TERMS_OF_USE, title: t('lbl_tou') });
							}}
						>
							{t('lnk_terms_of_use')}
						</Text>
					</Text>
				</View>

				<View style={styles.checkboxHolder}>
					<CheckBox
						style={styles.checkbox}
						onTintColor={Colors.GREEN}
						onCheckColor={Colors.GREEN}
						lineWidth={2}
						boxType="square"
						disabled={false}
						value={privacyCheckbox}
						onAnimationType="one-stroke"
						onValueChange={(newValue) => setPrivacyCheckbox(newValue)}
					/>
					<Text style={styles.checkboxText}>
						{t('lbl_privacy')}{' '}
						<Text
							style={styles.checkboxTextLink}
							onPress={() => {
								navigation.navigate('WebView', { url: Urls.PRIVACY_POLICY, title: t('lbl_data_privacy') });
							}}
						>
							{t('lnk_privacy_policy')}
						</Text>
					</Text>
				</View>

				<Button title={t('btn_register')} onPress={handleSubmit(onSubmit)} />
			</View>
			<View style={styles.registerHolder}>
				<Pressable
					onPress={() => {
						navigation.navigate('Login');
					}}
				>
					<Text style={styles.link}>{t('lnk_existing_account')}</Text>
				</Pressable>
			</View>
		</Screen>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	imageHolder: {
		flex: 1,
		marginVertical: Metrics.normalize(48),
		alignItems: 'center',
	},
	title: {
		...Typography.h1,
		textAlign: 'center',

		marginBottom: Metrics.normalize(16),
	},

	checkbox: {
		width: Metrics.normalize(18),
		height: Metrics.normalize(18),
	},

	link: {
		...Typography.p,
		color: Colors.GREEN,
		marginBottom: Metrics.normalize(8),
	},

	desc: {
		...Typography.p,
		textAlign: 'center',
		color: Colors.GREY,
		marginBottom: Metrics.normalize(48),
	},

	inputHolder: {
		marginBottom: Metrics.normalize(24),
	},

	checkboxHolder: {
		marginBottom: Metrics.normalize(24),
		flexDirection: 'row',
		alignItems: 'center',
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

	checkboxTextLink: {
		...Typography.p,

		color: Colors.GREEN,
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

	line: {
		height: 1,
		backgroundColor: Colors.LIGHT_GREY,
		marginBottom: Metrics.normalize(16),
	},
	boxLine: {
		height: 1,
		backgroundColor: Colors.LIGHT_GREY,
		marginBottom: Metrics.normalize(24),
	},
	registerHolder: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
