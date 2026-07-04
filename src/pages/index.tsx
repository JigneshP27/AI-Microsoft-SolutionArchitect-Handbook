import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HeroSection() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>🚀 For Senior .NET Developers</div>
        <h1 className={styles.heroTitle}>
          AI Solution Architect
          <span className={styles.heroTitleAccent}> Handbook</span>
        </h1>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          A structured, hands-on learning system covering LLMs, RAG, Semantic Kernel,
          AI Agents, and enterprise architecture — all through the lens of .NET and C#.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.heroPrimary} to="/docs/intro">
            Start Learning →
          </Link>
          <Link className={styles.heroSecondary} to="/docs/roadmap">
            View Roadmap
          </Link>
        </div>
        <div className={styles.heroTech}>
          {['.NET 9', 'Semantic Kernel', 'Azure OpenAI', 'Ollama', 'RAG', 'C#'].map((tech) => (
            <span key={tech} className={styles.techBadge}>{tech}</span>
          ))}
        </div>
      </div>
    </header>
  );
}

type FeatureItem = {
  title: string;
  icon: string;
  description: string;
  link: string;
  phase: string;
};

const features: FeatureItem[] = [
  {
    title: 'AI Fundamentals',
    icon: '📚',
    description:
      'Understand AI, ML, LLMs, tokens, embeddings, and prompt engineering — explained for engineers, not researchers.',
    link: '/docs/fundamentals/ai-landscape',
    phase: 'Phase 1',
  },
  {
    title: 'LLM Engineering',
    icon: '🧠',
    description:
      'Dive into transformer architecture, fine-tuning vs RAG, vector databases, and retrieval strategies.',
    link: '/docs/intro',
    phase: 'Phase 2',
  },
  {
    title: '.NET AI Integration',
    icon: '⚙️',
    description:
      'Build AI-powered APIs with ASP.NET Core, Semantic Kernel, SignalR streaming, and Azure OpenAI.',
    link: '/docs/intro',
    phase: 'Phase 2',
  },
  {
    title: 'Architecture Patterns',
    icon: '🏗',
    description:
      'Design enterprise AI systems: event-driven architectures, microservices + AI, and multi-agent patterns.',
    link: '/docs/intro',
    phase: 'Phase 3',
  },
  {
    title: 'Hands-on Labs',
    icon: '🧪',
    description:
      'Build real projects: AI APIs, RAG systems, document search engines, and local AI assistants.',
    link: '/docs/intro',
    phase: 'Phase 2',
  },
  {
    title: 'FactoryMind Capstone',
    icon: '🏭',
    description:
      'A production-grade capstone: .NET 8 backend, AI orchestration, Kafka, agents, and full-stack architecture.',
    link: '/docs/intro',
    phase: 'Phase 5',
  },
];

function FeatureCard({title, icon, description, link, phase}: FeatureItem) {
  return (
    <Link to={link} className={styles.featureCard}>
      <div className={styles.featureCardPhase}>{phase}</div>
      <div className={styles.featureCardIcon}>{icon}</div>
      <h3 className={styles.featureCardTitle}>{title}</h3>
      <p className={styles.featureCardDescription}>{description}</p>
    </Link>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Learning Path</h2>
        <p className={styles.sectionSubtitle}>
          Six progressive volumes that take you from AI basics to enterprise architecture
        </p>
        <div className={styles.featuresGrid}>
          {features.map((props, idx) => (
            <FeatureCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgressSection() {
  const modules = [
    {name: 'Website & Infrastructure', percent: 90},
    {name: 'AI Fundamentals (Vol. 1)', percent: 80},
    {name: 'LLM Engineering (Vol. 2)', percent: 0},
    {name: '.NET AI Integration (Vol. 3)', percent: 0},
    {name: 'Architecture Patterns (Vol. 4)', percent: 0},
    {name: 'Labs (Vol. 5)', percent: 0},
    {name: 'FactoryMind (Vol. 6)', percent: 0},
    {name: 'Certifications', percent: 15},
  ];

  const overallPercent = Math.round(
    modules.reduce((sum, m) => sum + m.percent, 0) / modules.length
  );

  return (
    <section className={styles.progress}>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>📊 Progress Dashboard</h2>
        <p className={styles.sectionSubtitle}>
          Overall completion: <strong>{overallPercent}%</strong>
        </p>
        <div className={styles.progressGrid}>
          {modules.map((mod) => (
            <div key={mod.name} className={styles.progressItem}>
              <div className={styles.progressLabel}>
                <span>{mod.name}</span>
                <span>{mod.percent}%</span>
              </div>
              <div className={styles.progressBarBg}>
                <div
                  className={styles.progressBarFill}
                  style={{width: `${mod.percent}%`}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertSection() {
  return (
    <section className={styles.certs}>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>🎓 Certification Path</h2>
        <p className={styles.sectionSubtitle}>
          Integrated Microsoft certification preparation
        </p>
        <div className={styles.certGrid}>
          <Link to="/docs/certifications/ai-900" className={styles.certCard}>
            <span className={styles.certIcon}>📜</span>
            <h3>AI-900</h3>
            <p>Azure AI Fundamentals</p>
            <span className={styles.certStatus}>📖 Study Guide Available</span>
          </Link>
          <div className={clsx(styles.certCard, styles.certCardLocked)}>
            <span className={styles.certIcon}>🔒</span>
            <h3>AI-102</h3>
            <p>Azure AI Engineer</p>
            <span className={styles.certStatus}>Coming in Phase 4</span>
          </div>
          <div className={clsx(styles.certCard, styles.certCardLocked)}>
            <span className={styles.certIcon}>🔒</span>
            <h3>AZ-305</h3>
            <p>Azure Solutions Architect</p>
            <span className={styles.certStatus}>Coming in Phase 4</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}>
      <HeroSection />
      <main>
        <FeaturesSection />
        <ProgressSection />
        <CertSection />
      </main>
    </Layout>
  );
}
