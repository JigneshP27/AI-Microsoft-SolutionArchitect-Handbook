import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  handbookSidebar: [
    'intro',
    'roadmap',
    {
      type: 'category',
      label: '📚 Volume 1 — Foundations',
      collapsed: false,
      items: [
        'fundamentals/ai-landscape',
        'fundamentals/llm-basics',
        'fundamentals/tokens-and-context',
        'fundamentals/prompt-engineering',
        'fundamentals/embeddings-intro',
      ],
    },
    {
      type: 'category',
      label: '🧠 Volume 2 — LLM Engineering',
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'intro',
          label: '🚧 Coming in Phase 2',
        },
      ],
    },
    {
      type: 'category',
      label: '⚙️ Volume 3 — .NET AI Integration',
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'intro',
          label: '🚧 Coming in Phase 2',
        },
      ],
    },
    {
      type: 'category',
      label: '🏗 Volume 4 — Architecture Patterns',
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'intro',
          label: '🚧 Coming in Phase 3',
        },
      ],
    },
    {
      type: 'category',
      label: '🧪 Volume 5 — Labs',
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'intro',
          label: '🚧 Coming in Phase 2',
        },
      ],
    },
    {
      type: 'category',
      label: '🏭 Volume 6 — FactoryMind',
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'intro',
          label: '🚧 Coming in Phase 5',
        },
      ],
    },
    {
      type: 'category',
      label: '🎓 Certifications',
      collapsed: true,
      items: [
        'certifications/ai-900',
      ],
    },
  ],
};

export default sidebars;
