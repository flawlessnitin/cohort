import {describe, it, expect} from '@jest/globals';
import { sum, multiply } from '../index';

describe('sum function', () => {
  it('should return the sum of two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
  it("should return a sum of negative numbers", () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});

describe('multiply function', () => {
  it('should return the product of two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
  });
  it("should return a product of negative numbers", () => {
    expect(multiply(-2, -3)).toBe(6);
  });
});
