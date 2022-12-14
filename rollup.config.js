
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from "rollup-plugin-sourcemaps";
import babel, {getBabelOutputPlugin} from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import jsx from 'acorn-jsx';
import { defineConfig } from 'rollup';
import path from 'node:path';

export default defineConfig(
    [{
        input: "./src/index.ts",
        acornInjectPlugins: [jsx()],
        external: ['react'],
        output: {
            dir: "dist",
            format: "cjs",
            entryFileNames: '[name].cjs.js',
            sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
                // will replace relative paths with absolute paths
                return path.resolve(path.dirname(sourcemapPath), relativeSourcePath);
              },
            sourcemap: true,
             // 为了兼容新语法，使用 babel 转译一下
            plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })]
        },
        plugins: [resolve(), commonjs(),  typescript({ jsx: 'preserve' }), sourceMaps(), babel({
            babelHelpers: 'bundled',
            presets: ['@babel/preset-react'],
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']
        }), json()],
    }, {
        input: "./src/index.ts",
        acornInjectPlugins: [jsx()],
        external: ['react'],
        sourceMaps: true,
        output: {
            dir: "dist",
            format: "es",
            sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
                // will replace relative paths with absolute paths
                return path.resolve(path.dirname(sourcemapPath), relativeSourcePath);
              },
            entryFileNames: '[name].es.js',
            // 为了兼容新语法，使用 babel 转译一下
            plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })]
        },
        plugins: [resolve(), commonjs(),  typescript({ jsx: 'preserve' }), sourceMaps(), babel({
            babelHelpers: 'bundled',
            presets: ['@babel/preset-react'],
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']
        }), json()],
    }]
);


