/* eslint-disable @typescript-eslint/no-var-requires */

const testConfig = require('./config/test.config');
const productionConfig = require('./config/production.config');

const config = () => {
	if (process.env.VERSION === 'production') {
		return productionConfig;
	} else {
		return testConfig;
	}
};

module.exports = config;
