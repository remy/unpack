/* eslint-env jest */
const unpack = require('../src/unpack');

test('hex', () => {
  expect(unpack('a2x2a2', Uint8Array.from([65, 66, 0, 0, 67, 68]))).toEqual({
    0: 'AB',
    1: 'CD',
  });

  expect(unpack('>s', Uint8Array.from([0x12, 0x34]))[0]).toEqual(0x1234);
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

test('int', () => {
  expect(
    unpack(
      '<A8$sig C$eof C$issue C$version I$length',
      Uint8Array.from([
        0x50,
        0x4c,
        0x55,
        0x53,
        0x33,
        0x44,
        0x4f,
        0x53,
        0x1a,
        0x01,
        0x00,
        0xe7,
        0x00,
        0x00,
        0x00,
      ])
    ).length
  ).toBe(231);
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

  expect.objectContaining(unpack('a4$mc a$ver x15 N N N N N N', data), {
    ver: 2,
  });
});
