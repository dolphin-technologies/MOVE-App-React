import { useState, useEffect } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CheckBox from '@react-native-community/checkbox';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import Button from '@components/common/Button';
import Screen from '@components/common/Screen';
import { getUser, updateUser, updateUserEmail, UpdateUserPayload } from '@store/features/user/userSlice';
import { logout } from '@store/features/runtime/runtimeSlice';
import { MoreStackParamList } from '@navigation/mainStacks/MoreStack';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { Typography, Colors, Common, Metrics } from '@styles/index';

type FormData = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	company: string;
	password: string;
};
const ProfileScreen = ({ navigation }: NativeStackScreenProps<MoreStackParamList>) => {
	const { t } = useTranslation();
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FormData>();

	const [genderRadio, setGenderRadio] = useState('');

	const { firstName, lastName, email, company, gender, phone } = useAppSelector((state) => state.user);

	const dispatch = useAppDispatch();

	const emailInput = watch('email');

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

	useEffect(() => {
		setValue('firstName', firstName);
		setValue('lastName', lastName);
		setValue('email', email);
		setValue('company', company);
		setValue('phone', phone);
		setGenderRadio(gender);
	}, [firstName, lastName, email, company, gender, phone, setValue]);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	const onSubmit = (data: FormData) => {
		const saveData: UpdateUserPayload = {
			gender: genderRadio,
			firstName: data.firstName,
			lastName: data.lastName,
			phone: data.phone,
			company: data.company,
		};

		// if (email && email !== data.email) {
		// 	saveData = { ...saveData, email: data.email };
		// }
		// if (data.password !== '') {
		// 	saveData = { ...saveData, password: data.password };
		// }

		dispatch(updateUser(saveData));

		if (data.email && data.password) {
			dispatch(updateUserEmail({ email: data.email, password: data.password }));
		}
	};

	const onLogout = () => {
		Alert.alert('', t('hint_logout_warning'), [
			{
				text: t('btn_confirm'),
				onPress: () => {
					dispatch(logout());
				},
			},
			{
				text: t('btn_cancel'),
				style: 'cancel',
			},
		]);
	};

	return (
		<Screen edges={['bottom']}>
			<View style={styles.box}>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('txt_ident')}</Text>

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
										disabled={Platform.OS === 'ios' && genderRadio === item.key}
										value={genderRadio === item.key}
										onValueChange={(newValue) => {
											setGenderRadio(item.key);
										}}
									/>
									<Text style={styles.checkboxText}>{item.value}</Text>
								</View>
							);
						})}
					</View>
				</View>
				<View style={styles.inputHolder}>
					<Text style={styles.lable}>{t('lbl_your_firstname')} * </Text>
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
					<Text style={styles.lable}>{t('lbl_your_lastname')} * </Text>
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
					<Text style={styles.lable}>{t('lbl_your_email2')} *</Text>
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
				{email !== emailInput ? (
					<View style={styles.inputHolder}>
						<Text style={styles.lable}>{t('lbl_password')} *</Text>

						<Controller
							control={control}
							rules={{
								required: email !== emailInput,
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
						{errors.password && <Text style={styles.error}>{t('err_required_fields')}</Text>}
					</View>
				) : null}
				<View style={{ marginBottom: Metrics.normalize(16) }}>
					<Button title={t('btn_save')} onPress={handleSubmit(onSubmit)} />
				</View>
				<Button title={t('btn_logout')} onPress={onLogout} />
			</View>

			<View style={styles.registerHolder}>
				<Pressable
					onPress={() => {
						navigation.navigate('ChangePassword');
					}}
				>
					<Text style={styles.link}>{t('lnk_change_password')}</Text>
				</Pressable>
			</View>
			<View style={styles.registerHolder}>
				<Pressable
					onPress={() => {
						navigation.navigate('DeleteAccount');
					}}
				>
					<Text style={styles.link}>{t('lnk_delete_account')}</Text>
				</Pressable>
			</View>
		</Screen>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	link: {
		...Typography.p,
		color: Colors.GREEN,
		marginBottom: Metrics.normalize(8),
	},

	inputHolder: {
		marginBottom: Metrics.normalize(24),
	},

	checkbox: {
		width: Metrics.normalize(18),
		height: Metrics.normalize(18),
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
