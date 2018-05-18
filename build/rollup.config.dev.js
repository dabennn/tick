import babel from 'rollup-plugin-babel';

export default {
  input: 'src/tick.js',
  output: {
    file: 'dist/tick.js',
    format: 'umd',
    name: 'Tick'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: [
        'external-helpers'
      ]
    })
  ]
};
