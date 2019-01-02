/* eslint-env jest */
const unpack = require('../unpack');

test('hex', () => {
  // expect(unpack('ccxxcc', Uint8Array.from([65, 66, 67, 68])).join('')).toEqual(
  //   'AB\0\0CD'
  // );
  // expect(unpack('s10HHb', 'raymond   \x32\x12\x08\x01\x08')[3]).toEqual(8);

  // expect(unpack('H4', 1234)).toBe(0x12 + 0x34);
  expect(unpack('<s', Uint8Array.from([0x12, 0x34]))[0]).toEqual(0x3412);

  expect(unpack('S$a S$b I$c', '\x00\x01\x00\x02\x00\x00\x00\x03')).toEqual({
    a: 1,
    b: 2,
    c: 3,
  });
});

test('binary', () => {
  expect(unpack('b b b3 b3', 0b10101010)).toEqual({
    0: 1,
    1: 0,
    2: 0b101,
    3: 0b010,
  });
});

test('packed example', () => {
  const data = Uint8Array.from([
    0x54,
    0x5a,
    0x69,
    0x66,
    0x32,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x04,
    0x00,
    0x00,
    0x00,
    0x04,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0xeb,
    0x00,
    0x00,
    0x00,
    0x04,
    0x00,
    0x00,
    0x00,
    0x10,
  ]);

  expect(unpack('a4$mc a$ver x15 N N N N N N', data));
});
