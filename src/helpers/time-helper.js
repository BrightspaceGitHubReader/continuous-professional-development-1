export function dateParamString(dateStr, end = false) {
	const date = new Date(`${dateStr}`);
	if (end) {
		date.setHours(23);
		date.setMinutes(59);
		date.setSeconds(59);
	}
	return date.toISOString();
}

export function getHoursAndMinutes(minutes) {
	const hours = Math.floor(minutes / 60);
	return `${hours}h ${minutes % 60}m`;
}
