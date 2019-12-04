import moment from 'moment';

export function dateParamString(dateStr, end = false) {
	const date = moment.utc(dateStr, 'YYYY-MM-DD');

	if (end) {
		date.endOf('day');
	} else {
		date.startOf('day');
	}

	return date.toISOString();
}

export function getHoursAndMinutes(minutes) {
	const hours = Math.floor(minutes / 60);
	return `${hours}h ${minutes % 60}m`;
}
