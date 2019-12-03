export function dateParamString(dateStr, end = false) {
	const date = new Date(`${dateStr}`);
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth() + 1;
	const day = date.getDate();
	const zeroPrefixDay = day < 10 ? `0${day}` : day;
	return end ?
		`${year}-${month}-${zeroPrefixDay}T23:59:59.000Z` :
		`${year}-${month}-${zeroPrefixDay}T00:00:00.000Z`;
}

export function getHoursAndMinutes(minutes) {
	const hours = Math.floor(minutes / 60);
	return `${hours}h ${minutes % 60}m`;
}
