export function formatTotalProgress(progress) {
	const structured = formatProgress(progress.structured);
	const unstructured = formatProgress(progress.unstructured);
	return {
		numerator: structured.numerator + unstructured.numerator,
		denominator: structured.denominator + unstructured.denominator
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
