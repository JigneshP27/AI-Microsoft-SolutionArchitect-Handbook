import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AI Solution Architect Handbook',
  tagline: 'From Senior .NET Developer to AI Solution Architect',
  favicon: 'img/favicon.ico',

  url: 'https://jigneshp27.github.io',
  baseUrl: '/AI-Microsoft-SolutionArchitect-Handbook/',

  organizationName: 'JigneshP27',
  projectName: 'AI-Microsoft-SolutionArchitect-Handbook',
  trailingSlash: false,


  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/JigneshP27/AI-Microsoft-SolutionArchitect-Handbook/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: process.env.GTAG_ID || 'G-XXXXXXXXXX',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    navbar: {
      title: 'AI Architect Handbook',
      logo: {
        alt: 'AI Architect Handbook Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'handbookSidebar',
          position: 'left',
          label: '📚 Handbook',
        },
        {
          to: '/docs/roadmap',
          label: '🗺️ Roadmap',
          position: 'left',
        },
        {
          to: '/docs/certifications/ai-900',
          label: '🎓 Certifications',
          position: 'left',
        },
        {
          href: 'https://github.com/JigneshP27/AI-Microsoft-SolutionArchitect-Handbook',
          label: 'GitHub',
          position: 'right',
        },

      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Handbook',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'AI Fundamentals',
              to: '/docs/fundamentals/ai-landscape',
            },
            {
              label: 'Roadmap',
              to: '/docs/roadmap',
            },
          ],
        },
        {
          title: 'Certifications',
          items: [
            {
              label: 'AI-900',
              to: '/docs/certifications/ai-900',
            },
            {
              label: 'Microsoft Learn',
              href: 'https://learn.microsoft.com/en-us/training/',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/JigneshP27/AI-Microsoft-SolutionArchitect-Handbook',
            },
            {
              label: 'Semantic Kernel Docs',
              href: 'https://learn.microsoft.com/en-us/semantic-kernel/',
            },
            {
              label: 'Azure OpenAI',
              href: 'https://learn.microsoft.com/en-us/azure/ai-services/openai/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AI Solution Architect Handbook. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['csharp', 'json', 'bash', 'powershell', 'yaml'],
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark',
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
