import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default [{
  input: 'src/tick.js',
  output: {
    file: 'dist/tick.js',
    format: 'umd',
    name: 'Tick'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}, {
  input: 'src/tick.js',
  output: [
    {
      file: 'dist/tick.min.js',
      format: 'umd',
      name: 'Tick'
    },
    {
      file: 'dist/tick.cjs.min.js',
      format: 'cjs'
    },
    {
      file: 'dist/tick.iife.min.js',
      format: 'iife',
      name: 'Tick'
    },
    {
      file: 'dist/tick.esm.min.js',
      format: 'es'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: [
        'external-helpers'
      ]
    }),
    uglify()
  ]
}];
