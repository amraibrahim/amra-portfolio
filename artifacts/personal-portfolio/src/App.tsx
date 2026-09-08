import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Github,
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
const emailAddress = 'hello@maya-ortiz.dev';
const sectionIds = ['about', 'work', 'experience', 'writing', 'contact'];

const projects = [
  {
    year: '2024',
    name: 'Northstar',
    type: 'Product system',
    summary:
      'A calm operating layer for small teams to see what is moving, what is stuck, and what deserves a conversation.',
    href: 'https://github.com/placeholder-name/northstar',
  },
  {
    year: '2023',
    name: 'Field Notes',
    type: 'Editorial tool',
    summary:
      'A tiny publishing workflow for turning rough research into clear, human-facing documentation.',
    href: 'https://github.com/placeholder-name/field-notes',
  },
  {
    year: '2022',
    name: 'Common Ground',
    type: 'Civic technology',
    summary:
      'A public data explorer that helped neighborhood groups make sense of long-term housing change.',
    href: 'https://github.com/placeholder-name/common-ground',
  },
  {
    year: '2021',
    name: 'Tiny Signals',
    type: 'Open source',
    summary:
      'Small interface patterns for making system status feel legible instead of alarming.',
    href: 'https://github.com/placeholder-name/tiny-signals',
  },
];

const experiences = [
  {
    date: '2022 — now',
    organization: 'Independent',
    role: 'Product engineer & designer',
    detail:
      'Partnering with teams at the fuzzy beginning: shaping the problem, prototyping the right thing, and shipping the useful version.',
  },
  {
    date: '2019 — 2022',
    organization: 'Goodweather',
    role: 'Founding product engineer',
    detail:
      'Built the first product team and a shared design system while taking a climate analytics platform from prototype to 14k weekly users.',
  },
  {
    date: '2016 — 2019',
    organization: 'Studio Onda',
    role: 'Designer / front-end developer',
    detail:
      'Made digital tools, exhibits, and identities for museums, public-interest organizations, and people with a point of view.',
  },
];

const writing = [
  {
    date: 'Notes · 08 min',
    title: 'The interface is not the product',
    excerpt:
      'A field guide to the quiet decisions that make a tool feel trustworthy before anyone reads the documentation.',
    href: 'https://example.com/the-interface-is-not-the-product',
  },
  {
    date: 'Process · 05 min',
    title: 'On making room for the wrong idea',
    excerpt: 'Why the first prototype should be a little embarrassing.',
    href: 'https://example.com/making-room',
  },
  {
    date: 'Systems · 07 min',
    title: 'A small case for boring software',
    excerpt: 'Less novelty, more things that stay out of the way.',
    href: 'https://example.com/boring-software',
  },
  {
    date: 'Practice · 04 min',
    title: 'What I mean by “done”',
    excerpt: 'A definition that leaves space for care after launch.',
    href: 'https://example.com/what-done-means',
  },
];

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('maya-theme');
    setDarkMode(savedTheme === 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    window.localStorage.setItem('maya-theme', darkMode ? 'dark' : 'light');
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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = emailAddress;
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
              M
            </span>
            <span>maya ortiz / notebook</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {sectionIds.map((id) => (
              <a
                className={`nav-link ${activeSection === id ? 'is-active' : ''}`}
                href={`#${id}`}
                key={id}
                data-testid={`link-nav-${id}`}
              >
                {id === 'work' ? 'Selected work' : id}
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
                {id === 'work' ? 'Selected work' : id}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main className="site-main" id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <p className="eyebrow reveal" data-testid="text-hero-eyebrow">
              Product engineer / designer · Brooklyn, NY
            </p>
            <h1 className="hero-title reveal reveal-delay-1" id="hero-title" data-testid="text-hero-title">
              I make useful things <em>feel</em> inevitable.</h1>
            <p className="hero-dek reveal reveal-delay-2" data-testid="text-hero-description">
              I&apos;m Maya Ortiz — a <strong>product engineer and designer</strong> working at the
              seam between a good question and a shipped answer.
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
              <strong>Open to a small number of good problems.</strong>
            </p>
            <p className="aside-note" data-testid="text-location">
              <MapPin size={13} strokeWidth={1.6} aria-hidden="true" /> Based in
              <strong>New York / UTC−05</strong>
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
              Part builder, part <em>translator.</em>
            </h2>
          </div>
          <div className="about-layout">
            <p className="about-lede" data-testid="text-about-lede">
              I like the bit where an ambitious idea becomes a clear, calm experience someone can
              actually use.
            </p>
            <div className="about-copy" data-testid="text-about-story">
              <p>
                For the last decade, I&apos;ve moved between designing interfaces and building the
                systems underneath them. The job is different every time; the through-line is
                making complexity legible without sanding off what makes a product special.
              </p>
              <p>
                I work best with people who care about the details, can change their minds, and
                want to leave the thing better documented than they found it.
              </p>
            </div>
          </div>
          <div className="principles" aria-label="Working principles">
            <article className="principle" data-testid="card-principle-01">
              <span className="principle-number">/ 01</span>
              <h3>Start with the sentence.</h3>
              <p>If we cannot say what it is for, we are not ready to build it.</p>
            </article>
            <article className="principle" data-testid="card-principle-02">
              <span className="principle-number">/ 02</span>
              <h3>Make the middle visible.</h3>
              <p>Good work is less mysterious when the decisions are recorded.</p>
            </article>
            <article className="principle" data-testid="card-principle-03">
              <span className="principle-number">/ 03</span>
              <h3>Leave a useful trace.</h3>
              <p>Ship the feature, the rationale, and a path for the next person.</p>
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
              href="https://github.com/placeholder-name"
              target="_blank"
              rel="noreferrer"
              data-testid="link-all-projects"
            >
              More experiments on GitHub <ExternalLink size={13} strokeWidth={1.5} />
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

        <section className="section" id="writing" aria-labelledby="writing-title">
          <div className="section-heading">
            <p className="section-kicker">04 / Writing</p>
            <h2 className="section-title" id="writing-title" data-testid="text-writing-title">
              Notes from the <em>workbench.</em>
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
                  <span>Read note</span>
                  <span aria-hidden="true">↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-panel">
            <div>
              <p className="section-kicker">05 / Contact</p>
              <h2 className="contact-title" id="contact-title" data-testid="text-contact-title">
                Have a good question?
              </h2>
              <p className="contact-subtitle" data-testid="text-contact-description">
                Tell me what you&apos;re trying to make, untangle, or understand. I&apos;ll write back
                with a thoughtful next step.
              </p>
            </div>
            <div className="contact-links">
              <a className="contact-link" href={`mailto:${emailAddress}`} data-testid="link-email">
                <span><Mail size={14} strokeWidth={1.5} aria-hidden="true" /> {emailAddress}</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
              <button className="contact-link" type="button" onClick={copyEmail} data-testid="button-copy-email">
                <span>
                  {copied ? <Check size={14} strokeWidth={1.5} aria-hidden="true" /> : <Copy size={14} strokeWidth={1.5} aria-hidden="true" />}
                  {copied ? 'Copied to clipboard' : 'Copy email address'}
                </span>
                {copied ? <Check size={15} strokeWidth={1.5} /> : <Copy size={15} strokeWidth={1.5} />}
              </button>
              <a
                className="contact-link"
                href="https://www.linkedin.com/in/placeholder-name"
                target="_blank"
                rel="noreferrer"
                data-testid="link-linkedin"
              >
                <span><Linkedin size={14} strokeWidth={1.5} aria-hidden="true" /> LinkedIn</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
              <a
                className="contact-link"
                href="https://github.com/placeholder-name"
                target="_blank"
                rel="noreferrer"
                data-testid="link-github"
              >
                <span><Github size={14} strokeWidth={1.5} aria-hidden="true" /> GitHub</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p data-testid="text-footer-name">Maya Ortiz / independent product engineer</p>
          <p data-testid="text-footer-note"><Rss size={12} strokeWidth={1.5} aria-hidden="true" /> Last updated · Spring 2024</p>
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