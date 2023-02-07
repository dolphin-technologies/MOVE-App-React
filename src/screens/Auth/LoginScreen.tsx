import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CheckBox from '@react-native-community/checkbox';
import { CompositeScreenProps } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Button from '@components/common/Button';
import Screen from '@components/common/Screen';
import { loginUser } from '@store/features/user/userSlice';
import { AuthStackParamList } from '@navigation/authStacks/AuthStack';
import { Typography, Colors, Common, Metrics } from '@styles/index';
import { RootStackParamList } from '@navigation/Root';
import { Urls } from '@config/index';

type FormData = {
	email: string;
	password: string;
};
const LoginScreen = ({ navigation }: CompositeScreenProps<NativeStackScreenProps<RootStackParamList>, NativeStackScreenProps<AuthStackParamList, 'Login'>>) => {
	const { t } = useTranslation();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const [termsCheckbox, setTermsCheckbox] = useState(false);
	const [privacyCheckbox, setPrivacyCheckbox] = useState(false);
	const dispatch = useDispatch();

	const onSubmit = (data: FormData) => {
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
		dispatch(loginUser({ email: data.email, password: data.password }));
	};

	return (
		<Screen>
			<Text style={styles.title}>{t('tit_dolphin_move')}</Text>
			<Text style={styles.desc}>{t('txt_login_welcometext')}</Text>

			<View style={styles.box}>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_your_email')}</Text>
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
					{errors.email && <Text style={styles.error}>{errors.email?.message || t('err_field_required')}</Text>}
				</View>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_your_password')}</Text>

					<Controller
						control={control}
						rules={{
							required: true,
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
								returnKeyType="done"
								textContentType="password"
								underlineColorAndroid="transparent"
								autoCapitalize="none"
								multiline={false}
							/>
						)}
						name="password"
					/>
					{errors.password && <Text style={styles.error}>{t('err_field_required')}</Text>}
				</View>
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

				<Button title="Login" onPress={handleSubmit(onSubmit)} />
			</View>

			<View style={styles.registerHolder}>
				<Pressable
					onPress={() => {
						navigation.navigate('Register');
					}}
				>
					<Text style={styles.link}>{t('lnk_dont_have_account')}</Text>
				</Pressable>
				<Pressable
					onPress={() => {
						navigation.navigate('Password');
					}}
				>
					<Text style={styles.link}>{t('lnk_forgot_password_q')}</Text>
				</Pressable>
			</View>
		</Screen>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	title: {
		...Typography.h1,
		textAlign: 'center',
		color: Colors.DARK_BLUE,
		marginBottom: Metrics.normalize(16),
	},
	registerHolder: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	desc: {
		...Typography.p,
		textAlign: 'center',
		color: Colors.GREY,
		marginBottom: Metrics.normalize(16),
	},

	checkbox: {
		width: Metrics.normalize(18),
		height: Metrics.normalize(18),
	},

	inputHolder: {
		marginBottom: Metrics.normalize(24),
	},

	checkboxHolder: {
		marginBottom: Metrics.normalize(24),
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

	link: {
		...Typography.p,
		color: Colors.GREEN,
		marginBottom: Metrics.normalize(8),
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
});
