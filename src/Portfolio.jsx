import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Education", "Skills", "Projects", "Certificates", "Contact"];

const REACT_PROJECTS = [
  { name: "Business Card", icon: "🪪", desc: "Digital business card with dynamic styling", link: null },
  { name: "Color Picker", icon: "🎨", desc: "Interactive color selection tool", link: "https://vids165.github.io/color-picker/" },
  { name: "Counter", icon: "🔢", desc: "Animated counter with custom increments", link: "https://vids165.github.io/counter/" },
  { name: "Expense Tracker", icon: "💰", desc: "Track and visualize personal expenses", link: "https://vids165.github.io/expense-tracker/" },
  { name: "Notes App", icon: "📝", desc: "Rich notes with local persistence", link: "https://vids165.github.io/notes/" },
  { name: "Quiz App", icon: "❓", desc: "Timed quiz with score tracking", link: "https://vids165.github.io/quiz-app/" },
  { name: "To-Do Notes", icon: "✅", desc: "Task manager with priority labels", link: "https://vids165.github.io/to-do-list/" },
  { name: "Weather App", icon: "🌤️", desc: "Live weather via API integration", link: "https://vids165.github.io/wheater-app/" },
];

const UIUX_PROJECTS = [
  { name: "UI/UX Case Study", icon: "📐", desc: "End-to-end case study — research, wireframes, to final UI", link: "https://vids165.github.io/ui-ux-case-study/" },
  { name: "Studify", icon: "📚", desc: "Study companion app with focus modes", link: "https://www.figma.com/design/IBN9BnQXP2NIxllkBfG5DQ/Studify?m=auto&t=jyeoFZqiy5QdObKt-6" },
  { name: "InternTrack", icon: "🗂️", desc: "Internship tracking platform UI", link: "https://www.figma.com/design/wHINJMK1fGThYxLf8iJtiS/Untitled?m=auto&t=jyeoFZqiy5QdObKt-6" },
  { name: "Shopera", icon: "🛍️", desc: "Modern e-commerce shopping experience", link: "https://www.figma.com/design/VSVwswTPgriRq8nmj17708/Shopera?m=auto&t=jyeoFZqiy5QdObKt-6" },
  { name: "Hackathon Project", icon: "⚡", desc: "48-hour design sprint deliverable", link: "https://www.figma.com/design/HeI1rJSvKpN9cBFb47iEPk/Untitled?node-id=0-1&t=VV7Gz481Hlt87TAR-1" },
  { name: "Music App", icon: "🎵", desc: "Immersive music player interface", link: "https://www.figma.com/design/PEiJYivc9xAbEYQFrFYjS3/Untitled?m=auto&t=9N9pCy3wXBX3CLTT-6" },
  { name: "Coffee App", icon: "☕", desc: "Specialty coffee ordering experience", link: "https://www.figma.com/design/D6haZyvrxBQpZAEgOM8l16/coffee?m=auto&t=9N9pCy3wXBX3CLTT-6" },
  { name: "Bid Project", icon: "🔨", desc: "Live auction platform design", link: null },
];

const WEB_PROJECTS = [
  { name: "Color Palette Generator", icon: "🌈", desc: "Generate harmonious color palettes", link: "https://vids165.github.io/Color-palette-ganerator/" },
  { name: "Drag & Drop", icon: "🖱️", desc: "Interactive drag-and-drop interface", link: "https://vids165.github.io/Drag-and-Drop/" },
  { name: "Quiz Game", icon: "🎮", desc: "Fun browser-based quiz game", link: "https://vids165.github.io/quiz-game/" },
  { name: "Portfolio", icon: "🖥️", desc: "Personal portfolio built in HTML/CSS/JS", link: "https://vids165.github.io/portfolio-1/" },
];

const GRAPHIC_PROJECTS = [
  { name: "House Selling Poster", icon: "🏡", desc: "Real estate marketing print design", link: "https://www.behance.net/gallery/251699675/house-selling-template" },
];

const CERTIFICATES = [
  { name: "SIH 2025", org: "Smart India Hackathon", year: "2025", icon: "🏆", color: "#7C3AED", link: "https://drive.google.com/file/d/1lAqVVJ18ViN9iUxn2ph6cLHyks2hm387/view?usp=sharing" },
  { name: "SIH 2024", org: "Smart India Hackathon", year: "2024", icon: "🥇", color: "#F59E0B", link: "https://drive.google.com/file/d/1Gs67eBbNc9LnI-xKcemzg1zf1S3ik6ib/view?usp=sharing" },
  { name: "Graphic Design Course", org: "Design Academy", year: "2024", icon: "🎨", color: "#10B981", link: "https://drive.google.com/file/d/1l0U8zHjtOtzDigmINEu0pn_AI-g37vP_/view?usp=sharing" },
  { name: "AWS Certificate", org: "Amazon Web Services", year: "2024", icon: "☁️", color: "#3B82F6", link: "https://drive.google.com/file/d/1Dw8cQnq8w4c9QXU9Dwei9GK8uMJdcKrT/view?usp=sharing" },
];

const SKILLS = {
  "UI/UX Design": ["Figma", "User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
  "Graphic Design": ["Adobe Illustrator", "Adobe Photoshop", "Typography", "Branding", "Print Design", "Visual Identity"],
  "Front-End": ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design", "Git & GitHub"],
  "Tools": ["VS Code", "Notion", "Canva", "Framer", "Zeplin", "Trello"],
};

const EDUCATION = [
  { level: "10th", institute: "SB Vakil English Medium School", detail: "90 Percentile", icon: "🏫", year: "School" },
  { level: "12th", institute: "BITS Education", detail: "57 Percentile", icon: "📖", year: "Higher Secondary" },
  { level: "B.Tech", institute: "ADIT — Computer Science & Design", detail: "Currently Pursuing", icon: "🎓", year: "Degree" },
  { level: "Internship", institute: "Optimoz Engineering Pvt. Ltd.", detail: "1 Month — Front-End Development", icon: "💼", year: "Experience" },
];

// SVG girl avatar — inline so no external dependency needed
function GirlAvatar() {
  return (
    <svg viewBox="0 0 200 220" width="130" height="140" xmlns="http://www.w3.org/2000/svg">
      {/* Hair back */}
      <ellipse cx="100" cy="82" rx="48" ry="52" fill="#4A2C0A" />
      {/* Hair sides flowing down */}
      <rect x="52" y="90" width="18" height="70" rx="9" fill="#4A2C0A" />
      <rect x="130" y="90" width="18" height="70" rx="9" fill="#4A2C0A" />
      {/* Neck */}
      <rect x="89" y="128" width="22" height="22" rx="4" fill="#FDBCB4" />
      {/* Body / top */}
      <rect x="58" y="148" width="84" height="58" rx="16" fill="#7C3AED" />
      {/* Collar detail */}
      <path d="M83 148 Q100 168 117 148" stroke="#C4B5FD" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Arms */}
      <rect x="38" y="152" width="22" height="42" rx="11" fill="#7C3AED" />
      <rect x="140" y="152" width="22" height="42" rx="11" fill="#7C3AED" />
      {/* Hands */}
      <ellipse cx="49" cy="196" rx="11" ry="9" fill="#FDBCB4" />
      <ellipse cx="151" cy="196" rx="11" ry="9" fill="#FDBCB4" />
      {/* Laptop base */}
      <rect x="60" y="194" width="80" height="10" rx="5" fill="#2D2D2D" />
      {/* Laptop screen */}
      <rect x="66" y="168" width="68" height="28" rx="5" fill="#1A1A2E" />
      <rect x="70" y="172" width="60" height="20" rx="3" fill="#7C3AED" opacity="0.6" />
      {/* Code lines on screen */}
      <rect x="74" y="176" width="28" height="2.5" rx="1" fill="#C4B5FD" />
      <rect x="74" y="181" width="20" height="2.5" rx="1" fill="#F59E0B" />
      <rect x="74" y="186" width="24" height="2.5" rx="1" fill="#C4B5FD" />
      {/* Face */}
      <ellipse cx="100" cy="88" rx="36" ry="38" fill="#FDBCB4" />
      {/* Hair top / fringe */}
      <ellipse cx="100" cy="54" rx="37" ry="18" fill="#4A2C0A" />
      <path d="M64 62 Q72 44 100 50 Q128 44 136 62" fill="#4A2C0A" />
      {/* Side swept fringe */}
      <path d="M64 62 Q70 80 76 74 Q72 58 86 56" fill="#4A2C0A" />
      {/* Eyes */}
      <ellipse cx="87" cy="88" rx="5.5" ry="6" fill="#2C1810" />
      <ellipse cx="113" cy="88" rx="5.5" ry="6" fill="#2C1810" />
      <ellipse cx="88.5" cy="86.5" rx="1.8" ry="2" fill="#fff" />
      <ellipse cx="114.5" cy="86.5" rx="1.8" ry="2" fill="#fff" />
      {/* Eyelashes */}
      <line x1="83" y1="83" x2="81" y2="80" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="87" y1="82" x2="87" y2="79" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="91" y1="83" x2="93" y2="80" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="109" y1="83" x2="107" y2="80" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="113" y1="82" x2="113" y2="79" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="117" y1="83" x2="119" y2="80" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
      {/* Nose */}
      <path d="M97 98 Q100 103 103 98" stroke="#E8A090" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Smile */}
      <path d="M90 108 Q100 116 110 108" stroke="#C47060" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cheek blush */}
      <ellipse cx="80" cy="102" rx="7" ry="4" fill="#FFB3A7" opacity="0.5" />
      <ellipse cx="120" cy="102" rx="7" ry="4" fill="#FFB3A7" opacity="0.5" />
      {/* Earrings */}
      <circle cx="64" cy="96" r="4" fill="#7C3AED" />
      <circle cx="136" cy="96" r="4" fill="#7C3AED" />
    </svg>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("React");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRefs = useRef({});

  const roles = ["UI/UX Designer | Figma • React • User-Centered Design", "Designing simple digital experiences that solve real problems", "Front-End Developer who codes what she designs"];

  useEffect(() => {
    // Force full-screen body/html
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.width = "100%";
    document.documentElement.style.overflowX = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.width = "100%";
    document.body.style.overflowX = "hidden";
    document.getElementById("root") && (document.getElementById("root").style.width = "100%");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.dataset.section);
        });
      },
      { threshold: 0.3 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    const subject = encodeURIComponent(formData.subject || "Portfolio Contact");
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:vidhiapatel2005@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const projectTabs = {
    React: REACT_PROJECTS,
    "UI/UX": UIUX_PROJECTS,
    "HTML/CSS/JS": WEB_PROJECTS,
    "Graphic": GRAPHIC_PROJECTS,
  };

  return (
    <div style={styles.root}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; overflow-x: hidden; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: block !important; }
          .hero-content { flex-direction: column !important; text-align: center; }
          .hero-right { display: none !important; }
          .contact-layout { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
        .project-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(124,58,237,0.18) !important; border-color: #7C3AED !important; }
        .cert-card:hover { transform: translateY(-4px); }
        .edu-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(124,58,237,0.5) !important; }
        input:focus, textarea:focus { border-color: #7C3AED !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.12) !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0D0D0D; }
        ::-webkit-scrollbar-thumb { background: #7C3AED; border-radius: 3px; }
      `}</style>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>
          <span style={styles.logoAccent}>✦ </span>Vidhi Patel
        </div>
        <div className="nav-links" style={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              style={{ ...styles.navLink, ...(activeSection === link ? styles.navLinkActive : {}) }}
              onClick={() => scrollTo(link)}
            >
              {link}
            </button>
          ))}
        </div>
        <button className="hamburger" style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <button key={link} style={styles.mobileMenuLink} onClick={() => scrollTo(link)}>
              {link}
            </button>
          ))}
        </div>
      )}

      {/* HERO / ABOUT */}
      <section
        id="about"
        data-section="About"
        ref={(el) => (sectionRefs.current["About"] = el)}
        style={styles.heroSection}
      >
        <div style={styles.heroBg}>
          <div style={styles.heroBgGlow1} />
          <div style={styles.heroBgGlow2} />
          <div style={styles.heroBgGrid} />
        </div>
        <div className="hero-content" style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <div style={styles.heroBadge}>✦ Available for Freelance</div>
            <h1 style={styles.heroName}>
              Hi, I'm<br />
              <span style={styles.heroNameAccent}>Vidhi Patel</span><br />
              <span style={styles.heroNameSub}>Designer &amp; Developer</span>
            </h1>
            <div style={styles.roleWrapper}>
              <span style={styles.roleDot} />
              <span key={roleIndex} style={styles.roleText}>{roles[roleIndex]}</span>
            </div>
            <p style={styles.heroDesc}>
              I'm a Computer Science &amp; Design student who gets genuinely excited about turning messy problems
              into interfaces that feel obvious. I love products that respect people's time — clean dashboards,
              calm onboarding, tools that just work — and I design and code them end-to-end, from Figma wireframe
              to working React component.
            </p>
            <div style={styles.heroActions}>
              <button className="btn-primary" style={styles.btnPrimary} onClick={() => scrollTo("Projects")}>View Projects</button>
              <button style={styles.btnOutline} onClick={() => scrollTo("Contact")}>Hire Me</button>
            </div>
          </div>
          <div className="hero-right" style={styles.heroRight}>
            <div style={styles.avatarRing}>
              <div style={styles.avatarInner}>
                <GirlAvatar />
              </div>
              <div style={styles.orbitDot1} />
              <div style={styles.orbitDot2} />
              <div style={styles.orbitDot3} />
            </div>
            <div style={styles.floatCard1}>🎨 UI/UX Design</div>
            <div style={styles.floatCard2}>⚛️ React Dev</div>
            <div style={styles.floatCard3}>✦ Creative</div>
          </div>
        </div>
        <div style={styles.scrollHint}>↓ Scroll to explore</div>
      </section>

      {/* WHY DESIGN / PERSONALITY */}
      <section style={{ ...styles.section, paddingTop: 60, paddingBottom: 60 }}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>— A Little About Me</div>
          <h2 style={styles.sectionTitle}>Why Design?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginTop: 8 }}>
            <div style={styles.eduCard}>
              <div style={styles.eduIconWrap}><span style={styles.eduIcon}>💡</span></div>
              <div style={styles.eduLevel}>Why design</div>
              <div style={styles.eduInstitute}>
                I started out writing code, and kept noticing that great products fail for one reason: people
                give up before they understand them. Design is how I fix that — it's the part of building
                something that decides whether anyone actually wants to use it.
              </div>
            </div>
            <div style={styles.eduCard}>
              <div style={styles.eduIconWrap}><span style={styles.eduIcon}>✨</span></div>
              <div style={styles.eduLevel}>What excites me</div>
              <div style={styles.eduInstitute}>
                Taking a confusing flow and making it feel inevitable. Hackathons, tight deadlines, and the
                moment a prototype finally "clicks" for a user — that's the part of the job I look forward to most.
              </div>
            </div>
            <div style={styles.eduCard}>
              <div style={styles.eduIconWrap}><span style={styles.eduIcon}>🛒</span></div>
              <div style={styles.eduLevel}>Products I love</div>
              <div style={styles.eduInstitute}>
                Tools that get out of their own way — productivity apps, clean e-commerce flows, and anything
                that makes a small task feel effortless instead of like work.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section
        id="education"
        data-section="Education"
        ref={(el) => (sectionRefs.current["Education"] = el)}
        style={styles.section}
      >
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>— Academic Journey</div>
          <h2 style={styles.sectionTitle}>Education</h2>
          <div style={styles.eduGrid}>
            {EDUCATION.map((edu, i) => (
              <div key={i} className="edu-card" style={styles.eduCard}>
                <div style={styles.eduIconWrap}>
                  <span style={styles.eduIcon}>{edu.icon}</span>
                </div>
                <div style={styles.eduBadge}>{edu.year}</div>
                <div style={styles.eduLevel}>{edu.level}</div>
                <div style={styles.eduInstitute}>{edu.institute}</div>
                <div style={styles.eduDetail}>{edu.detail}</div>
                <div style={styles.eduLine} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        data-section="Skills"
        ref={(el) => (sectionRefs.current["Skills"] = el)}
        style={{ ...styles.section, background: "#0D0D0D" }}
      >
        <div style={styles.sectionInner}>
          <div style={{ ...styles.sectionLabel, color: "#7C3AED" }}>— What I Do</div>
          <h2 style={{ ...styles.sectionTitle, color: "#F5F5F0" }}>Skills</h2>
          <div style={styles.skillsGrid}>
            {Object.entries(SKILLS).map(([category, skills], i) => (
              <div key={i} style={styles.skillCard}>
                <div style={styles.skillCategoryTitle}>{category}</div>
                <div style={styles.skillTagsWrap}>
                  {skills.map((skill, j) => (
                    <span key={j} style={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        data-section="Projects"
        ref={(el) => (sectionRefs.current["Projects"] = el)}
        style={styles.section}
      >
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>— What I've Built</div>
          <h2 style={styles.sectionTitle}>Projects</h2>
          <div style={styles.tabsWrap}>
            {Object.keys(projectTabs).map((tab) => (
              <button
                key={tab}
                style={{ ...styles.tabBtn, ...(activeTab === tab ? styles.tabBtnActive : {}) }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={styles.projectGrid}>
            {projectTabs[activeTab].map((proj, i) => (
              <div
                key={i}
                className="project-card"
                style={styles.projectCard}
                onClick={() => proj.link && window.open(proj.link, "_blank")}
              >
                <div style={styles.projectIcon}>{proj.icon}</div>
                <div style={styles.projectName}>{proj.name}</div>
                <div style={styles.projectDesc}>{proj.desc}</div>
                <div style={styles.projectFooter}>
                  <span style={styles.projectTag}>{activeTab}</span>
                  {proj.link ? (
                    <span style={styles.projectLinkBtn}>View →</span>
                  ) : (
                    <span style={styles.projectNoLink}>Coming soon</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section
        id="certificates"
        data-section="Certificates"
        ref={(el) => (sectionRefs.current["Certificates"] = el)}
        style={{ ...styles.section, background: "#0D0D0D" }}
      >
        <div style={styles.sectionInner}>
          <div style={{ ...styles.sectionLabel, color: "#F59E0B" }}>— Achievements</div>
          <h2 style={{ ...styles.sectionTitle, color: "#F5F5F0" }}>Certificates</h2>
          <div style={styles.certGrid}>
            {CERTIFICATES.map((cert, i) => (
              <div
                key={i}
                className="cert-card"
                style={{ ...styles.certCard, borderColor: cert.color + "44", cursor: cert.link ? "pointer" : "default" }}
                onClick={() => cert.link && window.open(cert.link, "_blank")}
              >
                <div style={{ ...styles.certGlow, background: cert.color + "22" }} />
                <div style={styles.certIcon}>{cert.icon}</div>
                <div style={{ ...styles.certYear, color: cert.color }}>{cert.year}</div>
                <div style={styles.certName}>{cert.name}</div>
                <div style={styles.certOrg}>{cert.org}</div>
                <div style={styles.certFooter}>
                  <div style={{ ...styles.certBadge, background: cert.color + "22", color: cert.color }}>
                    ✦ Certified
                  </div>
                  {cert.link && (
                    <span style={{ ...styles.certViewBtn, color: cert.color }}>View ↗</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        data-section="Contact"
        ref={(el) => (sectionRefs.current["Contact"] = el)}
        style={styles.section}
      >
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>— Get In Touch</div>
          <h2 style={styles.sectionTitle}>Contact Me</h2>
          <div className="contact-layout" style={styles.contactLayout}>
            <div style={styles.contactInfo}>
              {[
                { icon: "📧", label: "Email", value: "vidhiapatel2005@gmail.com", link: null },
                { icon: "📍", label: "Location", value: "Gujarat, India", link: null },
                { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/vidhi-patel", link: "https://www.linkedin.com/in/vidhi-patel-06b557286" },
                { icon: "🐙", label: "GitHub", value: "github.com/vids165", link: "https://github.com/vids165" },
              ].map((item, i) => (
                <div key={i} style={{ ...styles.contactCard, cursor: item.link ? "pointer" : "default" }} onClick={() => item.link && window.open(item.link, "_blank")}>
                  <div style={styles.contactCardIcon}>{item.icon}</div>
                  <div>
                    <div style={styles.contactCardLabel}>{item.label}</div>
                    <div style={{ ...styles.contactCardValue, color: item.link ? "#7C3AED" : "#374151" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={styles.contactForm}>
              <div className="form-row" style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Your Name</label>
                  <input
                    style={styles.formInput}
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Email Address</label>
                  <input
                    style={styles.formInput}
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Subject</label>
                <input
                  style={styles.formInput}
                  placeholder="Project Inquiry / Collaboration / Freelance"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Message</label>
                <textarea
                  style={{ ...styles.formInput, ...styles.formTextarea }}
                  placeholder="Tell me about your project, idea, or just say hello..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button
                className="btn-primary"
                style={{ ...styles.btnPrimary, width: "100%", justifyContent: "center", opacity: submitted ? 0.75 : 1 }}
                onClick={handleSubmit}
              >
                {submitted ? "✓ Message Sent!" : "Send Message →"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <span style={styles.footerText}>Made with 💜 by <strong style={{ color: "#C4B5FD" }}>Vidhi Patel</strong> using React · {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    background: "#F5F5F0",
    color: "#1A1A2E",
    width: "100%",
    overflowX: "hidden",
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 4%",
    height: 64,
    background: "rgba(13,13,13,0.95)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(124,58,237,0.2)",
  },
  navLogo: {
    fontSize: 20,
    fontWeight: 800,
    color: "#F5F5F0",
    letterSpacing: -0.5,
    whiteSpace: "nowrap",
  },
  logoAccent: { color: "#7C3AED" },
  navLinks: { display: "flex", gap: 2 },
  navLink: {
    background: "none",
    border: "none",
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: 500,
    padding: "6px 13px",
    borderRadius: 6,
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  navLinkActive: {
    color: "#C4B5FD",
    background: "rgba(124,58,237,0.15)",
  },
  hamburger: {
    display: "none",
    background: "none",
    border: "none",
    color: "#F5F5F0",
    fontSize: 22,
    cursor: "pointer",
  },
  mobileMenu: {
    position: "fixed",
    top: 64,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 99,
    background: "#0D0D0D",
    display: "flex",
    flexDirection: "column",
    padding: "12px 0",
    borderBottom: "1px solid rgba(124,58,237,0.2)",
  },
  mobileMenuLink: {
    background: "none",
    border: "none",
    color: "#F5F5F0",
    fontSize: 16,
    padding: "12px 24px",
    textAlign: "left",
    cursor: "pointer",
  },
  heroSection: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    background: "#0D0D0D",
    paddingTop: 64,
  },
  heroBg: { position: "absolute", inset: 0, pointerEvents: "none" },
  heroBgGlow1: {
    position: "absolute",
    top: "10%",
    left: "5%",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
  },
  heroBgGlow2: {
    position: "absolute",
    bottom: "5%",
    right: "10%",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
  },
  heroBgGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "100%",
    padding: "0 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 48,
  },
  heroLeft: { flex: "1 1 480px", minWidth: 0 },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(124,58,237,0.15)",
    border: "1px solid rgba(124,58,237,0.4)",
    color: "#C4B5FD",
    fontSize: 13,
    fontWeight: 600,
    padding: "6px 16px",
    borderRadius: 100,
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  heroName: {
    fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)",
    fontWeight: 900,
    color: "#F5F5F0",
    lineHeight: 1.1,
    marginBottom: 20,
    letterSpacing: -1.5,
  },
  heroNameAccent: {
    color: "#7C3AED",
    display: "block",
  },
  heroNameSub: {
    color: "#F5F5F0",
    fontSize: "0.7em",
    fontWeight: 700,
    letterSpacing: -0.5,
  },
  roleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  roleDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#F59E0B",
    flexShrink: 0,
    boxShadow: "0 0 10px #F59E0B",
  },
  roleText: {
    fontSize: 18,
    fontWeight: 600,
    color: "#F59E0B",
    letterSpacing: 0.5,
  },
  heroDesc: {
    fontSize: 16,
    color: "#9CA3AF",
    lineHeight: 1.8,
    maxWidth: 460,
    marginBottom: 32,
  },
  heroActions: { display: "flex", gap: 14, flexWrap: "wrap" },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
    color: "#fff",
    border: "none",
    padding: "14px 28px",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: 0.3,
    boxShadow: "0 4px 24px rgba(124,58,237,0.4)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  btnOutline: {
    display: "inline-flex",
    alignItems: "center",
    background: "transparent",
    color: "#F5F5F0",
    border: "2px solid rgba(245,245,240,0.3)",
    padding: "12px 28px",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "border-color 0.2s",
  },
  heroRight: {
    flex: "0 0 340px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: 360,
  },
  avatarRing: { position: "relative", width: 240, height: 240 },
  avatarInner: {
    width: 240,
    height: 240,
    borderRadius: "50%",
    background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.35))",
    border: "2px solid #7C3AED",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 60px rgba(124,58,237,0.3)",
    overflow: "hidden",
  },
  orbitDot1: {
    position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)",
    width: 12, height: 12, borderRadius: "50%", background: "#7C3AED",
    boxShadow: "0 0 10px #7C3AED",
  },
  orbitDot2: {
    position: "absolute", bottom: -6, right: 10,
    width: 10, height: 10, borderRadius: "50%", background: "#F59E0B",
    boxShadow: "0 0 10px #F59E0B",
  },
  orbitDot3: {
    position: "absolute", top: "40%", left: -6,
    width: 8, height: 8, borderRadius: "50%", background: "#10B981",
    boxShadow: "0 0 8px #10B981",
  },
  floatCard1: {
    position: "absolute", top: 10, right: -15,
    background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.5)",
    color: "#C4B5FD", fontSize: 12, fontWeight: 700, padding: "6px 12px",
    borderRadius: 8, whiteSpace: "nowrap",
  },
  floatCard2: {
    position: "absolute", bottom: 30, left: -25,
    background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)",
    color: "#FCD34D", fontSize: 12, fontWeight: 700, padding: "6px 12px",
    borderRadius: 8, whiteSpace: "nowrap",
  },
  floatCard3: {
    position: "absolute", bottom: 90, right: -30,
    background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.4)",
    color: "#6EE7B7", fontSize: 12, fontWeight: 700, padding: "6px 12px",
    borderRadius: 8, whiteSpace: "nowrap",
  },
  scrollHint: {
    position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
    color: "#4B5563", fontSize: 13, letterSpacing: 1,
  },
  section: { padding: "100px 0", background: "#F5F5F0", width: "100%" },
  sectionInner: { maxWidth: "100%", margin: "0 auto", padding: "0 6%" },
  sectionLabel: {
    fontSize: 13, fontWeight: 700, color: "#7C3AED",
    letterSpacing: 2, textTransform: "uppercase", marginBottom: 10,
  },
  sectionTitle: {
    fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900,
    color: "#0D0D0D", letterSpacing: -1, marginBottom: 48,
  },
  eduGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 24,
  },
  eduCard: {
    background: "#fff", borderRadius: 16, padding: 28,
    border: "1px solid #E5E7EB", position: "relative", overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.2s, box-shadow 0.2s",
  },
  eduIconWrap: {
    width: 48, height: 48, background: "rgba(124,58,237,0.1)",
    borderRadius: 12, display: "flex", alignItems: "center",
    justifyContent: "center", marginBottom: 16,
  },
  eduIcon: { fontSize: 24 },
  eduBadge: {
    position: "absolute", top: 20, right: 20,
    background: "rgba(124,58,237,0.1)", color: "#7C3AED",
    fontSize: 11, fontWeight: 700, padding: "3px 10px",
    borderRadius: 100, letterSpacing: 0.5,
  },
  eduLevel: { fontSize: 22, fontWeight: 900, color: "#0D0D0D", marginBottom: 6 },
  eduInstitute: { fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 8, lineHeight: 1.4 },
  eduDetail: { fontSize: 13, color: "#6B7280", marginBottom: 16 },
  eduLine: { height: 3, borderRadius: 2, background: "linear-gradient(90deg, #7C3AED, #C4B5FD)" },
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },
  skillCard: {
    background: "#1A1A2E", border: "1px solid rgba(124,58,237,0.2)",
    borderRadius: 16, padding: 28,
  },
  skillCategoryTitle: {
    fontSize: 14, fontWeight: 800, color: "#C4B5FD",
    marginBottom: 16, letterSpacing: 0.5, textTransform: "uppercase",
  },
  skillTagsWrap: { display: "flex", flexWrap: "wrap", gap: 8 },
  skillTag: {
    background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
    color: "#E9D5FF", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 8,
  },
  tabsWrap: { display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" },
  tabBtn: {
    background: "transparent", border: "2px solid #E5E7EB",
    color: "#6B7280", fontSize: 14, fontWeight: 700,
    padding: "8px 20px", borderRadius: 10, cursor: "pointer", transition: "all 0.2s",
  },
  tabBtnActive: {
    background: "#7C3AED", border: "2px solid #7C3AED",
    color: "#fff", boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
  },
  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
    gap: 20,
  },
  projectCard: {
    background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14,
    padding: 24, transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
    cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    display: "flex", flexDirection: "column",
  },
  projectIcon: { fontSize: 32, marginBottom: 12 },
  projectName: { fontSize: 15, fontWeight: 800, color: "#0D0D0D", marginBottom: 8 },
  projectDesc: { fontSize: 13, color: "#6B7280", lineHeight: 1.6, marginBottom: 14, flex: 1 },
  projectFooter: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  projectTag: {
    display: "inline-block", background: "rgba(124,58,237,0.1)", color: "#7C3AED",
    fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, letterSpacing: 0.5,
  },
  projectLinkBtn: {
    fontSize: 12, fontWeight: 700, color: "#7C3AED", letterSpacing: 0.3,
  },
  projectNoLink: {
    fontSize: 11, color: "#D1D5DB", fontStyle: "italic",
  },
  certGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 24,
  },
  certCard: {
    position: "relative", border: "1px solid transparent",
    borderRadius: 16, padding: 28, background: "#1A1A2E",
    overflow: "hidden", transition: "transform 0.2s",
  },
  certGlow: { position: "absolute", inset: 0, zIndex: 0, borderRadius: 16 },
  certIcon: { position: "relative", zIndex: 1, fontSize: 36, marginBottom: 16 },
  certYear: {
    position: "relative", zIndex: 1, fontSize: 12, fontWeight: 700,
    letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8,
  },
  certName: { position: "relative", zIndex: 1, fontSize: 20, fontWeight: 900, color: "#F5F5F0", marginBottom: 6 },
  certOrg: { position: "relative", zIndex: 1, fontSize: 13, color: "#9CA3AF", marginBottom: 16 },
  certFooter: {
    position: "relative", zIndex: 1,
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  certBadge: {
    display: "inline-block", fontSize: 12, fontWeight: 700,
    padding: "4px 12px", borderRadius: 100, letterSpacing: 0.5,
  },
  certViewBtn: { fontSize: 13, fontWeight: 700, letterSpacing: 0.3 },
  contactLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: 40,
    alignItems: "start",
  },
  contactInfo: { display: "flex", flexDirection: "column", gap: 16 },
  contactCard: {
    display: "flex", alignItems: "center", gap: 16,
    background: "#fff", border: "1px solid #E5E7EB",
    borderRadius: 14, padding: "16px 20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  contactCardIcon: {
    fontSize: 22, width: 42, height: 42,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(124,58,237,0.1)", borderRadius: 10, flexShrink: 0,
  },
  contactCardLabel: {
    fontSize: 11, fontWeight: 700, color: "#9CA3AF",
    textTransform: "uppercase", letterSpacing: 1, marginBottom: 2,
  },
  contactCardValue: { fontSize: 13, fontWeight: 600, color: "#374151" },
  contactForm: {
    background: "#fff", border: "1px solid #E5E7EB",
    borderRadius: 20, padding: 36,
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
  },
  formRow: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: 16, marginBottom: 0,
  },
  formGroup: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 },
  formLabel: { fontSize: 13, fontWeight: 700, color: "#374151", letterSpacing: 0.3 },
  formInput: {
    border: "2px solid #E5E7EB", borderRadius: 10,
    padding: "12px 14px", fontSize: 14, color: "#1A1A2E",
    outline: "none", background: "#FAFAFA", fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
    width: "100%",
  },
  formTextarea: { resize: "vertical", minHeight: 130 },
  footer: {
    background: "#0D0D0D", padding: "28px 5%", textAlign: "center",
    borderTop: "1px solid rgba(124,58,237,0.2)", width: "100%",
  },
  footerText: { color: "#6B7280", fontSize: 13 },
};