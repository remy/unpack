# unpack (and pack)

JavaScript module for unpacking and packing based loosely around the Perl packing syntax.

Working demo can be found at [unpack.isthe.link](https://unpack.isthe.link).

Lookup table for unpacking:

- `a` A string with arbitrary binary data, will be null padded.
- `A` text (ASCII) string, will be space padded.
- `b` A bit string (ascending bit order inside each byte).
- `c` A signed char (8-bit) value.
- `C` An unsigned char (octet) value.
- `s` A signed short (16-bit) value.
- `S` An unsigned short value.
- `i` A signed integer (32-bit) value.
- `I` A unsigned integer value.
- `l` A signed long (64-bit) value.
- `L` An unsigned long value.
- `n` An unsigned short (16-bit) in "network" (big-endian) order.
- `N` An unsigned long (32-bit) in "network" (big-endian) order.
- `f` A single-precision float in native format.
- `d` A double-precision float in native format.
- `x` A null byte (a.k.a ASCII NUL, "\000", chr(0))

Each type can also include a number, such as `A5` will unpack to a 5 byte ascii string.

Unless otherwise stated, endianness can be set to _little_ by using `<`, such as: `<I I L` unpacks using little endian 2 32bit unsigned ints and 1 64 bit long.
