import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from '@components/common/Button';
import Screen from '@components/common/Screen';
import { getNewPassword } from '@store/features/user/userSlice';
import { Typography, Colors, Common, Metrics } from '@styles/index';

type FormData = {
	email: string;
};
const PasswordScreen = () => {
	const { t } = useTranslation();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const dispatch = useDispatch();

	const onSubmit = (data: FormData) => {
		dispatch(getNewPassword({ email: data.email }));
	};

	return (
		<Screen>
			<Text style={styles.title}>{t('lbl_password')}</Text>
			<Text style={styles.desc}>{t('txt_login_welcometext')}</Text>

			<View style={styles.box}>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_your_email2')}</Text>
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

				<Button title={t('btn_ok')} onPress={handleSubmit(onSubmit)} />
			</View>
		</Screen>
	);
};

export default PasswordScreen;

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

	inputHolder: {
		marginBottom: Metrics.normalize(24),
	},

	error: {
		marginTop: Metrics.normalize(8),
		...Typography.p,
		color: Colors.RED,
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
