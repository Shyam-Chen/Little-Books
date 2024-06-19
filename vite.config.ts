import { defineConfig } from 'vite';
import unocss from 'unocss/vite';
import { presetUno, presetIcons, presetWebFonts, transformerDirectives } from 'unocss';

export default defineConfig({
  plugins: [
    unocss({
      presets: [presetUno(), presetIcons(), presetWebFonts()],
      transformers: [transformerDirectives({ enforce: 'pre' })],
    }),
  ],
});
