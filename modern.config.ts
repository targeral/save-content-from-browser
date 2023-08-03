import path from 'path';
import { moduleTools, defineConfig } from '@modern-js/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: {
    input: ['src/index.ts', './src/content.ts', './src/background.ts'],
    // input: ['./src/index.ts'],
    format: 'umd',
    dts: false,
    copy: {
      patterns: [
        {
          from: './*',
          context: path.join(__dirname, './template'),
        },
      ],
    },
  },
});
