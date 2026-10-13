import ParticleScene from "./ParticleScene.jsx";
import { useEffect, useId, useState } from "react";
import "./App.css";

const phrases = [
  "Building AI-powered analytics...",
  "Analyzing 128K+ transactions...",
  "Creating interactive dashboards...",
  "Turning data into insights...",
];

const projects = [
  {
    number: "01",
    category: "AI / BUSINESS INTELLIGENCE",
    title: "EnterpriseIQ",
    subtitle: "Business Intelligence Platform",
    description:
      "An AI-powered business intelligence platform with KPI dashboards, revenue forecasting, anomaly detection, business recommendations, and a conversational AI assistant.",
    metrics: ["128K+ transactions", "₹7.86 Cr+ revenue"],
    tech: [
      "Python",
      "SQL",
      "Streamlit",
      "Plotly",
      "Prophet",
      "Groq LLM",
      "Pandas",
      "FastAPI",
      "REST APIs",
      "Git",
    ],
    link: "https://enterpriseiq-ai-platform.streamlit.app/",
    linkText: "Open Live Demo",
    visual: "enterprise",
  },
  {
    number: "02",
    category: "E-COMMERCE / DATA ANALYTICS",
    title: "E-commerce Product Analytics",
    subtitle: "Analytics & Recommendation Engine",
    description:
      "An e-commerce analytics system for user interaction tracking, funnel analysis, revenue and conversion insights, PostgreSQL workflows, Power BI dashboards, and Python-powered recommendations.",
    metrics: ["10K+ user interactions", "Funnel analysis"],
    tech: [
      "Python",
      "Pandas",
      "PostgreSQL",
      "SQL",
      "Power BI",
      "DAX",
      "pgAdmin",
    ],
    link: "https://github.com/sanjanasahay2003",
    linkText: "Explore GitHub",
    visual: "analytics",
  },
];

const skillGroups = [
  {
    number: "01",
    title: "Programming",
    skills: ["Python", "SQL", "R"],
  },
  {
    number: "02",
    title: "AI & LLM",
    skills: [
      "Prompt Engineering",
      "RAG",
      "Groq API",
      "Claude API",
      "LLaMA 3",
      "Conversational AI",
    ],
  },
  {
    number: "03",
    title: "Analytics & BI",
    skills: [
      "Power BI",
      "DAX",
      "Power Query",
      "Tableau",
      "Excel (Advanced)",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Plotly",
      "KPI Analytics",
      "Funnel Analysis",
    ],
  },
  {
    number: "04",
    title: "Tools & Frameworks",
    skills: ["Streamlit", "FastAPI", "Flask", "Git", "GitHub", "VS Code"],
  },
  {
    number: "05",
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB"],
  },
];


function Reveal({ children, className = "", delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  useEffect(() => {
    const node = document.getElementById(id);
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [id]);

  return (
    <div
      id={id}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}


function Terminal() {
  const [text, setText] = useState("");

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let pause = 8;

    const timer = setInterval(() => {
      if (pause > 0) {
        pause -= 1;
        return;
      }

      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex += 1;
        setText(phrase.slice(0, charIndex));

        if (charIndex >= phrase.length) {
          deleting = true;
          pause = 22;
        }
      } else {
        charIndex -= 1;
        setText(phrase.slice(0, charIndex));

        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          pause = 4;
        }
      }
    }, 65);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="terminal">
      <div className="terminal-top">
        <div className="terminal-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="terminal-label">sanjana@portfolio</span>
      </div>

      <div className="terminal-body">
        <p className="terminal-command">
          <span>➜</span> ~/portfolio <span className="terminal-muted">whoami</span>
        </p>
        <p className="terminal-output">
          {text}
          <span className="cursor">▋</span>
        </p>
      </div>
    </div>
  );
}

function ProjectArtwork({ type }) {
  if (type === "enterprise") {
    return (
      <div className="project-art enterprise-art">
        <div className="art-heading">
          <span>REVENUE INTELLIGENCE</span>
          <span className="art-live"><i /> LIVE DEMO</span>
        </div>

        <div className="art-metrics">
          <div>
            <small>REVENUE ANALYSED</small>
            <strong>₹7.86 Cr+</strong>
          </div>
          <div>
            <small>TRANSACTIONS</small>
            <strong>128K+</strong>
          </div>
        </div>

        <div className="bar-chart" aria-label="Illustrative revenue chart">
          {[34, 48, 40, 65, 52, 78, 57, 91, 70, 100, 76, 88].map(
            (height, index) => (
              <span
                key={index}
                style={{ "--bar-height": `${height}%`, "--bar-delay": `${index * 45}ms` }}
              />
            )
          )}
        </div>

        <div className="art-footer">
          <span>FORECASTING ENGINE</span>
          <span>AI INSIGHTS ↗</span>
        </div>
      </div>
    );
  }

  return (
    <div className="project-art analytics-art">
      <div className="analytics-window">
        <div className="analytics-sidebar">
          <span className="sidebar-logo">EA</span>
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="analytics-content">
          <small>PRODUCT ANALYTICS OVERVIEW</small>
          <div className="analytics-kpis">
            <div><span>USERS</span><strong>10K+</strong></div>
            <div><span>FUNNEL</span><strong>TRACKED</strong></div>
          </div>
          <div className="analytics-lines">
            <span /><span /><span /><span />
          </div>
          <div className="analytics-chart">
            {[25, 43, 35, 64, 48, 78, 58, 92].map((height, index) => (
              <span key={index} style={{ "--bar-height": `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = "sanjanasahay2003@gmail.com";

  function handleTilt(event) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
  
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
  
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
  
    card.style.setProperty("--tilt-x", `${(0.5 - y) * 12}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * 12}deg`);
    card.style.setProperty("--mouse-x", `${x * 100}%`);
    card.style.setProperty("--mouse-y", `${y * 100}%`);
  }
  
  function resetTilt(event) {
    const card = event.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  }
  
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="portfolio" id="top">
      <div className="background-grid" aria-hidden="true" />
      <div className="ambient-glow glow-one" aria-hidden="true" />
      <div className="ambient-glow glow-two" aria-hidden="true" />

      <header className="navbar">
        <a className="brand" href="#top" aria-label="Sanjana Sahay home">
          SS<span>/</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          {[
            ["About", "#about"],
            ["Experience", "#experience"],
            ["Projects", "#projects"],
            ["Skills", "#skills"],
            ["Credentials", "#credentials"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">
          Resume <span>↗</span>
        </a>
      </header>

      <main>
        <section className="hero section">
          <div className="hero-copy">
            <div className="availability">
              <span className="status-dot" />
              OPEN TO OPPORTUNITIES
            </div>

            <p className="eyebrow hero-eyebrow">
              COMPUTER SCIENCE ENGINEERING · INDIA
            </p>

            <h1 className="hero-title">
              Sanjana
              <br />
              <span>Sahay.</span>
            </h1>

            <p className="hero-subtitle">
              Data analytics <span>×</span> Software <span>×</span> AI
            </p>

            <Terminal />

            <p className="hero-description">
              I build data-driven products and intelligent applications.
              I enjoy turning complex data into useful insights and practical
              technology solutions.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View Projects <span>↗</span>
              </a>
              <a className="button button-secondary" href="#contact">
                Get in Touch
              </a>
              <a className="text-link" href="/resume.pdf" target="_blank" rel="noreferrer">
                Download CV ↓
              </a>
            </div>

            <div className="hero-socials">
              <a href="https://www.linkedin.com/in/sanjanasahay/" target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href="https://github.com/sanjanasahay2003" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </div>
          </div>

          <div className="hero-visual">
  <ParticleScene />

  <div className="visual-orbit orbit-a" />
  <div className="visual-orbit orbit-b" />

            <div
  className="code-window"
  onMouseMove={handleTilt}
  onMouseLeave={resetTilt}
>
              <div className="code-window-top">
                <div className="terminal-dots"><span /><span /><span /></div>
                <span>profile.py</span>
              </div>
              <div className="code-lines">
                <p><span className="code-purple">class</span> <span className="code-cyan">Developer</span>:</p>
                <p className="code-indent"><span className="code-purple">name</span> = <span className="code-green">"Sanjana Sahay"</span></p>
                <p className="code-indent"><span className="code-purple">focus</span> = [</p>
                <p className="code-indent code-indent-more"><span className="code-green">"Data Analytics"</span>,</p>
                <p className="code-indent code-indent-more"><span className="code-green">"Artificial Intelligence"</span>,</p>
                <p className="code-indent code-indent-more"><span className="code-green">"Software"</span></p>
                <p className="code-indent">]</p>
                <p className="code-gap"><span className="code-comment"># Turning ideas into solutions</span></p>
                <p><span className="code-cyan">build</span>(<span className="code-green">"something useful"</span>)<span className="cursor">▋</span></p>
              </div>
            </div>

            <div className="floating-chip chip-python">
              <span>⌘</span> Python & SQL
            </div>
            <div className="floating-chip chip-ai">
              <span>✳</span> AI Analytics
            </div>
            <div className="visual-caption">PORTFOLIO — 2026</div>
          </div>

          <a className="scroll-cue" href="#about">
            <span className="scroll-line" />
            SCROLL TO EXPLORE
          </a>
        </section>

        <Reveal>
          <section className="section content-section about-section" id="about">
            <div className="section-heading">
              <p className="eyebrow">01 / ABOUT</p>
              <h2>Curious mind.<br /><span>Practical builder.</span></h2>
            </div>

            <div className="about-content">
              <p className="section-lead">
                I turn data and ideas into tools that help people make better
                decisions.
              </p>
              <p className="body-copy">
                I'm a Computer Science and Engineering graduate with hands-on
                experience in data analytics, business intelligence, and
                AI-powered applications. My work spans data preparation,
                interactive dashboards, analytics workflows, and practical
                machine learning integrations.
              </p>

              <div className="about-facts">
                <div><strong>AI / BI</strong><span>Areas of interest</span></div>
                <div><strong>Python</strong><span>Core tool</span></div>
                <div><strong>Data → Insight</strong><span>My approach</span></div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="section content-section experience-section" id="experience">
            <div className="section-heading">
              <p className="eyebrow">02 / EXPERIENCE</p>
              <h2>Work that<br /><span>creates impact.</span></h2>
            </div>

            <article className="experience-card interactive-card">
              <div className="experience-header">
                <div>
                  <p className="card-kicker">DATA ANALYTICS INTERNSHIP</p>
                  <h3>Data Analyst Intern</h3>
                  <p className="company-name">Synergy Technofin Pvt. Ltd.</p>
                </div>
                <span className="date-badge">FEB — MAY 2026</span>
              </div>

              <p className="body-copy">
                Worked on agricultural development and climate-resilience
                analytics, transforming survey data into insights and
                interactive dashboards for NABARD and GIZ's JIVA Agroecology
                Impact Assessment Project.
              </p>

              <div className="experience-metrics">
                <div><strong>50+</strong><span>Districts covered</span></div>
                <div><strong>30+</strong><span>Agricultural KPIs</span></div>
                <div><strong>300+</strong><span>Farmer surveys analysed</span></div>
              </div>

              <div className="tag-list">
                {["Power BI", "DAX", "Excel", "Power Query", "Python", "SQL"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </section>
        </Reveal>

        <Reveal>
          <section className="section content-section projects-section" id="projects">
            <div className="projects-heading">
              <div className="section-heading">
                <p className="eyebrow">03 / SELECTED PROJECTS</p>
                <h2>Things I've<br /><span>built.</span></h2>
              </div>
              <p className="body-copy projects-intro">
                Two projects combining analytics, business intelligence,
                and AI to solve practical problems.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <article
                  className="project-card interactive-card"
                  key={project.number}
                  style={{ "--card-delay": `${index * 130}ms` }}
                >
                  <div className="project-card-top">
                    <span className="project-category">{project.category}</span>
                    <span className="project-number">{project.number}</span>
                  </div>

                  <ProjectArtwork type={project.visual} />

                  <div className="project-content">
                    <div className="project-metrics">
                      {project.metrics.map((metric) => (
                        <span key={metric}><i /> {metric}</span>
                      ))}
                    </div>

                    <h3>{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                    <p className="body-copy">{project.description}</p>

                    <div className="tag-list">
                      {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
                    </div>

                    <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                      {project.linkText} <span>↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="project-note">
              The project visuals are illustrative UI previews. Open each project
              link to explore the available application or repository.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="section content-section skills-section" id="skills">
            <div className="section-heading">
              <p className="eyebrow">04 / TOOLKIT</p>
              <h2>Tools of<br /><span>the trade.</span></h2>
              <p className="body-copy">
                Technologies and tools listed on my resume.
              </p>
            </div>

            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <article
                  className="skill-card interactive-card"
                  key={group.number}
                  style={{ "--card-delay": `${index * 90}ms` }}
                >
                  <div className="skill-top">
                    <span>{group.number}</span>
                    <span className="skill-mark">↗</span>
                  </div>
                  <h3>{group.title}</h3>
                  <div className="tag-list">
                    {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="section content-section credentials-section" id="credentials">
            <div className="section-heading">
              <p className="eyebrow">05 / CREDENTIALS</p>
              <h2>Learning.<br /><span>Sharing.</span></h2>
            </div>

            <div className="credentials-list">
              <article className="credential-card">
                <span className="credential-icon">01</span>
                <div>
                  <p className="card-kicker">CERTIFICATION</p>
                  <h3>Microsoft Certified: Power BI Data Analyst Associate</h3>
                  <p className="body-copy">PL-300</p>
                </div>
              </article>

              <article className="credential-card">
                <span className="credential-icon">02</span>
                <div>
                  <p className="card-kicker">PUBLICATION · 2026</p>
                  <h3>Smart Attendance System using Automated Face Recognition</h3>
                  <p className="body-copy">ICSICE 2026 · Scopus-indexed, as listed on my resume</p>
                </div>
              </article>

              <article className="credential-card">
                <span className="credential-icon">03</span>
                <div>
                  <p className="card-kicker">CERTIFICATION</p>
                  <h3>GenAI Powered Data Analytics Job Simulation</h3>
                  <p className="body-copy">Tata</p>
                </div>
              </article>

              <article className="credential-card">
                <span className="credential-icon">04</span>
                <div>
                  <p className="card-kicker">CERTIFICATION</p>
                  <h3>Data Visualization with Power BI</h3>
                  <p className="body-copy">Veloces</p>
                </div>
              </article>

              <article className="credential-card">
                <span className="credential-icon">05</span>
                <div>
                  <p className="card-kicker">CERTIFICATION</p>
                  <h3>Python with ML</h3>
                  <p className="body-copy">Training Basket</p>
                </div>
              </article>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="contact-section" id="contact">
            <div className="contact-grid" />
            <div className="contact-inner">
              <p className="eyebrow">06 / CONTACT</p>
              <h2>Let's build<br /><span>something useful.</span></h2>
              <p className="body-copy">
                Interested in software development, data analytics, and
                AI-powered applications. Open to opportunities and meaningful
                collaborations.
              </p>

              <div className="contact-actions">
                <a className="button button-primary" href={`mailto:${email}`}>
                  Email Me <span>↗</span>
                </a>
                <button className="button button-secondary" onClick={copyEmail}>
                  {copied ? "Email Copied ✓" : "Copy Email"}
                </button>
              </div>

              <div className="contact-socials">
                <a href="https://www.linkedin.com/in/sanjanasahay/" target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
                <a href="https://github.com/sanjanasahay2003" target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer">
                  Resume PDF ↗
                </a>
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <footer className="footer">
        <a className="brand" href="#top">SS<span>/</span></a>
        <p>Designed and built with React.</p>
        <a href="#top" className="back-top">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;
