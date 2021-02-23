import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/main.js',
    format: 'cjs'
  },
  external: ['alphabetjs'],
  plugins: [
    commonjs(),
    typescript({allowSyntheticDefaultImports: true})
  ],
}