import { dateParamString, getCurrentDate, getHoursAndMinutes } from '../src/helpers/time-helper';
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
	describe('getCurrentDate', () => {
		let originalDateNow;
		beforeEach(() => {
			originalDateNow = Date.now;
		});
		afterEach(() => {
			Date.now = originalDateNow;
		});
		const mockDateFeb29 = () => {
			return new Date(2020, 1, 29);
		};
		const mockDateNotFeb29 = () => {
			return new Date(2020, 6, 12);
		};
		it('should return Feb 28th date if the current date is Feb 29th in a leap year', () => {
			Date.now = mockDateFeb29;
			const currentDate = getCurrentDate();
			expect(currentDate.getMonth()).to.equal(1);
			expect(currentDate.getDate()).to.equal(28);
		});
		it('should return current date if the current date is not Feb 29th in a leap year', () => {
			Date.now = mockDateNotFeb29;
			const currentDate = getCurrentDate();
			expect(currentDate.getMonth()).to.equal(6);
			expect(currentDate.getDate()).to.equal(12);
		});
	});
});
