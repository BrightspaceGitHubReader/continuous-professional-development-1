import { dateParamString, getHoursAndMinutes } from '../src/helpers/time-helper';
import { expect } from 'chai';
import moment from 'moment';

describe('TimeHelpers', () => {
	describe('basic', () => {
		it('should produce beginning of day if not end', () => {
			const date = '2019-12-04';
			const param = dateParamString(date);
			const testDate = moment.utc(param);
			expect(testDate.hours()).to.equal(0);
			expect(testDate.minutes()).to.equal(0);
			expect(testDate.seconds()).to.equal(0);
		});
		it('should produce end of day if end', () => {
			const date = '2019-12-04';
			const param = dateParamString(date, true);
			const testDate = moment.utc(param);
			expect(testDate.hours()).to.equal(23);
			expect(testDate.minutes()).to.equal(59);
			expect(testDate.seconds()).to.equal(59);
		});
	});
	describe('getHoursAndMinutes', () => {
		it('should produce nothing if 0', () => {
			const minutes = 0;
			const result = getHoursAndMinutes(minutes);
			expect(result).to.equal('0h 0m');
		});
		it('should produce correct output when greater than and not divisible by 60', () => {
			const minutes = 100;
			const result = getHoursAndMinutes(minutes);
			expect(result).to.equal('1h 40m');
		});
		it('should produce correct output when greater than and divisible by 60', () => {
			const minutes = 120;
			const result = getHoursAndMinutes(minutes);
			expect(result).to.equal('2h 0m');
		});
		it('should produce correct output when less than 60', () => {
			const minutes = 40;
			const result = getHoursAndMinutes(minutes);
			expect(result).to.equal('0h 40m');
		});
	});
});
