import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
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
const githubUrl = 'https://github.com/amraibrahim';
const emailAddress = 'ibrahimar2@vcu.edu';
const resumeUrl = '/resume.pdf';
const sectionIds = ['about', 'experience', 'work', 'leadership', 'recruiters', 'resume'] as const;
const sectionLabels = { about: 'About', work: 'Projects', experience: 'Experience', leadership: 'Leadership', recruiters: 'For Recruiters', resume: 'Resume' };

const projects = [
  {
    year: '05/2026 - 08/2026', name: 'Developer Sentiment Survey System', context: 'LinkedIn · Azure Platform', type: 'Platform engineering',
    summary: 'Built a developer sentiment survey system that brought together data from four internal Azure sources to identify developers to survey and better understand their experience with internal platforms.',
    detail: 'I built a secure, read-only data-access layer, designed persistence for the system’s owned data, isolated failures across external sources, and implemented targeting logic that accounted for survey fatigue. Surveys were delivered through Slack with safeguards for non-production environments.',
    tools: 'Python · SQLAlchemy · Slack · Azure · data-access layers · system integration',
    recognition: '', href: 'https://lnkd.in/p/eabRjwVK',
  },
  {
    year: '2026', name: 'Enterprise Artificial Intelligence Insight Workflows', context: 'Leidos', type: 'Artificial intelligence / machine learning engineering',
    summary: 'Worked in a cleared defense environment supporting U.S. Navy information technology operations, building applied artificial intelligence workflows around information distributed across enterprise tools and datasets.',
    detail: 'The work included multi-agent workflows, enterprise insight pipelines, dashboards, and internal tooling designed to make complex operational information easier to work with.',
    tools: 'Python · enterprise application programming interfaces · vector databases · dashboards · artificial intelligence workflows',
    recognition: '', href: linkedinUrl,
  },
  {
    year: '05/2025 - 08/2025', name: 'Real-Time Server Telemetry Intelligence', context: 'Dell Technologies', type: 'Retrieval + data systems',
    summary: 'Built pipelines for making server telemetry and support logs easier to investigate.',
    detail: 'The project used retrieval-augmented generation, Kafka, extract-transform-load workflows, and engineering-ticket correlation to connect server alerts with relevant troubleshooting context. It was also my first internship working deeply with retrieval systems, streaming data, and large enterprise datasets.',
    tools: 'Python · Pandas · Kafka · LangChain · ChromaDB · retrieval systems · telemetry',
    recognition: '', href: linkedinUrl,
  },
  {
    year: '10/2025', name: 'JPMorgan Chase Data for Good Hackathon', context: '', type: 'Machine learning / social impact',
    summary: 'Worked with a nonprofit stakeholder and real-world program data to better understand factors affecting employment outcomes.',
    detail: 'Our team used exploratory analysis, feature engineering, modeling, and data storytelling to turn patterns in the data into recommendations that could be presented back to the organization.',
    tools: 'Python · Pandas · NumPy · scikit-learn · logistic regression · data storytelling',
    recognition: '1st Place: Machine Learning & Social Impact', href: 'https://lnkd.in/p/eWW4ZQfG',
  },
  {
    year: '01/2026', name: 'NAFS', context: 'Founding Team · Mobile Product', type: 'Mobile product',
    summary: 'Part of the founding team behind NAFS, a privacy-first Muslim companion app designed to bring prayer tracking, Quran reading, dhikr, fasting, reflections, and journaling into one place.',
    detail: 'I helped take the product from an early idea to a launched application available on iOS, focusing on product direction and helping turn an early concept into a usable, privacy-first experience centered on daily spiritual practice.',
    tools: 'Product strategy · user experience · privacy-first design · product iteration · product launch',
    recognition: '', href: 'https://nafs.fyi/',
  },
];

const experiences = [
  {
    date: 'May–August 2026', organization: 'LinkedIn', role: 'Software Engineer Intern',
    website: 'https://www.linkedin.com/', logoUrl: 'https://www.google.com/s2/favicons?domain=linkedin.com&sz=128',
    context: 'Azure Platform · Sunnyvale, California',
    detail: 'Built the Developer Sentiment Survey System, connecting four internal Azure data sources and developing the data-access, persistence, failure-isolation, targeting, and Slack survey-delivery pieces behind the system. The project pushed me to work across systems owned by different teams, learn unfamiliar infrastructure, and make technical decisions even when I did not always have the full picture.',
  },
  {
    date: 'February–May 2026', organization: 'Leidos', role: 'Artificial Intelligence / Machine Learning Software Engineer Intern', context: 'U.S. Navy information technology operations · cleared defense environment',
    website: 'https://www.leidos.com/', logoUrl: 'https://www.google.com/s2/favicons?domain=leidos.com&sz=128',
    detail: 'Worked on applied artificial intelligence, enterprise insight pipelines, dashboards, and internal tooling supporting U.S. Navy information technology operations in a cleared defense environment.',
  },
  {
    date: 'May–August 2025', organization: 'Dell Technologies', role: 'Software Engineer Intern', context: '',
    website: 'https://www.dell.com/', logoUrl: 'https://www.google.com/s2/favicons?domain=dell.com&sz=128',
    detail: 'Built retrieval and real-time data pipelines around PowerEdge server telemetry, logs, and engineering tickets to surface useful troubleshooting context. This is where I first started working deeply with retrieval-augmented generation, Kafka, enterprise telemetry, and machine-learning infrastructure.',
  },
];

const leadership = [
  {
    date: 'August 2025 - Present',
    organization: 'ColorStack at Virginia Commonwealth University',
    role: 'Founder & Co-President',
    detail:
      'Founded Virginia Commonwealth University’s first ColorStack chapter and helped turn it into a community around technical growth, career development, partnerships, and belonging in computer science. The work includes coordinating people, programs, and partnerships so students have a place to learn, connect, and keep showing up.',
  },
  {
    date: 'June 2024 - Present',
    organization: 'Black Muslim Collective at Virginia Commonwealth University',
    role: 'President',
    detail:
      'Lead an executive board and organize cultural, religious, service, and collaborative programming across campus. A lot of this role is about the work people do not always see: coordinating schedules, partnerships, budgets, communication, and all the small details that turn an idea into something people can actually show up for.',
  },
  {
    date: 'August 2025 - Present',
    organization: 'Virginia Commonwealth University College of Engineering',
    role: 'Student Ambassador',
    detail:
      'Represent the College of Engineering and help prospective students connect with the engineering community and student experience.',
  },
  {
    date: 'April 2024 - April 2025',
    organization: 'National Society of Black Engineers at Virginia Commonwealth University',
    role: 'Technical Outreach and Community Help Chair',
    detail:
      'Supported technical outreach and community-building initiatives for engineering students.',
  },
];

type DevelopmentOpportunity = {
  logo: string;
  logoUrl?: string;
  organization: string;
  title: string;
  distinction?: string;
  caption: string;
};

const professionalDevelopmentPrograms: DevelopmentOpportunity[] = [
  {
    logo: 'MLT',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mlt.org&sz=128',
    organization: 'Management Leadership for Tomorrow',
    title: 'Career Preparation Program',
    distinction: 'Career Preparation Fellow · January 2025–Present',
    caption: 'Intensive career-preparation program',
  },
  {
    logo: 'BTT',
    logoUrl: 'https://www.google.com/s2/favicons?domain=breakthroughtech.org&sz=128',
    organization: 'Break Through Tech',
    title: 'Artificial Intelligence Program',
    distinction: 'Artificial Intelligence Program Fellow',
    caption: 'Applied artificial intelligence and machine learning development and career support',
  },
  {
    logo: 'SEO',
    logoUrl: 'https://www.google.com/s2/favicons?domain=seo-usa.org&sz=128',
    organization: 'Sponsors for Educational Opportunity',
    title: 'Tech Developer Residency',
    distinction: 'Tech Developer Residency Fellow · June–August 2025',
    caption: '300+ hours of computer science and software-engineering training',
  },
  {
    logo: 'W',
    logoUrl: 'https://www.google.com/s2/favicons?domain=walmart.com&sz=128',
    organization: 'Walmart',
    title: 'Sophomore Discovery Summit',
    caption: 'Early-career development opportunity',
  },
  {
    logo: 'ACN',
    logoUrl: 'https://www.google.com/s2/favicons?domain=accenture.com&sz=128',
    organization: 'Accenture',
    title: 'Student Leadership Program',
    caption: 'Leadership and technology career development',
  },
  {
    logo: 'V',
    logoUrl: 'https://www.google.com/s2/favicons?domain=visa.com&sz=128',
    organization: 'Visa',
    title: 'Upskill Tech Pathway',
    caption: 'Technical and professional development program',
  },
  {
    logo: 'CITI',
    logoUrl: 'https://www.google.com/s2/favicons?domain=citi.com&sz=128',
    organization: 'Citi',
    title: 'Freshman Discovery Program',
    caption: 'Early-career technology and financial-services exposure',
  },
  {
    logo: 'C1',
    logoUrl: 'https://www.google.com/s2/favicons?domain=capitalone.com&sz=128',
    organization: 'Capital One',
    title: 'First Generation Focus',
    caption: 'Professional development for first-generation students',
  },
  {
    logo: 'C1',
    logoUrl: 'https://www.google.com/s2/favicons?domain=capitalone.com&sz=128',
    organization: 'Capital One',
    title: 'Software Engineering Summit + Hackathon',
    distinction: 'May 2024',
    caption: '24-hour fintech hackathon',
  },
  {
    logo: 'AWS',
    logoUrl: 'https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=128',
    organization: 'Amazon Web Services',
    title: 'Student Ambassador',
    distinction: '2026–Present',
    caption: 'Cloud learning and technical career development',
  },
  {
    logo: 'AWS',
    logoUrl: 'https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=128',
    organization: 'Amazon Web Services',
    title: 'Spring Cloud Cohort',
    caption: 'Cloud learning and technical community',
  },
];

const conferences: DevelopmentOpportunity[] = [
  {
    logo: 'NSBE',
    logoUrl: 'https://www.google.com/s2/favicons?domain=nsbe.org&sz=128',
    organization: 'National Society of Black Engineers',
    title: 'National Convention',
    distinction: 'Attendee · 2024 & 2025',
    caption: 'Attended the National Convention in 2024 and 2025',
  },
  {
    logo: 'NRF',
    logoUrl: 'https://www.google.com/s2/favicons?domain=nrffoundation.org&sz=128',
    organization: 'National Retail Federation Foundation',
    title: 'Student Program',
    distinction: 'Ray Greenly Scholarship Recipient',
    caption: 'Student development and scholarship community',
  },
  {
    logo: 'GHC',
    logoUrl: 'https://www.google.com/s2/favicons?domain=ghc.anitab.org&sz=128',
    organization: 'Grace Hopper Celebration',
    title: 'Grace Hopper Celebration',
    distinction: 'Kamala Scholar',
    caption: 'Grace Hopper Celebration 2025',
  },
  {
    logo: 'AFRO',
    logoUrl: 'https://www.google.com/s2/favicons?domain=afrotech.com&sz=128',
    organization: 'AFROTECH',
    title: 'AFROTECH Conference',
    caption: 'Technology, innovation, and career community',
  },
  {
    logo: 'CS',
    logoUrl: 'https://www.google.com/s2/favicons?domain=colorstack.org&sz=128',
    organization: 'ColorStack',
    title: 'Stacked Up Summit',
    caption: 'ColorStack technology and career summit',
  },
  {
    logo: 'MLT',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mlt.org&sz=128',
    organization: 'Management Leadership for Tomorrow',
    title: 'Tech Trek',
    caption: 'Technology industry exposure and networking',
  },
  {
    logo: 'D',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mlt.org&sz=128',
    organization: 'Management Leadership for Tomorrow',
    title: 'Summer Seminar at Deloitte University',
    caption: 'Summer Seminar at Deloitte University',
  },
  {
    logo: 'DEEP', logoUrl: 'https://www.google.com/s2/favicons?domain=upenn.edu&sz=128', organization: 'University of Pennsylvania',
    title: 'DEEPenn STEM Graduate School Preview',
    distinction: 'Selected Participant · October 9–11, 2026',
    caption: 'Upcoming graduate-school preview',
  },
];

const affiliations: DevelopmentOpportunity[] = [
  {
    logo: 'INR',
    logoUrl: 'https://www.google.com/s2/favicons?domain=inroads.org&sz=128',
    organization: 'INROADS',
    title: 'Professional community',
    caption: 'Career development and leadership community',
  },
  {
    logo: 'RTC',
    logoUrl: 'https://www.google.com/s2/favicons?domain=rewritingthecode.org&sz=128',
    organization: 'Rewriting the Code',
    title: 'Technical community',
    caption: 'Community for women and non-binary technologists',
  },
  {
    logo: 'CS',
    logoUrl: 'https://www.google.com/s2/favicons?domain=colorstack.org&sz=128',
    organization: 'ColorStack',
    title: 'Technical community',
    caption: 'National community supporting Black and Latinx students in technology',
  },
];

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [openOpportunity, setOpenOpportunity] = useState<string | null>(null);

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

  const closeMenu = () => setMenuOpen(false);

  const renderDevelopmentGrid = (
    opportunities: DevelopmentOpportunity[],
    ariaLabel: string,
  ) => (
    <div className="development-grid" aria-label={ariaLabel}>
      {opportunities.map((opportunity) => {
        const isOpen = openOpportunity === opportunity.title;
        const testId = opportunity.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return (
          <button
            className={`development-card ${isOpen ? 'is-open' : ''}`}
            type="button"
            key={opportunity.title}
            aria-expanded={isOpen}
            aria-label={`${opportunity.organization}: ${opportunity.title}${opportunity.distinction ? `. ${opportunity.distinction}` : ''}. ${opportunity.caption}`}
            onClick={() =>
              setOpenOpportunity((current) =>
                current === opportunity.title ? null : opportunity.title,
              )
            }
            data-testid={`card-development-${testId}`}
          >
            <span className="development-logo-lockup" aria-hidden="true">
              {opportunity.logoUrl ? (
                <img
                  className="development-logo-image"
                  src={opportunity.logoUrl}
                  alt=""
                />
              ) : (
              <span className="development-logo">
                {opportunity.logo}
              </span>
              )}
              <span className="development-organization">
                {opportunity.organization}
              </span>
            </span>
            <span className="development-detail">
              <span className="development-title">{opportunity.title}</span>
              {opportunity.distinction && (
                <span className="development-distinction">{opportunity.distinction}</span>
              )}
              <span className="development-caption">{opportunity.caption}</span>
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="portfolio-page">
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#top" onClick={closeMenu} data-testid="link-home">
            <span className="wordmark-mark" aria-hidden="true" />
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
                {sectionLabels[id]}
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
                {sectionLabels[id]}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main className="site-main" id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <p className="status-line reveal" data-testid="text-hero-status">
              <span className="status-mark" aria-hidden="true">
                ■
              </span>
              Open to 2027 engineering roles · Winter/Spring 2027 internships
            </p>
            <h1 className="hero-title reveal reveal-delay-1" id="hero-title" data-testid="text-hero-title">
              Hi, I’m Amra.<br />
              <span className="hero-title-note">Here’s what I’m <em>building.</em></span>
            </h1>
            <p className="hero-dek reveal reveal-delay-2" data-testid="text-hero-description">
              I’m a computer science senior at Virginia Commonwealth University, interested in AI,
              distributed systems, and developer tools. This is where I share my projects and what
              I’m learning along the way.
            </p>
            <div className="hero-ctas reveal reveal-delay-3">
              <a className="button" href="#work" data-testid="link-hero-work">
                Explore projects <ArrowRight size={15} strokeWidth={1.7} />
              </a>
              <a className="button secondary" href="#recruiters" data-testid="link-hero-contact">
                Get in touch
              </a>
            </div>
            <p className="hero-meta reveal reveal-delay-3">
              Graduating May 2027 · Greater Washington, DC Area
            </p>
          </div>

        </section>

        <section className="section" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="section-kicker"><span className="section-number">01 /</span> About</p>
            <h2 className="section-title" id="about-title" data-testid="text-about-title">
              A little more <em>about me.</em>
            </h2>
          </div>
          <div className="about-layout">
            <figure className="about-portrait">
              <img src={`${import.meta.env.BASE_URL}amra-headshot.jpg`} alt="Portrait of Amra Ibrahim" width={4984} height={4984} loading="lazy" decoding="async" />
              <figcaption>Amra, outside the notebook.</figcaption>
            </figure>
            <div className="about-copy" data-testid="text-about-story">
              <p className="about-lede" data-testid="text-about-lede">I like figuring things out, especially when I don’t know where to start.</p>
              <p>I’m a senior studying computer science at Virginia Commonwealth University, with a minor in artificial intelligence. I got into computer science because I wanted to understand how things worked. That curiosity has taken me into developer tools, AI, and data systems through internships at LinkedIn, Leidos, and Dell Technologies.</p>
              <p>What I’ve enjoyed most is working through the messy parts: learning an unfamiliar system, asking questions, and slowly seeing how the pieces fit. I’m still learning what kind of work I want to do more of, and these projects have helped me figure that out.</p>
              <p>Outside of internships and classes, a big part of my college life is community. This is my second year leading Black Muslim Collective at my university as President. Planning events, bringing people together, and making sure someone new feels welcome are some of my favorite things.</p>
              <aside className="about-next" aria-label="What’s next">
                <h3>What’s next</h3>
                <p>Graduation in May 2027 and starting a full-time Software Engineering role. Graduate school is something I’d like to explore in the near future, as well.</p>
              </aside>
            </div>
          </div>
          <div className="principles" aria-label="Working principles">
            <article className="principle" data-testid="card-principle-01">
              <span className="principle-number">01 / Build</span>
               <h3>I like figuring out how things work.</h3>
               <p>Working on one part usually makes me curious about the rest. I ask questions, follow the code, and try to understand why things were built that way.</p>
            </article>
            <article className="principle" data-testid="card-principle-02">
              <span className="principle-number">02 / Learn</span>
               <h3>There’s always something new to learn.</h3>
               <p>Every internship has introduced me to tools I’d never used before. I’m getting better at asking for help, trying things out, and learning as I go.</p>
            </article>
            <article className="principle" data-testid="card-principle-03">
              <span className="principle-number">03 / Community</span>
               <h3>It’s better with other people.</h3>
               <p>Some of my favorite parts of college have been bringing people together through ColorStack and the Black Muslim Collective. I want other students to find their people, too.</p>
            </article>
          </div>
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading">
            <p className="section-kicker"><span className="section-number">02 /</span> Experience</p>
            <h2 className="section-title" id="experience-title" data-testid="text-experience-title">
              My <em>Internship Experiences.</em>
            </h2>
          </div>
          <p className="section-intro">Each experience has taught me something different about how software gets built and how much there still is to learn.</p>
          <div className="experience-list">
            {experiences.map((experience, index) => (
              <article className="experience-row" key={experience.organization} data-testid={`row-experience-${index + 1}`}>
                <span className="experience-date">{experience.date}</span>
                <a className="experience-org experience-company-link" href={experience.website} target="_blank" rel="noreferrer" aria-label={`Visit ${experience.organization} website`}>
                  <img className="experience-logo" src={experience.logoUrl} alt="" />
                  {experience.organization}
                  <ArrowUpRight className="experience-company-arrow" size={13} strokeWidth={1.5} aria-hidden="true" />
                </a>
                <div className="experience-detail">
                  <h3 className="experience-role">{experience.role}</h3>
                  {experience.context && <p className="work-context">{experience.context}</p>}
                  <p className="experience-detail">{experience.detail}</p>
                </div>
                <span className="experience-index">0{index + 1}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="section-kicker"><span className="section-number">03 /</span> Projects</p>
            <h2 className="section-title" id="work-title" data-testid="text-work-title">
              A few things I&apos;ve <em>built.</em>
            </h2>
          </div>
          <p className="section-intro">A mix of internship projects, machine learning work, and things I&apos;ve helped bring into the world.</p>
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
                <div className="work-heading"><h3 className="work-name">{project.name}</h3>{project.context && <p className="work-context"><strong>{project.context}</strong></p>}</div>
                <div>
                  <span className="work-type">{project.type}</span>
                  <p className="work-summary">{project.summary}</p>
                  <p className="work-summary">{project.detail}</p>
                  {project.recognition && <p className="work-recognition">{project.recognition}</p>}
                  <p className="work-tools"><strong>Worked with</strong>{project.tools}</p>
                </div>
                <span className="work-arrow" aria-hidden="true">
                  <ArrowUpRight size={15} strokeWidth={1.5} />
                </span>
              </a>
            ))}
          </div>
          <aside className="recognition-strip" aria-label="Recognition">
            <p className="section-kicker">Recognition</p>
            <p><strong>1st Place</strong><span>JPMorgan Chase Data for Good Hackathon<br />Machine Learning &amp; Social Impact</span></p>
            <p><strong>Kamala Scholar</strong><span>Grace Hopper Celebration</span></p>
            <p><strong>Ray Greenly Scholarship Recipient</strong><span>National Retail Federation Foundation Student Program</span></p>
          </aside>
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

        <section className="section" id="leadership" aria-labelledby="leadership-title">
          <div className="section-heading">
            <p className="section-kicker"><span className="section-number">04 /</span> Leadership &amp; Professional Development</p>
            <h2 className="section-title" id="leadership-title" data-testid="text-leadership-title">
              Building the <em>room around the work.</em>
            </h2>
          </div>
          <p className="section-intro">The communities I’ve helped lead, programs that have invested in my growth, and rooms where I’ve had the chance to learn from other people.</p>
          <div className="development-heading development-heading--first">
            <p className="section-kicker">Leadership & Organizations</p>
            <p className="development-intro">
              The communities I&apos;ve helped lead, represent, and grow.
            </p>
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
          <div className="development-heading">
            <p className="section-kicker">Professional Development Programs</p>
            <p className="development-intro">
              Structured programs, fellowships, and selective opportunities designed to help me grow.
            </p>
          </div>
          {renderDevelopmentGrid(
            professionalDevelopmentPrograms,
            'Professional development programs',
          )}
          <div className="development-heading">
            <p className="section-kicker">Conferences & Summits</p>
            <p className="development-intro">
              Conferences, summits, and opportunities I’ve attended or been selected to join.
            </p>
          </div>
          <div className="conference-grid">
            {renderDevelopmentGrid(conferences, 'Conferences and summits')}
          </div>
          <div className="development-heading">
            <p className="section-kicker">Communities & Affiliations</p>
            <p className="development-intro">Communities that have shaped how I learn, connect, and grow.</p>
          </div>
          {renderDevelopmentGrid(affiliations, 'Communities and affiliations')}
        </section>

        <section className="section contact-section" id="recruiters" aria-labelledby="contact-title">
          <div className="contact-panel">
            <div className="contact-summary">
              <p className="section-kicker"><span className="section-number">05 /</span> For Recruiters</p>
              <h2 className="contact-title" id="contact-title" data-testid="text-contact-title">
                The short version.
              </h2>
              <p className="contact-subtitle" data-testid="text-contact-description">
                I’m a senior at Virginia Commonwealth University studying Computer Science with a Minor in Artificial Intelligence, graduating in May 2027.
              </p>
              <p className="contact-subtitle">I’ve interned at LinkedIn, Leidos, and Dell Technologies, working across developer platforms, applied artificial intelligence, data systems, retrieval, and internal tools. I’m currently looking for full-time software engineering opportunities beginning in 2027.</p>
            </div>
            <dl className="recruiter-facts" data-testid="recruiter-facts">
              <div><dt>Education</dt><dd>Virginia Commonwealth University<br />Bachelor of Science in Computer Science<br />Minor in Artificial Intelligence<br />Expected May 2027</dd></div>
              <div><dt>Interested in</dt><dd>Software engineering · artificial intelligence and machine learning · developer platforms · data systems · infrastructure</dd></div>
              <div><dt>Experience</dt><dd>LinkedIn · Leidos · Dell Technologies</dd></div>
              <div><dt>Based in</dt><dd>Greater Washington, DC Area</dd></div>
              <div><dt>Currently</dt><dd>Looking for full-time opportunities beginning in 2027</dd></div>
            </dl>
            <div className="contact-invitation">
              <p>If something here made you curious, feel free to reach out!</p>
            </div>
            <div className="contact-links">
              <a className="contact-link" href={`mailto:${emailAddress}`} data-testid="link-email">
                <span><Mail size={14} strokeWidth={1.5} aria-hidden="true" /> Email</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
              <a className="contact-link" href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="link-linkedin">
                <span><Linkedin size={14} strokeWidth={1.5} aria-hidden="true" /> LinkedIn</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
              <a className="contact-link" href={githubUrl} target="_blank" rel="noreferrer" data-testid="link-github">
                <span><Github size={14} strokeWidth={1.5} aria-hidden="true" /> GitHub</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </section>

        <section className="section resume-section" id="resume" aria-labelledby="resume-title">
          <div className="section-heading">
            <p className="section-kicker"><span className="section-number">06 /</span> Resume</p>
            <h2 className="section-title" id="resume-title">
              The one-page <em>version.</em>
            </h2>
          </div>
          <div className="resume-card">
            <div>
              <p className="resume-card-label">Condensed experience, projects, and skills</p>
              <h3>View my resume</h3>
            </div>
            <a className="resume-card-link" href={resumeUrl} target="_blank" rel="noreferrer" data-testid="link-resume">
              <ExternalLink size={18} strokeWidth={1.5} aria-hidden="true" />
              Open PDF
              <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </section>

        <footer className="footer">
          <p data-testid="text-footer-name">amra ibrahim / notebook</p>
          <p data-testid="text-footer-note"><Rss size={12} strokeWidth={1.5} aria-hidden="true" /> Built, edited, and still being revised.</p>
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
