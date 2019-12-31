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
	return [
		{
			Name: 'January',
			NumberOfDays: 31
		},
		{
			Name: 'February',
			NumberOfDays: 28
		},
		{
			Name: 'March',
			NumberOfDays: 31
		},
		{
			Name: 'April',
			NumberOfDays: 30
		},
		{
			Name: 'May',
			NumberOfDays: 31
		},
		{
			Name: 'June',
			NumberOfDays: 30
		},
		{
			Name: 'July',
			NumberOfDays: 31
		},
		{
			Name: 'August',
			NumberOfDays: 31
		},
		{
			Name: 'September',
			NumberOfDays: 30
		},
		{
			Name: 'October',
			NumberOfDays: 31
		},
		{
			Name: 'November',
			NumberOfDays: 30
		},
		{
			Name: 'December',
			NumberOfDays: 31
		},
	];
}
