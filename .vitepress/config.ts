import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Cheat Sheet',
  description: 'Donec at leo at lectus tempus volutpat',
  themeConfig: {
    logo: 'https://rollupjs.org/rollup-logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/thoughts-on-vue-vs-x' },
      // { text: 'Modules', link: '/modules/todos' },
    ],
    sidebar: {
      '/guide': [
        {
          text: 'Thoughts on Vue vs X',
          link: '/guide/thoughts-on-vue-vs-x',
        },
      ],
      // '/modules': [
      //   {
      //     text: 'Dashboard',
      //     collapsed: false,
      //     items: [{ text: 'Dashboard', link: '/modules/todos' }],
      //   },
      //   {
      //     text: 'My List',
      //     collapsed: false,
      //     items: [{ text: 'Todos', link: '/modules/todos' }],
      //   },
      // ],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Lorem ipsum',
    },
  },
});
