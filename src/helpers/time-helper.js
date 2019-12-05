import dayjs from 'dayjs/esm';
import utc from 'dayjs/esm/plugin/utc';

export function dateParamString(dateStr, end = false) {
	dayjs.extend(utc);
	let date = dayjs.utc(dateStr);

	if (end) {
		date = date.endOf('day');
	}

	return date.toISOString();
}

export function getHoursAndMinutes(minutes) {
	const hours = Math.floor(minutes / 60);
	return `${hours}h ${minutes % 60}m`;
}
