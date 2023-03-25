import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'ViteSheet',
  description: 'Thoughts on X versus Y with Vite',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'https://vitejs.dev/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
  ],
  themeConfig: {
    logo: 'https://vitejs.dev/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/thoughts-on-vue-vs-x' },
      // { text: 'Modules', link: '/modules/todos' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Shyam-Chen/Little-Books' },
    ],
    sidebar: {
      '/guide': [
        {
          text: 'Getting Started',
          link: '/guide/',
        },
        {
          text: 'Thoughts on Vue versus X',
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
      copyright: 'Copyright © 2019-present Lorem Ipsum',
    },
  },
});
