module.exports = function (api) {
	api.cache(true);
	return {
		env: {
			production: {
				plugins: ['transform-remove-console'],
			},
		},
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					alias: {
						'@': './src',
						'@config': './src/config',
						'@screens': './src/screens',
						'@components': './src/components',
						'@store': './src/store',
						'@styles': './src/styles',
						'@hooks': './src/hooks',
						'@utils': './src/utils',
						'@services': './src/services',
						'@navigation': './src/navigation',
						'@assets': './assets',
						'@locales': './locales',
					},
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};
