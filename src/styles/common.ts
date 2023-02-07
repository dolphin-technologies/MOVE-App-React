import * as Colors from './colors';
import * as Metrics from './metrics';
import * as Typography from './typography';

export const greyBox = {
	backgroundColor: Colors.PALE_GREY,
	borderRadius: 16,
	paddingTop: Metrics.normalize(24),
	paddingLeft: Metrics.normalize(16),
	paddingRight: Metrics.normalize(16),
	paddingBottom: Metrics.normalize(24),
};

export const lable = {
	fontSize: Metrics.normalize(14),
	fontFamily: Typography.font.fontBold,
	marginBottom: Metrics.normalize(8),
	color: Colors.DARK_BLUE,
	textTransform: 'uppercase' as const,
};

export const input = {
	fontSize: Metrics.normalize(16),
	fontFamily: Typography.font.fontRegular,
	backgroundColor: Colors.WHITE,
	height: Metrics.normalize(48),
	borderColor: Colors.LIGHT_GREY,
	borderWidth: 1,
	borderRadius: 5,
	paddingHorizontal: Metrics.normalize(16),
};
