import dayjs from 'dayjs/esm';

export function dateParamString(dateStr, end = false) {
	let date = dayjs(dateStr);

	if (end) {
		date = date.endOf('day');
	}

	return date.toISOString();
}

export function getHoursAndMinutesString(minutes) {
	return `${getHours(minutes)}h ${getMinutes(minutes)}m`;
}

export function getHoursAndMinutes(minutes) {
	return {
		hours: getHours(minutes),
		minutes: getMinutes(minutes)
	};
}

export function getHours(minutes) {
	if (!minutes) {
		return 0;
	}
	return Math.floor(minutes / 60);
}

export function getHoursRounded(minutes, precision = 1) {
	const hours = minutes / 60;
	const multiplier = Math.pow(10, precision || 0);
	return Math.round(hours * multiplier) / multiplier;
}

export function getMinutes(minutes) {
	if (!minutes) {
		return 0;
	}
	return minutes % 60;
}

export function getTotalMinutes(hours, minutes) {
	return parseInt(hours || 0) * 60 + parseInt(minutes || 0);
}

export function getListOfMonths() {
	const months = window && window.data && window.data.months || Array.from(new Array(12), (val, index) => index + 1);
	const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	return months.map((Name, index) => { return {Name, NumberOfDays: days[index]};});
}
