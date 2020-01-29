import dayjs from 'dayjs/esm';
import utc from 'dayjs/esm/plugin/utc';

dayjs.extend(utc);

export function formatForDatePicker(date) {
	return dayjs(date).format('YYYY-MM-DD');
}

export function dateParamString(dateStr, end = false) {
	let date = dayjs(dateStr);

	if (end) {
		date = date.endOf('day');
	}

	return date.toISOString();
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

export function getHoursRounded(minutes) {
	const hours = minutes / 60;
	return roundToOneDecimal(hours);
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

export function roundToOneDecimal(number) {
	return Number(number.toFixed(1));
}

export function getMonthFromDate(date) {
	return date.getMonth() + 1;
}

export function getNonLeapYearDate(month, date) {
	const nonLeapYear = 2019;
	return new Date(nonLeapYear, month - 1, date);
}

export function getCurrentDate() {
	const today = new Date();
	if (today.getMonth() === 1 && today.getDate() === 29) {
		today.setDate(28);
	}
	return today;
}

export function toLocalDate(dateString) {
	const date = dayjs(dateString).utc();
	return new Date(date.year(), date.month(), date.date());
}
