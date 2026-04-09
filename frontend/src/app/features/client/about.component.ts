import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="page-wrapper">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>

      <section class="content-section">
        <div class="container">
          <div class="section-head reveal-on-scroll">
            <span class="section-badge">About Us</span>
            <h2 class="section-title">Building the Future of Education</h2>
            <div class="header-subline">
              <p>Lumina is a comprehensive Education Management System designed to bridge the gap between students, instructors, and knowledge.</p>
            </div>
          </div>

          <div class="about-grid">
            <div class="about-card reveal-on-scroll">
              <div class="card-icon">🚀</div>
              <h3>The Project</h3>
              <p>
                This Education Management System (EMS) serves as a robust platform for managing online education. 
                Developed as a final year BCA project, it demonstrates full-stack web development capabilities 
                focusing on scalability, security, and user experience.
              </p>
            </div>

            <div class="about-card reveal-on-scroll" style="animation-delay: 0.1s">
              <div class="card-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To provide a seamless, intuitive, and accessible learning environment. We aim to empower 
                educators to share their expertise and help students achieve their academic and professional goals 
                through technology.
              </p>
            </div>
          </div>

          <div class="tech-section reveal-on-scroll">
            <h3 class="subsection-title">Powered by Modern Technology</h3>
            <div class="tech-grid">
              <div class="tech-item">
                <span class="tech-icon">🅰️</span>
                <span class="tech-name">Angular</span>
                <span class="tech-desc">Frontend Framework</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">🟩</span>
                <span class="tech-name">Node.js</span>
                <span class="tech-desc">Runtime Environment</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">🚂</span>
                <span class="tech-name">Express</span>
                <span class="tech-desc">Web Framework</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">🍃</span>
                <span class="tech-name">MongoDB</span>
                <span class="tech-desc">NoSQL Database</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">🔒</span>
                <span class="tech-name">JWT</span>
                <span class="tech-desc">Secure Auth</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">🎨</span>
                <span class="tech-name">Bootstrap</span>
                <span class="tech-desc">Responsive UI</span>
              </div>
            </div>
          </div>

          <div class="features-summary reveal-on-scroll">
            <h3 class="subsection-title">Key Capabilities</h3>
            <div class="feature-list">
              <div class="feature-item">✅ Role-based Access Control (RBAC)</div>
              <div class="feature-item">✅ Secure Student & Instructor Portals</div>
              <div class="feature-item">✅ Course Enrollment & Tracking</div>
              <div class="feature-item">✅ Review & Rating System</div>
              <div class="feature-item">✅ Real-time Data Updates</div>
              <div class="feature-item">✅ Responsive Modern Interface</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: 'Plus Jakarta Sans', sans-serif;
        --primary: #000000;
        --primary-dark: #1a1a1a;
        --secondary: #52525b;
        --accent: #a1a1aa;
        --background: #ffffff;
        --surface: #fafafa;
        --text-main: #09090b;
        --text-muted: #71717a;
        --border: #e4e4e7;
        --blob-color-1: rgba(0, 0, 0, 0.03);
        --blob-color-2: rgba(0, 0, 0, 0.05);
        background-color: var(--surface);
      }

      * { box-sizing: border-box; }

      .page-wrapper {
        width: 100%;
        min-height: 100vh;
        position: relative;
        overflow-x: hidden;
      }

      .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      /* --- Animations --- */
      .blob {
        position: absolute;
        filter: blur(80px);
        z-index: 0;
        opacity: 1;
        animation: move-blob 10s infinite alternate;
        pointer-events: none;
        border-radius: 50%;
      }
      .blob-1 { top: -10%; left: -10%; width: 500px; height: 500px; background: var(--blob-color-1); }
      .blob-2 { bottom: 10%; right: -5%; width: 400px; height: 400px; background: var(--blob-color-2); animation-duration: 15s; animation-direction: alternate-reverse; }

      @keyframes move-blob {
        0% { transform: translate(0, 0) scale(1); }
        100% { transform: translate(20px, -20px) scale(1.1); }
      }
      @keyframes reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .reveal-on-scroll { animation: reveal 0.6s ease-out forwards; }

      /* --- Typography & Layout --- */
      .content-section { padding: 6rem 0; position: relative; z-index: 1; }
      .section-head { text-align: center; max-width: 700px; margin: 0 auto 4rem; }
      .section-badge { color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 0.875rem; margin-bottom: 1rem; display: block; }
      .section-title { font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
      .header-subline { color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; }
      .subsection-title { text-align: center; font-size: 1.5rem; font-weight: 700; margin-bottom: 2rem; color: var(--text-main); }

      /* --- About Grid --- */
      .about-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; margin-bottom: 5rem; }
      
      .about-card {
        background: white; padding: 2.5rem; border-radius: 24px; border: 1px solid var(--border);
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: transform 0.3s;
      }
      .about-card:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
      
      .card-icon { font-size: 2.5rem; margin-bottom: 1rem; }
      .about-card h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-main); }
      .about-card p { color: var(--text-muted); line-height: 1.6; margin: 0; }

      /* --- Tech Stack --- */
      .tech-section { margin-bottom: 5rem; }
      .tech-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1.5rem; }
      
      .tech-item {
        background: white; padding: 1.5rem; border-radius: 16px; border: 1px solid var(--border);
        display: flex; flex-direction: column; align-items: center; text-align: center;
        transition: all 0.3s;
      }
      .tech-item:hover { transform: translateY(-5px); border-color: var(--primary); }
      
      .tech-icon { font-size: 2rem; margin-bottom: 0.5rem; }
      .tech-name { font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem; }
      .tech-desc { font-size: 0.8rem; color: var(--text-muted); }

      /* --- Features Summary --- */
      .features-summary { 
        background: white; padding: 3rem; border-radius: 24px; border: 1px solid var(--border); 
        text-align: center; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
      }
      .feature-list { 
        display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem 3rem; 
      }
      .feature-item { 
        font-weight: 500; color: var(--text-main); font-size: 1.05rem;
        display: flex; align-items: center; gap: 0.5rem;
      }

      @media (max-width: 768px) {
        .section-title { font-size: 2rem; }
        .about-grid { grid-template-columns: 1fr; }
        .feature-list { flex-direction: column; gap: 1rem; }
      }
    `
  ]
})
export class AboutComponent {}
