import { expect } from 'chai';
import { getHoursAndMinutesString } from '../src/helpers/time-helper';

describe('TimeHelpers', () => {
	describe('getHoursAndMinutesString', () => {
		it('should produce nothing if 0', () => {
			const minutes = 0;
			const result = getHoursAndMinutesString(minutes);
			expect(result).to.equal('0h 0m');
		});
		it('should produce correct output when greater than and not divisible by 60', () => {
			const minutes = 100;
			const result = getHoursAndMinutesString(minutes);
			expect(result).to.equal('1h 40m');
		});
		it('should produce correct output when greater than and divisible by 60', () => {
			const minutes = 120;
			const result = getHoursAndMinutesString(minutes);
			expect(result).to.equal('2h 0m');
		});
		it('should produce correct output when less than 60', () => {
			const minutes = 40;
			const result = getHoursAndMinutesString(minutes);
			expect(result).to.equal('0h 40m');
		});
	});
});
