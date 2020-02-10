import path from 'path';
import typescript from 'rollup-plugin-typescript';
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
    typescript({
      module: 'CommonJS',
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs({ extensions: ['.js', '.ts'] }),
    production && terser(),
  ],
});
