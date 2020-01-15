import { dateParamString, getHoursAndMinutes } from '../src/helpers/time-helper';
import dayjs from 'dayjs';
import { expect } from 'chai';

describe('TimeHelpers', () => {
	describe('dateParamString', () => {
		it('should produce beginning of day if not end', () => {
			const date = '2019-12-04';
			const param = dateParamString(date);
			const testDate = dayjs(param);
			expect(testDate.hour()).to.equal(0);
			expect(testDate.minute()).to.equal(0);
			expect(testDate.second()).to.equal(0);
		});
		it('should produce end of day if end', () => {
			const date = '2019-12-04';
			const param = dateParamString(date, true);
			const testDate = dayjs(param);
			expect(testDate.hour()).to.equal(23);
			expect(testDate.minute()).to.equal(59);
			expect(testDate.second()).to.equal(59);
		});
	});
	describe('getHoursAndMinutes', () => {
		it('should produce nothing if 0', () => {
			const minutes = 0;
			const result = getHoursAndMinutes(minutes);
			expect(result.minutes).to.equal(0);
			expect(result.hours).to.equal(0);
		});
		it('should produce correct output when greater than and not divisible by 60', () => {
			const minutes = 100;
			const result = getHoursAndMinutes(minutes);
			expect(result.hours).to.equal(1);
			expect(result.minutes).to.equal(40);
		});
		it('should produce correct output when greater than and divisible by 60', () => {
			const minutes = 120;
			const result = getHoursAndMinutes(minutes);
			expect(result.hours).to.equal(2);
			expect(result.minutes).to.equal(0);
		});
		it('should produce correct output when less than 60', () => {
			const minutes = 40;
			const result = getHoursAndMinutes(minutes);
			expect(result.hours).to.equal(0);
			expect(result.minutes).to.equal(40);
		});
	});
});
