import React, { useEffect, useRef, useState } from 'react'; // we need this to make JSX compile
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useAnimatedProps, useSharedValue, withTiming, interpolateColor, Easing } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

type AnimatedLinearGradientType = {
	startColors: Array<Array<string>>;
	colors?: Array<string>;
	locations: Array<number>;
	start: { x: number; y: number };
	end: { x: number; y: number };
	duration?: number;
};

const AnimatedLinearGradient = ({ startColors, colors, locations, start, end, duration }: AnimatedLinearGradientType) => {
	const animatedValue = useSharedValue(0);
	const [showColors, setShowColors] = useState(startColors);
	const prevColors = useRef<Array<Array<string>>>([]);

	useEffect(() => {
		prevColors.current = showColors;
	}, [showColors]);

	useEffect(() => {
		let newColors = [];

		if (colors) {
			let hasChanged = false;
			newColors = startColors.map((startColor, index) => {
				const prevColor = prevColors.current[index][prevColors.current[index].length - 1];
				const newColor = colors[index];

				if (prevColor !== newColor) {
					hasChanged = true;
				}
				return [prevColor, newColor];
			});
			if (hasChanged) {
				setShowColors(newColors);
			}
		}
	}, [colors, startColors]);

	useEffect(() => {
		animatedValue.value = 0;
		animatedValue.value = withTiming(showColors[0].length, { duration: duration || 2500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
	}, [animatedValue, showColors, duration]);

	const gradientProps = useAnimatedProps(() => {
		return {
			colors: showColors.map((data) => {
				return interpolateColor(
					animatedValue.value,
					Array(showColors[0].length)
						.fill(null)
						.map((_, i) => i),
					data
				);
			}),
		};
	});

	return <AnimatedGradient colors={showColors[0]} style={styles.linearGradient} start={start} end={end} locations={locations} animatedProps={gradientProps} />;
};

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
	},
});

export default React.memo(AnimatedLinearGradient);
