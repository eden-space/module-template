import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import filesize from 'rollup-plugin-filesize';
import commonjs from '@rollup/plugin-commonjs';
import clean from '@rollup-extras/plugin-clean';
import typescript from '@rollup/plugin-typescript';
import { visualizer } from 'rollup-plugin-visualizer';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import pkg from './package.json' assert { type: 'json' };

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const verbose = process.env.VERBOSE === 'true';

export default {
  input: 'src/index.ts',
  external: [
    ...Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies, ...pkg.devDependencies }),
  ],
  plugins: [
    clean(),
    nodeResolve(),
    json(),
    commonjs(),
    peerDepsExternal(),
    typescript(),
    replace({
      preventAssignment: true,
      __DEV__: JSON.stringify(isDev),
      __VERSION__: JSON.stringify(pkg.version),
    }),
    isProd && terser(),
    isProd && filesize(),
    verbose && visualizer(),
  ].filter(Boolean),
  output: [
    {
      file: pkg.main,
      format: 'commonjs',
      sourcemap: false,
      banner: getBanner(),
    },
    {
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: false,
      banner: getBanner(),
    },
  ],
};

function getBanner() {
  const { name, description } = pkg;
  return `/**\n * ${name}\n * @description: ${description} \n*/\n`;
}
