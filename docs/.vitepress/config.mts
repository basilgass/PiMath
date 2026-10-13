import {defineConfig} from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

// The site is served from https://basilgass.github.io/PiMath/, hence the base.
export default defineConfig({
    title: 'PiMath',
    description: 'Generate and manipulate math exercises in JavaScript, with LaTeX output.',
    base: '/PiMath/',
    lang: 'en-US',
    cleanUrls: true,
    lastUpdated: true,
    markdown: {
        config: (md) => {
            md.use(mathjax3)
        }
    },
    vue: {
        template: {
            compilerOptions: {
                // MathJax renders its output with custom `mjx-*` elements.
                isCustomElement: (tag) => tag.startsWith('mjx-')
            }
        }
    },
    themeConfig: {
        nav: [
            {text: 'Guide', link: '/guide/getting-started'},
            {text: 'Random generators', link: '/guide/random'},
            {text: 'Changelog', link: 'https://github.com/basilgass/PiMath/blob/master/CHANGELOG.md'}
        ],
        sidebar: [
            {
                text: 'Guide',
                items: [
                    {text: 'Getting started', link: '/guide/getting-started'},
                    {text: 'Displaying results', link: '/guide/display'},
                    {text: 'Random generators', link: '/guide/random'},
                    {text: 'Algebra', link: '/guide/algebra'},
                    {text: 'Geometry', link: '/guide/geometry'},
                    {text: 'Errors', link: '/guide/errors'},
                    {text: 'Migration', link: '/guide/migration'}
                ]
            }
        ],
        socialLinks: [{icon: 'github', link: 'https://github.com/basilgass/PiMath'}],
        search: {provider: 'local'},
        editLink: {
            pattern: 'https://github.com/basilgass/PiMath/edit/master/docs/:path',
            text: 'Edit this page on GitHub'
        },
        footer: {message: 'Released under the MIT License.', copyright: 'Basil Gass'}
    }
})
