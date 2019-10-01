import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = process.env.NODE_ENV === 'production';

export default (root) => ({
  input: path.resolve(root, 'src', 'index.js'),
  output: [
    {
      file: path.resolve(root, 'dist', 'index.js'),
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: path.resolve(root, 'dist', 'index.esm.js'),
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    production && terser(),
  ],
});
