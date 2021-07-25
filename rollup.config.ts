import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  output: {
    file: 'dist/calendar.min.js',
    format: 'iife',
    name: 'jpvmrcd.calendar',
    plugins: [terser()],
  }
};
