import babel from 'rollup-plugin-babel';

export default {
  input: 'src/bitment.js',
  output: {
    file: 'dist/bitment.js',
    format: 'umd',
    name: 'Bitment'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
