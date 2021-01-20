const { makeChange } = require('./makeChange');
const from1To1000Sample = require('./sampleResults.json');

describe('makeChange', () => {
  it("returns null when there's no solution", () => {
    expect(makeChange(1)).toEqual(null);
    expect(makeChange(3)).toEqual(null);
  });

  it('gives an optimal solution for trivial cases', () => {
    expect(makeChange(2)).toEqual({ 2: 1, 5: 0, 10: 0 });
    expect(makeChange(4)).toEqual({ 2: 2, 5: 0, 10: 0 });
    expect(makeChange(5)).toEqual({ 2: 0, 5: 1, 10: 0 });
    expect(makeChange(7)).toEqual({ 2: 1, 5: 1, 10: 0 });
    expect(makeChange(9)).toEqual({ 2: 2, 5: 1, 10: 0 });
    expect(makeChange(10)).toEqual({ 2: 0, 5: 0, 10: 1 });
    expect(makeChange(15)).toEqual({ 2: 0, 5: 1, 10: 1 });
    expect(makeChange(17)).toEqual({ 2: 1, 5: 1, 10: 1 });
    expect(makeChange(42)).toEqual({ 2: 1, 5: 0, 10: 4 });
  });

  it('gives an optimal solution for non-trivial cases', () => {
    expect(makeChange(6)).toEqual({ 2: 3, 5: 0, 10: 0 });
    expect(makeChange(8)).toEqual({ 2: 4, 5: 0, 10: 0 });
    expect(makeChange(11)).toEqual({ 2: 3, 5: 1, 10: 0 });
    expect(makeChange(13)).toEqual({ 2: 4, 5: 1, 10: 0 });
    expect(makeChange(16)).toEqual({ 2: 3, 5: 0, 10: 1 });
    expect(makeChange(18)).toEqual({ 2: 4, 5: 0, 10: 1 });
    expect(makeChange(21)).toEqual({ 2: 3, 5: 1, 10: 1 });
    expect(makeChange(23)).toEqual({ 2: 4, 5: 1, 10: 1 });
    expect(makeChange(43)).toEqual({ 2: 4, 5: 1, 10: 3 });
  });

  it('gives good output for input amounts of 1 to 1000', () => {
    for (let i = 1; i < 1000; i += 1) {
      expect(makeChange(i)).toEqual(from1To1000Sample[i]);
    }
  });
});
