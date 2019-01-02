const { TextDecoder, TextEncoder } = require('util');
require('./dataview-64');

const pattern =
  '([aAZbBhHcCWqQnNvVuUx@]|[sSlLiI][\\!><]?)(?:([\\d*]+)|(?:\\[(.*)\\]))?(?:\\$([a-z0-9_]+)\\b)?';
const typeMap = {
  x: { length: 1 },
  b: { length: 1 },
  //B: { length: 1, fn: 'Uint8', little: true }, // bit
  // h: { length: 2, fn: 'Uint16' },
  // H: { length: 2, fn: 'Uint16', little: true }, // nibble
  c: { length: 1, fn: 'Int8' }, // char == byte
  C: { length: 1, fn: 'Uint8' },
  a: { length: 1, fn: 'Uint8' }, // string with arbitrary, null padded
  A: { length: 1, fn: 'Uint8' }, // string with arbitrary, space padded
  s: { length: 2, fn: 'Int16' },
  S: { length: 2, fn: 'Uint16' },
  i: { length: 4, fn: 'Int32' },
  I: { length: 4, fn: 'Uint32' },
  l: { length: 4, fn: 'Int64' },
  L: { length: 4, fn: 'Uint64' },
  n: { length: 2, fn: 'Uint16', little: false },
  N: { length: 4, fn: 'Uint32', little: false },
  f: { length: 4, fn: 'Float32' },
  d: { length: 8, fn: 'Float64' },
};

const decode = a => new TextDecoder().decode(a);
const encode = a => new TextEncoder().encode(a);

function binarySlice(value, ptr, length) {
  if (!length || isNaN(length)) {
    length = 8 - ptr;
  }
  const mask = 2 ** length - 1;
  const shift = 8 - (ptr + length);
  const res = (value >> shift) & mask;
  return res;
}

unpack('b$flash b$bright b3$ink b3$paper', 0b10101010); // ?

function unpack(template, data, p = 0) {
  const result = {}; // return an object

  if (Array.isArray(data)) {
    data = Uint8Array.from(data);
  }

  if (typeof data === 'string') {
    data = encode(data).buffer; // ?
  } else if (typeof data === 'number') {
    if ((data | 0) !== data) {
      // float
      data = Float64Array.from([data]).buffer;
    } else {
      data = Int32Array.from([data]).buffer;
    }
  } else if (ArrayBuffer.isView(data)) {
    data = data.buffer;
  }

  const re = new RegExp(pattern, 'g');
  let m = [];
  let bytePtr = 0;

  const firstChr = template[0];
  const defaultLittle = firstChr === '<' ? true : false;

  let templateCounter = -1;

  while ((m = re.exec(template))) {
    templateCounter++;
    const index = m[4] || templateCounter;
    let little = defaultLittle;
    let length = null;
    if (typeMap[m[2]]) {
      length = typeMap[m[2]].length;
    } else {
      length = parseInt(m[2] || 1);
    }

    let c = m[1];

    if (c.length === 2) {
      little = c[1] === '<';
      c = c[0];
    }

    const type = typeMap[c];

    if (!type) {
      throw new Error(`unsupported type "${c}"`);
    }

    if (type.little !== undefined) {
      little = type.little;
    }

    const size = type.length; // ?
    let end = c === 'b' ? 1 : size * length;

    if (isNaN(length)) {
      end = data.byteLength - p;
    }

    if (p + end > data.byteLength) {
      return result;
    }
    const view = new DataView(data, p, end);

    if (c !== 'b') {
      // reset the byte counter
      bytePtr = 0;
    }

    switch (c) {
      case 'b':
        c = view.getUint8(0, little);
        result[index] = binarySlice(c, bytePtr, length);
        result[index]; // ? [index,result[index],c, bytePtr, length]

        bytePtr += length;
        if (bytePtr > 7) {
          p++;
          bytePtr = 0;
        }

        break;
      case 'x':
        // x is skipped null bytes
        templateCounter--;
        p += end;
        break;
      case 'a':
      case 'A':
        result[index] = decode(view).padEnd(length, c === 'A' ? ' ' : '\0');
        p += end;
        break;
      default:
        result[index] = view[`get${type.fn}`](0, little);
        p += end;
        break;
    }
  }

  return result;
}

module.exports = unpack;
