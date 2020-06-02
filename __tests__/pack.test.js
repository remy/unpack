global.TextEncoder = require('text-encoding').TextEncoder;
import test from 'ava';
import { encode } from '../src/lib';
import { pack } from '../src/';

test('strings and null', (t) => {
  t.deepEqual(
    pack('a2x2a2', ['AB', 'CD']),
    Uint8Array.from([65, 66, 0, 0, 67, 68])
  );
});

test('int and endianness', (t) => {
  t.deepEqual(pack('>s', [0x1234]), Uint8Array.from([0x12, 0x34]));

  t.deepEqual(
    pack('>s3', [0x1234, 0x1234, 0x1234]),
    Uint8Array.from([0x12, 0x34, 0x12, 0x34, 0x12, 0x34])
  );

  t.deepEqual(pack('<s', [0x3412]), Uint8Array.from([0x12, 0x34]));
  t.deepEqual(
    pack('<s3', [0x3412, 0x3412, 0x3412]),
    Uint8Array.from([0x12, 0x34, 0x12, 0x34, 0x12, 0x34])
  );
});

test('long and endianness', (t) => {
  t.deepEqual(
    pack('>i', [0x12345678]),
    Uint8Array.from([0x12, 0x34, 0x56, 0x78])
  );
});

test('int encoded', (t) => {
  t.deepEqual(
    pack('S$a S$b I$c', { a: 1, b: 2, c: 3 }),
    encode('\x00\x01\x00\x02\x00\x00\x00\x03')
  );
});

test('binary', (t) => {
  t.deepEqual(
    pack('b b b3 b3', {
      0: 1,
      1: 0,
      2: 0b101,
      3: 0b010,
    }),
    Uint8Array.of(0b10101010)
  );
});
