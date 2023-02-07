import * as Colors from './colors';
import * as Metrics from './metrics';

type Font = 'fontBlack' | 'fontRegular' | 'fontBold';
export const font: Record<Font, string> = {
	fontBlack: 'FontBlack',
	fontRegular: 'FontRegular',
	fontBold: 'FontBold',
};

export const h1 = {
	fontFamily: font.fontBlack,
	fontSize: Metrics.normalize(20),
	lineHeight: Metrics.normalize(24),
	color: Colors.DARK_BLUE,
	textTransform: 'uppercase' as const,
};

export const h2 = {
	fontFamily: font.fontBlack,
	fontSize: Metrics.normalize(17),
	lineHeight: Metrics.normalize(20),
	color: Colors.DARK_BLUE,
	textTransform: 'uppercase' as const,
};

export const p = {
	fontFamily: font.fontRegular,
	fontSize: Metrics.normalize(14),
	lineHeight: Metrics.normalize(18),
};

export const b = {
	fontFamily: font.fontBold,
	fontSize: Metrics.normalize(14),
	lineHeight: Metrics.normalize(18),
};
