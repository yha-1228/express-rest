test('null', () => {
  expect(isNonNullable(null)).toBe(true);
});

test('undefined', () => {
  expect(isNonNullable(null)).toBe(true);
});

test('0', () => {
  expect(isNonNullable(0)).toBe(false);
});

test('Empty string', () => {
  expect(isNonNullable('')).toBe(false);
});

test('string', () => {
  expect(isNonNullable('foo')).toBe(false);
});

test('number', () => {
  expect(isNonNullable(123)).toBe(false);
});

test('key-value', () => {
  expect(isNonNullable({})).toBe(false);
  expect(isNonNullable({ foo: 'bar', buz: new Date() })).toBe(false);
});
