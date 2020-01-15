import { decimalToPercent } from '../src/helpers/record-helper';
import { expect } from 'chai';

describe('RecordHelpers', () => {
	describe('decimalToPercent', () => {
		it('make the input into a percentage', () => {
			const expected =  {
				percent: '70.0'
			};
			expect(decimalToPercent(0.7)).to.deep.equal(expected);
		});
		it('round down to one decimal place', () => {
			const expected =  {
				percent: '71.1'
			};
			expect(decimalToPercent(0.711111111111111111)).to.deep.equal(expected);
		});
		it('round up to one decimal place', () => {
			const expected =  {
				percent: '71.2'
			};
			expect(decimalToPercent(0.7119999999999999)).to.deep.equal(expected);
		});
	});
});
