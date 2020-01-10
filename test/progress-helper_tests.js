import { formatProgress, formatTotalProgress } from '../src/helpers/progress-helper';
import { expect } from 'chai';

describe('ProgressHelpers', () => {
	describe('formatTotalProgress', () => {
		it('should handle 0 denominators properly', () => {
			const input = {
				structured: {
					numerator: 60,
					denominator: 0
				},
				unstructured: {
					numerator: 0,
					denominator: 60
				}
			};
			const output = formatTotalProgress(input);
			expect(output.numerator).to.equal(0);
			expect(output.denominator).to.equal(1);
		});
		it('should handle decimals properly', () => {
			const input = {
				structured: {
					numerator: 66,
					denominator: 120
				},
				unstructured: {
					numerator: 102,
					denominator: 120
				}
			};
			const output = formatTotalProgress(input);
			expect(output.numerator).to.equal(2.8);
			expect(output.denominator).to.equal(4);
		});
		it('should limit the numerator to the denominator', () => {
			const input = {
				structured: {
					numerator: 500,
					denominator: 120
				},
				unstructured: {
					numerator: 0,
					denominator: 120
				}
			};
			const output = formatTotalProgress(input);
			expect(output.numerator).to.equal(2);
			expect(output.denominator).to.equal(4);
		});
		it('should add numbers', () => {
			const input = {
				structured: {
					numerator: 60,
					denominator: 120
				},
				unstructured: {
					numerator: 120,
					denominator: 180
				}
			};
			const output = formatTotalProgress(input);
			expect(output.numerator).to.equal(3);
			expect(output.denominator).to.equal(5);
		});
	});
	describe('formatProgress', () => {
		it('should return the input if numerator < denominator', () => {
			const input = {
				numerator: 12,
				denominator: 60
			};
			const output = formatProgress(input);
			expect(output.numerator).to.equal(12);
			expect(output.denominator).to.equal(60);
		});
		it('should limit the numerator if it is too big', () => {
			const input = {
				numerator: 70,
				denominator: 60
			};
			const output = formatProgress(input);
			expect(output.numerator).to.equal(60);
			expect(output.denominator).to.equal(60);
		});
		it('should limit the numerator if it is too big and denominator is 0', () => {
			const input = {
				numerator: 70,
				denominator: 0
			};
			const output = formatProgress(input);
			expect(output.numerator).to.equal(0);
			expect(output.denominator).to.equal(0);
		});
	});
});
