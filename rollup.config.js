export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'umd',
      },
      {
        file: 'dist/index.es.js',
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
