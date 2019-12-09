import dayjs from 'dayjs/esm';

export function dateParamString(dateStr, end = false) {
	let date = dayjs(dateStr);

	if (end) {
		date = date.endOf('day');
	}

	return date.toISOString();
}

export function getHoursAndMinutes(minutes) {
	return `${getHours(minutes)}h ${getMinutes(minutes)}m`;
}

export function getHours(minutes) {
	return Math.floor(minutes / 60);
}

export function getMinutes(minutes) {
	return minutes % 60;
}

export function getTotalMinutes(hours, minutes) {
	return parseInt(hours || 0) * 60 + parseInt(minutes || 0);
}
