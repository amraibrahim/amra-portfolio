import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Rss,
  Sun,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const linkedinUrl = 'https://www.linkedin.com/in/amraibrahimr/';
const emailAddress = 'ibrahimar2@vcu.edu';
const sectionIds = ['about', 'work', 'experience', 'leadership', 'writing', 'contact'];

const projects = [
  {
    year: '2026',
    name: 'Developer sentiment survey system',
    type: 'Platform engineering',
    summary:
      'An end-to-end Azure developer sentiment system connecting internal tooling and telemetry through a resilient ports-and-adapters architecture.',
    href: linkedinUrl,
  },
  {
    year: '2026',
    name: 'Enterprise AI insight workflows',
    type: 'AI / ML engineering',
    summary:
      'Multi-agent workflows for service-desk, network, and performance data, with vector search and enterprise API integrations for operational insight.',
    href: linkedinUrl,
  },
  {
    year: '2025',
    name: 'Real-time server telemetry intelligence',
    type: 'RAG / data systems',
    summary:
      'A Kafka-connected RAG pipeline for Dell server telemetry and support logs that processed 14K+ entries and cut inference latency by 75%.',
    href: linkedinUrl,
  },
  {
    year: '2025',
    name: 'Local Drink Finder',
    type: 'Applied AI',
    summary:
      'An AI-powered café and boba matcher using natural-language search, sentence transformers, and LLMs to surface culturally specific drinks.',
    href: linkedinUrl,
  },
];

const experiences = [
  {
    date: 'May — Aug 2026',
    organization: 'LinkedIn',
    role: 'Software Engineer Intern',
    detail:
      'Built a secure, read-only data layer and MySQL persistence system for an Azure developer sentiment survey, plus a Slack Block Kit bot with fatigue controls and no inbound ingress.',
  },
  {
    date: 'Feb — May 2026',
    organization: 'Leidos · SMIT',
    role: 'AI/ML Software Engineer Intern',
    detail:
      'Designed multi-agent AI orchestration workflows and applied-AI insight pipelines across Jira, Splunk, ServiceNow, Ask Sage, and Azure Data.',
  },
  {
    date: 'May — Aug 2025',
    organization: 'Dell Technologies',
    role: 'Software Engineer Intern',
    detail:
      'Built a RAG and Kafka pipeline for server telemetry and support logs, cleaning 14K+ entries with Python, Pandas, FAISS, and ChromaDB.',
  },
];

const leadership = [
  {
    date: 'Aug 2025 — now',
    organization: 'ColorStack @ VCU',
    role: 'Founder & President',
    detail:
      'Founded VCU’s first ColorStack chapter and built a community around technical growth, career development, partnerships, and belonging in computer science.',
  },
];

const writing = [
  {
    date: 'LinkedIn · Featured',
    title: 'Featured LinkedIn post',
    excerpt: 'A recent piece of writing from Amra Ibrahim, shared on LinkedIn.',
    href: 'https://lnkd.in/p/ei6a_Y3f',
  },
  {
    date: 'Focus · AI systems',
    title: 'Building AI that earns trust',
    excerpt:
      'Exploring the space between impressive demos and dependable systems: retrieval, orchestration, guardrails, and useful explanations.',
    href: linkedinUrl,
  },
  {
    date: 'Focus · Data',
    title: 'From raw logs to useful signals',
    excerpt:
      'Working with telemetry, support data, and vector search to help technical teams see the pattern inside the noise.',
    href: linkedinUrl,
  },
  {
    date: 'Focus · Community',
    title: 'Community is infrastructure',
    excerpt:
      'Why creating access, mentorship, and room to grow is part of building a stronger technical future.',
    href: linkedinUrl,
  },
  {
    date: 'Focus · Product',
    title: 'Make the hard thing legible',
    excerpt:
      'A product is doing its job when complexity becomes a clear next step for the person using it.',
    href: linkedinUrl,
  },
];

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('ibrahim-theme');
    setDarkMode(savedTheme === 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    window.localStorage.setItem('ibrahim-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.05, 0.25, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => setDarkMode((current) => !current);

  const copyProfileLink = async () => {
    try {
      await navigator.clipboard.writeText(linkedinUrl);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = linkedinUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-page">
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#top" onClick={closeMenu} data-testid="link-home">
            <span className="wordmark-mark" aria-hidden="true">
              I
            </span>
            <span>amra ibrahim / notebook</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {sectionIds.map((id) => (
              <a
                className={`nav-link ${activeSection === id ? 'is-active' : ''}`}
                href={`#${id}`}
                key={id}
                data-testid={`link-nav-${id}`}
              >
                {id === 'work'
                  ? 'Selected work'
                  : id === 'leadership'
                    ? 'Leadership & Professional Development'
                    : id}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="icon-button"
              type="button"
              aria-label={darkMode ? 'Switch to light appearance' : 'Switch to dark appearance'}
              onClick={toggleTheme}
              data-testid="button-toggle-theme"
            >
              {darkMode ? <Sun size={15} strokeWidth={1.6} /> : <Moon size={15} strokeWidth={1.6} />}
            </button>
            <button
              className="icon-button mobile-menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen((open) => !open)}
              data-testid="button-toggle-menu"
            >
              {menuOpen ? <X size={16} strokeWidth={1.6} /> : <Menu size={16} strokeWidth={1.6} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {sectionIds.map((id) => (
              <a
                className={`nav-link ${activeSection === id ? 'is-active' : ''}`}
                href={`#${id}`}
                key={id}
                onClick={closeMenu}
                data-testid={`link-mobile-nav-${id}`}
              >
                {id === 'work'
                  ? 'Selected work'
                  : id === 'leadership'
                    ? 'Leadership & Professional Development'
                    : id}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main className="site-main" id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <p className="eyebrow reveal" data-testid="text-hero-eyebrow">
              Software engineer / AI builder · Richmond, VA
            </p>
            <h1 className="hero-title reveal reveal-delay-1" id="hero-title" data-testid="text-hero-title">
              I make complex systems <em>feel</em> useful.</h1>
            <p className="hero-dek reveal reveal-delay-2" data-testid="text-hero-description">
              I&apos;m Amra Ibrahim — a <strong>software engineer building with AI, data, and thoughtful systems</strong> that
              turn difficult problems into clearer decisions.
            </p>
            <div className="hero-ctas reveal reveal-delay-3">
              <a className="button" href="#work" data-testid="link-hero-work">
                See selected work <ArrowRight size={15} strokeWidth={1.7} />
              </a>
              <a className="button secondary" href="#contact" data-testid="link-hero-contact">
                Start a conversation
              </a>
            </div>
          </div>

          <aside className="hero-aside reveal reveal-delay-3" aria-label="Availability and location">
            <p className="aside-note" data-testid="text-availability">
              Currently
              <strong>Building at the intersection of AI, data, and software.</strong>
            </p>
            <p className="aside-note" data-testid="text-location">
              <MapPin size={13} strokeWidth={1.6} aria-hidden="true" /> Based in
              <strong>Greater Washington, DC Area / UTC−05</strong>
            </p>
            <div className="scroll-prompt" aria-hidden="true">
              <span />
              Scroll to read
            </div>
          </aside>
        </section>

        <section className="section" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="section-kicker">01 / About</p>
            <h2 className="section-title" id="about-title" data-testid="text-about-title">
              Part builder, part <em>community builder.</em>
            </h2>
          </div>
          <div className="about-layout">
            <p className="about-lede" data-testid="text-about-lede">
              I like the point where complex systems become useful tools for real people.
            </p>
            <div className="about-copy" data-testid="text-about-story">
              <p>
                I&apos;m a software engineer interested in the systems behind useful AI: retrieval,
                orchestration, telemetry, and data products that help teams make better decisions.
                Across internships at LinkedIn, Leidos, and Dell Technologies, I&apos;ve built developer
                sentiment surveys, multi-agent workflows, RAG pipelines, and real-time telemetry analysis.
              </p>
              <p>
                Outside of work, I founded VCU&apos;s first ColorStack chapter and care deeply about
                creating more room for underrepresented students to grow in computer science.
              </p>
            </div>
          </div>
          <div className="principles" aria-label="Working principles">
            <article className="principle" data-testid="card-principle-01">
              <span className="principle-number">/ 01</span>
               <h3>Build for the whole system.</h3>
               <p>Reliable work respects the data, the interfaces, and the people around them.</p>
            </article>
            <article className="principle" data-testid="card-principle-02">
              <span className="principle-number">/ 02</span>
               <h3>Make intelligence useful.</h3>
               <p>The best AI work gives someone a clearer next step, not just a clever output.</p>
            </article>
            <article className="principle" data-testid="card-principle-03">
              <span className="principle-number">/ 03</span>
               <h3>Bring people with you.</h3>
               <p>Strong technical communities make better work possible for everyone.</p>
            </article>
          </div>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="section-kicker">02 / Selected work</p>
            <h2 className="section-title" id="work-title" data-testid="text-work-title">
              A few things I&apos;ve helped <em>into the world.</em>
            </h2>
          </div>
          <div className="work-list">
            {projects.map((project, index) => (
              <a
                className="work-item"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.name}
                data-testid={`link-project-${index + 1}`}
              >
                <span className="work-year">{project.year}</span>
                <h3 className="work-name">{project.name}</h3>
                <div>
                  <span className="work-type">{project.type}</span>
                  <p className="work-summary">{project.summary}</p>
                </div>
                <span className="work-arrow" aria-hidden="true">
                  <ArrowUpRight size={15} strokeWidth={1.5} />
                </span>
              </a>
            ))}
          </div>
          <div className="work-footer">
               <a
                 className="text-link"
                 href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="link-all-projects"
            >
               More about my work on LinkedIn <ExternalLink size={13} strokeWidth={1.5} />
            </a>
          </div>
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading">
            <p className="section-kicker">03 / Experience</p>
            <h2 className="section-title" id="experience-title" data-testid="text-experience-title">
              The places, teams, and <em>chapters.</em>
            </h2>
          </div>
          <div className="experience-list">
            {experiences.map((experience, index) => (
              <article className="experience-row" key={experience.organization} data-testid={`row-experience-${index + 1}`}>
                <span className="experience-date">{experience.date}</span>
                <span className="experience-org">{experience.organization}</span>
                <div className="experience-detail">
                  <h3 className="experience-role">{experience.role}</h3>
                  <p className="experience-detail">{experience.detail}</p>
                </div>
                <span className="experience-index">0{index + 1}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="leadership" aria-labelledby="leadership-title">
          <div className="section-heading">
            <p className="section-kicker">04 / Leadership & Professional Development</p>
            <h2 className="section-title" id="leadership-title" data-testid="text-leadership-title">
              Building the <em>room around the work.</em>
            </h2>
          </div>
          <div className="experience-list">
            {leadership.map((item, index) => (
              <article className="experience-row" key={item.organization} data-testid={`row-leadership-${index + 1}`}>
                <span className="experience-date">{item.date}</span>
                <span className="experience-org">{item.organization}</span>
                <div className="experience-detail">
                  <h3 className="experience-role">{item.role}</h3>
                  <p className="experience-detail">{item.detail}</p>
                </div>
                <span className="experience-index">0{index + 1}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="writing" aria-labelledby="writing-title">
          <div className="section-heading">
            <p className="section-kicker">05 / Writing</p>
            <h2 className="section-title" id="writing-title" data-testid="text-writing-title">
              Questions from the <em>workbench.</em>
            </h2>
          </div>
          <div className="writing-grid">
            {writing.map((entry, index) => (
              <a
                className="writing-card"
                href={entry.href}
                target="_blank"
                rel="noreferrer"
                key={entry.title}
                data-testid={`link-writing-${index + 1}`}
              >
                <div className="writing-meta">
                  <span>{entry.date}</span>
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="writing-title">{entry.title}</h3>
                  <p className="writing-excerpt">{entry.excerpt}</p>
                </div>
                <div className="writing-read">
                   <span>Explore focus</span>
                  <span aria-hidden="true">↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-panel">
            <div>
              <p className="section-kicker">06 / Contact</p>
              <h2 className="contact-title" id="contact-title" data-testid="text-contact-title">
                Have a good question?
              </h2>
              <p className="contact-subtitle" data-testid="text-contact-description">
                Tell me what you&apos;re trying to make, untangle, or understand. The best place to
                reach me is LinkedIn.
              </p>
            </div>
            <div className="contact-links">
              <a className="contact-link" href={`mailto:${emailAddress}`} data-testid="link-email">
                <span><Mail size={14} strokeWidth={1.5} aria-hidden="true" /> {emailAddress}</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
              <a className="contact-link" href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="link-linkedin">
                <span><Linkedin size={14} strokeWidth={1.5} aria-hidden="true" /> Connect on LinkedIn</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
              <button className="contact-link" type="button" onClick={copyProfileLink} data-testid="button-copy-email">
                <span>
                  {copied ? <Check size={14} strokeWidth={1.5} aria-hidden="true" /> : <Copy size={14} strokeWidth={1.5} aria-hidden="true" />}
                  {copied ? 'Copied profile link' : 'Copy LinkedIn profile'}
                </span>
                {copied ? <Check size={15} strokeWidth={1.5} /> : <Copy size={15} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p data-testid="text-footer-name">Amra Ibrahim / software engineer</p>
          <p data-testid="text-footer-note"><Rss size={12} strokeWidth={1.5} aria-hidden="true" /> Last updated · 2026</p>
        </footer>
      </main>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;