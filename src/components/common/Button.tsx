import LinearGradient from 'react-native-linear-gradient';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors, Metrics, Typography } from '@styles/index';

type ButtonProps = {
	title: string;
	onPress: () => void;
};
const Button = ({ title, onPress }: ButtonProps) => {
	const [pressed, setPressed] = useState(false);

	return (
		<Pressable onPress={onPress} onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)}>
			<LinearGradient colors={pressed ? Colors.BUTTON_GRADIENT_ACTIVE : Colors.BUTTON_GRADIENT} style={styles.button} />
			<Text style={styles.text}>{title}</Text>
		</Pressable>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		borderRadius: 5,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	text: {
		fontFamily: Typography.font.fontBold,
		lineHeight: Metrics.normalize(36),
		textAlign: 'center',
		color: Colors.WHITE,
	},
});
