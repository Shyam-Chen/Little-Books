import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'ViteSheet',
  description: 'Thoughts on Vite',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'https://vitejs.dev/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
  ],
  themeConfig: {
    logo: 'https://vitejs.dev/logo.svg',
    nav: [
      {
        text: 'Docs',
        items: [
          { text: 'Overview', link: '/sheets/' },
          { text: 'Vue versus X', link: '/vue-versus-x/' },
          { text: 'Vue Formor', link: '/vue-formor/' },
          { text: 'Vue Storer', link: '/vue-storer/' },
          { text: 'Vue Localer', link: '/vue-localer/' },
        ],
      },
    ],
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/Shyam-Chen/Little-Books' },
    //   // { icon: '__XXX___', link: '__XXX__' },
    // ],
    sidebar: {
      '/sheets': [
        { text: 'Overview', link: '/sheets/' },
        { text: 'Vue versus X', link: '/vue-versus-x/' },
        { text: 'Vue Formor', link: '/vue-formor/' },
        { text: 'Vue Storer', link: '/vue-storer/' },
        { text: 'Vue Localer', link: '/vue-localer/' },
      ],
      '/vue-versus-x': [
        {
          text: 'Vue versus X',
          items: [
            { text: 'Overview', link: '/vue-versus-x/' },
            { text: 'Template Syntax', link: '/vue-versus-x/template-syntax' },
            { text: 'Class and Style Bindings', link: '/vue-versus-x/class-and-style-bindings' },
            { text: 'Conditional Rendering', link: '/vue-versus-x/conditional-rendering' },
            { text: 'List Rendering', link: '/vue-versus-x/list-rendering' },
            { text: 'Event Handling', link: '/vue-versus-x/event-handling' },
            { text: 'Form Input Bindings', link: '/vue-versus-x/form-input-bindings' },
            { text: 'Lifecycle Hooks', link: '/vue-versus-x/lifecycle-hooks' },
            { text: 'Watchers', link: '/vue-versus-x/watchers' },
            { text: 'Template Refs', link: '/vue-versus-x/template-refs' },
            { text: 'Passing Down Classes', link: '/vue-versus-x/passing-down-classes' },
            { text: 'Component v-model', link: '/vue-versus-x/component-v-model' },
            { text: 'Custom Directives', link: '/vue-versus-x/custom-directives' },
          ],
        },
      ],
      '/vue-formor': [
        {
          text: 'Vue Formor',
          items: [
            { text: 'Overview', link: '/vue-formor/' },
            {
              text: 'Guide',
              collapsed: false,
              items: [
                { text: 'Basic Forms', link: '/vue-formor/basic-forms' },
                { text: 'Dynamic Forms', link: '/vue-formor/dynamic-forms' },
                { text: 'Tabular Forms', link: '/vue-formor/tabular-forms' },
                { text: 'Tabular Form Groups', link: '/vue-formor/tabular-form-groups' },
                { text: 'Custom Schemas', link: '/vue-formor/custom-schemas' },
                { text: 'Multiple Schemas', link: '/vue-formor/multiple-schemas' },
              ],
            },
            {
              text: 'Integrations',
              collapsed: false,
              items: [
                { text: 'State Management', link: '/vue-formor/state-management' },
                { text: 'Internationalization', link: '/vue-formor/internationalization' },
              ],
            },
          ],
        },
      ],
      '/vue-localer': [
        {
          text: 'Vue Localer',
          items: [
            { text: 'Overview', link: '/vue-localer/' },
            {
              text: 'Guide',
              collapsed: false,
              items: [
                { text: 'Locale Changing', link: '/vue-localer/locale-changing' },
                { text: 'Format Syntax', link: '/vue-localer/format-syntax' },
                { text: 'Local Scope', link: '/vue-localer/local-scope' },
                { text: 'List Interpolation', link: '/vue-localer/list-interpolation' },
                { text: 'Component Interpolation', link: '/vue-localer/component-interpolation' },
              ],
            },
          ],
        },
      ],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present ViteSheet',
    },
  },
});
