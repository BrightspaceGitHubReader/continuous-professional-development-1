import { getHoursRounded } from './time-helper';

export function formatTotalProgress(progress) {
	const structured = formatProgress(progress.structured);
	const unstructured = formatProgress(progress.unstructured);
	return {
		numerator: getHoursRounded(structured.numerator) + getHoursRounded(unstructured.numerator),
		denominator: getHoursRounded(structured.denominator) + getHoursRounded(unstructured.denominator)
	};
}

export function formatProgress(progress) {
	if (progress.denominator === 0) {
		return progress;
	}
	if (progress.numerator > progress.denominator) {
		return {
			numerator: progress.denominator,
			denominator: progress.denominator
		};
	}
	return progress;
}
