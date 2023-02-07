import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';

import { Colors, Metrics } from '@styles/index';

type PercentCircleProps = {
	percent: number;
	radius: number;
	fontSize?: number;
};

const PercentCircle = ({ percent, radius, fontSize = 20 }: PercentCircleProps) => {
	return (
		<CircularProgress
			value={percent || 0}
			progressValueColor={Colors.DARK_BLUE}
			activeStrokeColor={Colors.GREEN_LIGHT}
			inActiveStrokeColor={Colors.GREY}
			radius={Metrics.normalize(radius)}
			progressValueFontSize={Metrics.normalize(fontSize)}
			progressValueStyle={{ fontWeight: 'normal' }}
			activeStrokeWidth={2}
			inActiveStrokeWidth={2}
		></CircularProgress>
	);
};

export default React.memo(PercentCircle);
