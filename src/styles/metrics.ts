import { Dimensions, PixelRatio } from 'react-native';

const baseWidth = 375;
const { width: windowWidth } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('screen');
const width = windowWidth > 0 ? windowWidth : screenWidth;
const scale = width / baseWidth;

export const normalize = (size: number): number => {
	if (scale >= 1 || scale <= 0.7) {
		return size;
	}
	const newSize = size * scale;
	return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const wp = (percentage: number): number => {
	const value = (percentage * width) / 100;
	return Math.round(PixelRatio.roundToNearestPixel(value));
};
