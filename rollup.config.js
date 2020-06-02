export default [
  {
    input: 'src/pack.js',
    output: [
      {
        file: 'dist/pack.js',
        format: 'umd',
        name: 'pack',
      },
    ],
  },
  {
    input: 'src/unpack.js',
    output: [
      {
        file: 'dist/unpack.js',
        format: 'umd',
        name: 'unpack',
        exports: 'named',
      },
    ],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'umd',
        name: 'unpack',
      },
      {
        file: 'dist/index.esm.js',
        format: 'es',
      },
      {
        file: 'dist/index-brower.js',
        format: 'iife',
        name: 'unpack',
      },
    ],
  },
];
