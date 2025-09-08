// Rollup configuration for building our UI library
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

// Package.json to get external dependencies
import { readFileSync } from 'fs';
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

export default [
  // Main build configuration for JavaScript/TypeScript
  {
    // Entry point of our library
    input: 'src/index.ts',

    // Output configurations for different module formats
    output: [
      {
        // CommonJS format for Node.js compatibility
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        // ES Module format for modern bundlers
        file: pkg.module,
        format: 'esm',
        sourcemap: true
      }
    ],

    // External dependencies (React) that shouldn't be bundled
    external: [...Object.keys(pkg.peerDependencies || {})],

    // Plugins to process our code
    plugins: [
      // Resolve node modules
      resolve(),
      // Compile TypeScript to JavaScript
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.test.tsx', '**/*.stories.tsx']
      })
    ]
  },

  // Separate build for TypeScript declarations
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/]
  }
];
