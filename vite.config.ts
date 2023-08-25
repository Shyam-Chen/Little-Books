import { defineConfig } from 'vite';
import unocss from 'unocss/vite';
import { presetUno, presetIcons, transformerDirectives } from 'unocss';

export default defineConfig({
  plugins: [
    unocss({
      presets: [presetUno(), presetIcons()],
      transformers: [transformerDirectives()],
    }),
  ],
});
