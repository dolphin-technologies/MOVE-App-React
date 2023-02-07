import React from 'react';

import AnimatedLinearGradient from './AnimatedLinearGradient';

const HeaderBackground = () => {
	return (
		<AnimatedLinearGradient
			startColors={[
				['#412568', '#24526D', '#24526D'],
				['#12305F', '#412568', '#12305F'],
				['#24526D', '#12305F', '#412568'],
			]}
			locations={[0, 0.5, 0.8]}
			start={{ x: 0, y: 0.5 }}
			end={{ x: 1, y: 0.5 }}
		/>
	);
};

export default HeaderBackground;
