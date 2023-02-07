import moment from 'moment';

export const getMinutesBetween = (startTs: string, endTs: string): number => {
	const startTime = moment(startTs);
	const endTime = moment(endTs);
	const diff = endTime.diff(startTime, 'minutes');
	return diff;
};

export const getHandMFromMinutes = (minutes: number): string => {
	const hours = minutes / 60;
	const rHours = Math.floor(hours);
	const min = (hours - rHours) * 60;
	const rMin = Math.round(min);
	return `${rHours}h ${rMin}m`;
};

export const extractHostname = (url: string): string => {
	let hostname;
	if (url.indexOf('//') > -1) {
		hostname = url.split('/')[2];
	} else {
		hostname = url.split('/')[0];
	}
	hostname = hostname.split(':')[0];
	hostname = hostname.split('?')[0];

	return hostname;
};
