import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default [{
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
}, {
  input: 'src/bitment.js',
  output: [
    {
      file: 'dist/bitment.min.js',
      format: 'umd',
      name: 'Bitment'
    },
    {
      file: 'dist/bitment.cjs.min.js',
      format: 'cjs'
    },
    {
      file: 'dist/bitment.iife.min.js',
      format: 'iife',
      name: 'Bitment'
    },
    {
      file: 'dist/bitment.esm.min.js',
      format: 'es'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
}];
