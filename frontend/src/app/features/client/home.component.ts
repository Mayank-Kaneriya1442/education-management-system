import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="landing-wrapper">

      <!-- Hero Section -->
      <header class="hero-section">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="flying-obj fly-1">✈️</div>
        <div class="flying-obj fly-2">🚀</div>
        <div class="flying-obj fly-3">☁️</div>
        
        <div class="container hero-grid">
          <div class="hero-content">
            <div class="hero-badge">
              <span>🎓</span> The #1 Education Management Platform
            </div>
            <h1 class="hero-title">
              Master Your Future with <br>
              <span>Confidence & Clarity</span>
            </h1>
            <p class="hero-desc">
              Join thousands of students achieving their academic goals. 
              Access world-class courses, track your real-time progress, and learn from expert instructors with our advanced platform.
            </p>
            <div class="hero-actions hero-btns">
              <a routerLink="/register" class="btn-hero-primary">Start Learning</a>
              <a routerLink="/courses" class="btn-hero-secondary">
                <span>▶</span> Browse Courses
              </a>
            </div>
          </div>

          <div class="hero-image-wrapper">
            <div class="anim-container">
              <div class="circle c1"><div class="dot"></div></div>
              <div class="circle c2"><div class="dot"></div></div>
              <div class="circle c3"><div class="dot"></div></div>
              <div class="center-logo">💡</div>
            </div>
          </div>
        </div>
      </header>

      <!-- Stats Section -->
      <section class="stats-section">
        <div class="container stats-container">
          <div class="stat-card reveal-on-scroll">
            <div class="stat-number">10k+</div>
            <div class="stat-label">Active Students</div>
          </div>
          <div class="stat-card reveal-on-scroll">
            <div class="stat-number">100+</div>
            <div class="stat-label">Courses Available</div>
          </div>
          <div class="stat-card reveal-on-scroll">
            <div class="stat-number">50+</div>
            <div class="stat-label">Expert Instructors</div>
          </div>
          <div class="stat-card reveal-on-scroll">
            <div class="stat-number">99%</div>
            <div class="stat-label">Satisfaction</div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section" id="features">
        <div class="container">
          <div class="section-head">
            <span class="section-badge">Why Choose Lumina</span>
            <h2 class="section-title">Everything You Need to Excel</h2>
            <p style="color: var(--text-muted); font-size: 1.1rem;">Our platform is built with students and educators in mind, providing a seamless experience from start to finish.</p>
          </div>

          <div class="features-grid">
            <div class="feature-box reveal-on-scroll">
              <div class="feature-icon">🛡️</div>
              <h3 class="feature-title">Secure Environment</h3>
              <p class="feature-text">We prioritize your data privacy and security, ensuring a safe learning environment for everyone.</p>
            </div>

            <div class="feature-box reveal-on-scroll">
              <div class="feature-icon">⚡</div>
              <h3 class="feature-title">Real-time Progress</h3>
              <p class="feature-text">No more guessing. Track your course completion, grades, and assignments in real-time.</p>
            </div>

            <div class="feature-box reveal-on-scroll">
              <div class="feature-icon">📊</div>
              <h3 class="feature-title">Performance Insights</h3>
              <p class="feature-text">Visualize your growth with interactive charts. Identify strengths and weaknesses to focus your study efforts.</p>
            </div>

            <div class="feature-box reveal-on-scroll">
              <div class="feature-icon">📱</div>
              <h3 class="feature-title">Any Device</h3>
              <p class="feature-text">Learn on your laptop, tablet, or smartphone. Our responsive design ensures a smooth experience anywhere.</p>
            </div>

            <div class="feature-box reveal-on-scroll">
              <div class="feature-icon">🎓</div>
              <h3 class="feature-title">Expert Instructors</h3>
              <p class="feature-text">Learn from industry professionals and experienced teachers across various disciplines.</p>
            </div>

            <div class="feature-box reveal-on-scroll">
              <div class="feature-icon">💬</div>
              <h3 class="feature-title">Community Support</h3>
              <p class="feature-text">Connect with peers and instructors. Our dedicated support team is also here to help you.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section class="process-section" id="process">
        <div class="container">
          <div class="section-head reveal-on-scroll">
            <span class="section-badge">How It Works</span>
            <h2 class="section-title">Simple Steps to Success</h2>
            <p style="color: var(--text-muted); font-size: 1.1rem;">Get started with Lumina in minutes. Our streamlined process ensures you can focus on learning.</p>
          </div>

          <div class="process-grid">
            <div class="process-step reveal-on-scroll">
              <div class="step-number"><b>01</b></div>
              <div class="step-content">
                <h3 class="step-title">Create Account</h3>
                <p class="step-desc">Sign up for free in less than 2 minutes. Choose between student or instructor profiles.</p>
              </div>
            </div>

            <div class="process-step reveal-on-scroll">
              <div class="step-number"><b>02</b></div>
              <div class="step-content">
                <h3 class="step-title">Enroll in Courses</h3>
                <p class="step-desc">Browse our extensive catalog of courses and enroll in the ones that match your goals.</p>
              </div>
            </div>

            <div class="process-step reveal-on-scroll">
              <div class="step-number"><b>03</b></div>
              <div class="step-content">
                <h3 class="step-title">Start Learning</h3>
                <p class="step-desc">Access high-quality content, submit assignments, and earn certifications upon completion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="faq-section" id="faq">
        <div class="container">
          <div class="section-head reveal-on-scroll">
            <span class="section-badge">FAQ</span>
            <h2 class="section-title">Common Questions</h2>
          </div>
          <div class="faq-container">
            <details class="reveal-on-scroll">
              <summary>Is Lumina free for students?</summary>
              <div class="faq-answer">Creating an account is free. Some courses may be free, while premium courses have a one-time enrollment fee.</div>
            </details>
            <details class="reveal-on-scroll">
              <summary>Can I access courses on mobile?</summary>
              <div class="faq-answer">Absolutely. Our platform is fully responsive and works perfectly on smartphones and tablets.</div>
            </details>
            <details class="reveal-on-scroll">
              <summary>Do I get a certificate?</summary>
              <div class="faq-answer">Yes, upon successfully completing a course and its requirements, you will be awarded a certificate of completion.</div>
            </details>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-inner reveal-on-scroll">
            <h2 class="cta-title">Ready to Start Your Journey?</h2>
            <p class="cta-text">Join thousands of students and educators today. Sign up for free and start learning in minutes.</p>
            <a routerLink="/register" class="btn-cta">Create Free Account</a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand reveal-on-scroll">
              <h4><span>✨</span> Lumina</h4>
              <p class="footer-desc">
                Empowering students and educators with secure, reliable, and intelligent management solutions. Building the future of education together.
              </p>
              <div class="social-links">
                <a href="#" class="social-icon" aria-label="Twitter">
                  <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" class="social-icon" aria-label="Facebook">
                  <svg viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.733.984-2.733 2.582v1.39h4.506l-1.017 3.667h-3.489v7.98h-5.08z"/></svg>
                </a>
                <a href="#" class="social-icon" aria-label="Instagram">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
            
            <div class="footer-col reveal-on-scroll">
              <h5>Platform</h5>
              <ul class="footer-links">
                <li><a routerLink="/courses">Browse Courses</a></li>
                <li><a routerLink="/pricing">Pricing</a></li>
                <li><a routerLink="/login">Log In</a></li>
                <li><a routerLink="/register">Sign Up</a></li>
              </ul>
            </div>

            <div class="footer-col reveal-on-scroll">
              <h5>Resources</h5>
              <ul class="footer-links">
                <li><a routerLink="/blog">Blog</a></li>
                <li><a routerLink="/about">About Us</a></li>
                <li><a routerLink="/contact">Contact</a></li>
              </ul>
            </div>

            <div class="footer-col reveal-on-scroll">
              <h5>Stay Updated</h5>
              <p style="margin-bottom: 1rem; font-size: 0.95rem;">Subscribe to our newsletter for the latest updates.</p>
              <form class="newsletter-form">
                <input type="email" class="newsletter-input" placeholder="Enter your email">
                <button type="button" class="btn-newsletter">➤</button>
              </form>
            </div>
          </div>

          <div class="footer-bottom">
            <div>&copy; 2026 Lumina Inc. All rights reserved.</div>
            <div style="display: flex; gap: 1.5rem;">
              <a href="#" style="color: inherit; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='inherit'">Privacy Policy</a>
              <a href="#" style="color: inherit; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='inherit'">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <a href="#" class="back-to-top" aria-label="Back to Top">
        ↑
      </a>

    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
        --primary: #000000;
        --primary-dark: #1a1a1a;
        --secondary: #52525b;
        --accent: #a1a1aa;
        --background: #ffffff;
        --surface: #fafafa;
        --text-main: #09090b;
        --text-muted: #71717a;
        --border: #e4e4e7;
        overflow-x: hidden;
        --blob-color-1: rgba(0, 0, 0, 0.03);
        --blob-color-2: rgba(0, 0, 0, 0.05);
      }

      /* Global Reset & Utilities */
      * { box-sizing: border-box; }
      
      .landing-wrapper {
        width: 100%;
        min-height: 100vh;
        background: var(--background);
        color: var(--text-main);
        position: relative;
        overflow-x: hidden;
      }

      .container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      /* --- Advanced Animations --- */
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }
      
      @keyframes move-blob {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0, 0) scale(1); }
      }

      @keyframes fly-across {
        0% { transform: translate(-10vw, 20vh) rotate(-5deg) scale(0.8); opacity: 0; }
        10% { opacity: 0.6; }
        90% { opacity: 0.6; }
        100% { transform: translate(100vw, -60vh) rotate(10deg) scale(1.2); opacity: 0; }
      }

      @keyframes reveal {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Scroll Driven Animation Support */
      @supports (animation-timeline: view()) {
        .reveal-on-scroll {
          opacity: 0; /* Start hidden */
          animation: reveal 0.6s ease-out forwards;
          animation-timeline: view();
          animation-range: entry 10% cover 20%;
        }
      }
      
      @supports not (animation-timeline: view()) {
        .reveal-on-scroll {
          opacity: 1;
          transform: none;
        }
      }

      @keyframes gradient-text {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* --- Navigation --- */
      .landing-nav {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
        padding: 1.25rem 0;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(16px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;
      }

      .nav-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .brand {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--primary);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        transition: transform 0.2s;
        margin-right: 10rem;
      }

      .brand:hover { transform: scale(1.05); }

      .brand span {
        font-size: 1.8rem;
      }

      .nav-links {
        display: flex;
        gap: 2rem;
        align-items: center;
      }

      .nav-link {
        color: var(--text-muted);
        font-weight: 600;
        text-decoration: none;
        transition: color 0.3s;
        font-size: 0.95rem;
        position: relative;
        cursor: pointer;
      }

      .nav-link::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -4px;
        left: 0;
        background-color: var(--primary);
        transition: width 0.3s;
      }

      .nav-link:hover { color: var(--text-main); }
      .nav-link:hover::after { width: 100%; }

      /* Adjust scroll position for fixed navbar */
      section {
        scroll-margin-top: 100px;
      }

      .btn-login {
        padding: 0.75rem 1.5rem;
        border-radius: 50px;
        font-weight: 600;
        text-decoration: none;
        color: var(--text-main);
        transition: all 0.3s;
      }

      .btn-login:hover {
        background: rgba(0,0,0,0.05);
        color: var(--text-main);
      }

      .btn-signup {
        padding: 0.75rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        text-decoration: none;
        color: white;
        background: var(--text-main);
        transition: all 0.3s;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }

      .btn-signup:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        background: var(--primary-dark);
      }

      /* --- Hero Section --- */
      .hero-section {
        padding-top: 10rem;
        padding-bottom: 8rem;
        position: relative;
        overflow: hidden;
        background: radial-gradient(circle at top center, #f4f4f5 0%, #ffffff 70%);
      }

      .blob {
        position: absolute;
        filter: blur(80px);
        z-index: 0;
        opacity: 1;
        animation: move-blob 10s infinite alternate;
        pointer-events: none;
        border-radius: 50%;
      }
      
      .blob-1 {
        top: -10%;
        left: -10%;
        width: 500px;
        height: 500px;
        background: var(--blob-color-1);
      }
      
      .blob-2 {
        bottom: 10%;
        right: -5%;
        width: 400px;
        height: 400px;
        background: var(--blob-color-2);
        animation-duration: 15s;
        animation-direction: alternate-reverse;
      }

      /* Flying Theme Elements */
      .flying-obj {
        position: absolute;
        color: var(--text-muted);
        opacity: 0.1;
        z-index: 0;
        animation: fly-across 20s linear infinite;
        pointer-events: none;
      }
      .fly-1 { top: 60%; left: -10%; animation-duration: 25s; font-size: 4rem; }
      .fly-2 { top: 80%; left: -5%; animation-duration: 30s; animation-delay: -10s; font-size: 6rem; opacity: 0.05; }
      .fly-3 { top: 40%; left: -15%; animation-duration: 22s; animation-delay: -5s; font-size: 3rem; }

      .hero-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 4rem;
        align-items: center;
        position: relative;
        z-index: 1;
      }

      .hero-content {
        animation: reveal 1s ease-out;
      }

      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: white;
        border: 1px solid var(--border);
        border-radius: 50px;
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--primary);
        margin-bottom: 1.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        animation: float 6s ease-in-out infinite;
      }

      .hero-title {
        font-size: 4rem;
        line-height: 1.1;
        font-weight: 800;
        color: var(--text-main);
        margin-bottom: 1.5rem;
        letter-spacing: -0.03em;
      }

      .hero-title span {
        background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--primary) 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradient-text 5s ease infinite;
      }

      .hero-desc {
        font-size: 1.25rem;
        color: var(--text-muted);
        line-height: 1.7;
        margin-bottom: 2.5rem;
        max-width: 90%;
      }

      .hero-actions {
        display: flex;
        gap: 1rem;
      }

      .btn-hero-primary {
        padding: 1rem 2.5rem;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: 700;
        color: white;
        background: var(--primary);
        text-decoration: none;
        transition: all 0.3s;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
      }

      .btn-hero-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 20px 30px -5px rgba(0, 0, 0, 0.4);
        background: var(--primary-dark);
      }

      .btn-hero-secondary {
        padding: 1rem 2.5rem;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--text-main);
        background: white;
        border: 1px solid var(--border);
        text-decoration: none;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      }

      .btn-hero-secondary:hover {
        border-color: var(--text-muted);
        transform: translateY(-3px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }

      .hero-image-wrapper {
        position: relative;
        animation: reveal 1s ease-out 0.2s backwards;
        pointer-events: none;
      }

      /* Unique Animation Styles */
      .anim-container {
        position: relative;
        width: 400px;
        height: 400px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .circle {
        position: absolute;
        border-radius: 50%;
        border: 1px solid rgba(0,0,0,0.05);
        box-shadow: 0 0 15px rgba(0,0,0,0.02);
        pointer-events: none;
      }

      .c1 { width: 100%; height: 100%; animation: spin 30s linear infinite; border-color: rgba(0,0,0,0.08); }
      .c2 { width: 70%; height: 70%; animation: spin 20s linear infinite reverse; border-color: rgba(0,0,0,0.12); }
      .c3 { width: 40%; height: 40%; animation: spin 10s linear infinite; border-color: rgba(0,0,0,0.15); }

      .dot {
        position: absolute;
        top: -6px;
        left: 50%;
        width: 12px;
        height: 12px;
        background: var(--text-main);
        border-radius: 50%;
        transform: translateX(-50%);
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
      }

      .center-logo {
        width: 80px;
        height: 80px;
        background: var(--text-main);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        color: white;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        animation: pulse-core 3s ease-in-out infinite;
        z-index: 10;
      }

      @keyframes spin {
        100% { transform: rotate(360deg); }
      }

      @keyframes pulse-core {
        0%, 100% { transform: scale(1); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(0,0,0,0.3); }
      }

      /* --- Stats Section --- */
      .stats-section {
        background: white;
        padding: 4rem 0;
        border-bottom: 1px solid var(--border);
      }

      .stats-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
      }

      .stat-card {
        text-align: center;
        padding: 2rem;
        border-radius: 20px;
        background: var(--surface);
        transition: transform 0.3s;
        border: 1px solid transparent;
      }

      .stat-card:hover {
        transform: translateY(-5px);
        background: white;
        border-color: var(--border);
        box-shadow: 0 10px 20px -5px rgba(0,0,0,0.05);
      }

      .stat-number {
        font-size: 2.5rem;
        font-weight: 800;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.5rem;
      }

      .stat-label {
        font-weight: 600;
        color: var(--text-muted);
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 1px;
      }

      /* --- Features Section --- */
      .features-section {
        padding: 10rem 0;
        background: var(--surface);
        position: relative;
      }

      .section-head {
        text-align: center;
        max-width: 700px;
        margin: 0 auto 5rem;
      }

      .section-badge {
        color: var(--primary);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 0.875rem;
        margin-bottom: 1rem;
        display: block;
      }

      .section-title {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--text-main);
        margin-bottom: 1.5rem;
        letter-spacing: -0.02em;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2.5rem;
      }

      .feature-box {
        background: white;
        padding: 3rem 2rem;
        border-radius: 24px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid var(--border);
        position: relative;
        overflow: hidden;
        z-index: 1;
      }

      .feature-box:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
        border-color: var(--primary);
      }

      .feature-icon {
        width: 60px;
        height: 60px;
        background: #f4f4f5;
        color: var(--primary);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.75rem;
        margin-bottom: 1.5rem;
        transition: all 0.4s;
      }

      .feature-box:hover .feature-icon {
        background: var(--primary);
        color: white;
        transform: rotate(10deg) scale(1.1);
      }

      .feature-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: var(--text-main);
      }

      .feature-text {
        color: var(--text-muted);
        line-height: 1.6;
      }

      /* --- Process Section --- */
      .process-section {
        padding: 10rem 0;
        background: white;
        position: relative;
      }

      .process-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 4rem;
        margin-top: 4rem;
        position: relative;
      }

      .process-step {
        position: relative;
        padding: 2rem;
        transition: all 0.3s ease;
        border-radius: 24px;
      }

      .process-step:hover {
        background: var(--surface);
        transform: translateY(-10px);
      }

      .step-number {
        font-size: 6rem;
        font-weight: 800;
        color: var(--surface);
        position: absolute;
        top: -2.5rem;
        left: 0;
        z-index: 0;
        line-height: 1;
        -webkit-text-stroke: 1px var(--border);
        opacity: 1;
        transition: all 0.3s ease;
      }

      .process-step:hover .step-number {
        transform: scale(1.05);
        -webkit-text-stroke-color: var(--accent);
      }

      .step-content {
        position: relative;
        z-index: 1;
      }

      .step-title {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--text-main);
        margin-bottom: 1rem;
      }

      .step-desc {
        color: var(--text-muted);
        line-height: 1.6;
      }

      /* --- FAQ Section --- */
      .faq-section {
        padding: 10rem 0;
        background: var(--surface);
      }

      .faq-container {
        max-width: 800px;
        margin: 0 auto;
      }

      details {
        background: white;
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        border: 1px solid var(--border);
        transition: all 0.3s ease;
        cursor: pointer;
      }

      details:hover { border-color: var(--primary); transform: translateY(-2px); }
      details[open] { border-color: var(--primary); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }

      summary {
        font-weight: 700;
        color: var(--text-main);
        font-size: 1.1rem;
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      summary::-webkit-details-marker { display: none; }
      summary::after { content: '+'; font-size: 1.5rem; color: var(--primary); transition: transform 0.3s; }
      details[open] summary::after { transform: rotate(45deg); }
      
      .faq-answer {
        margin-top: 1rem;
        color: var(--text-muted);
        line-height: 1.6;
        animation: reveal 0.3s ease-out;
      }

      /* --- CTA --- */
      .cta-section {
        padding: 8rem 0;
      }

      .cta-inner {
        background: linear-gradient(135deg, #000000 0%, #333333 100%);
        border-radius: 32px;
        padding: 5rem 2rem;
        text-align: center;
        color: white;
        position: relative;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      }

      .cta-inner::after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }

      .cta-title {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        position: relative;
        z-index: 1;
      }

      .cta-text {
        font-size: 1.25rem;
        opacity: 0.9;
        margin-bottom: 3rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        z-index: 1;
      }

      .btn-cta {
        background: white;
        color: var(--primary);
        padding: 1.2rem 3rem;
        border-radius: 50px;
        font-weight: 700;
        font-size: 1.1rem;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s;
        position: relative;
        z-index: 1;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      }

      .btn-cta:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 20px 30px rgba(0,0,0,0.2);
      }

      /* --- Footer --- */
      .footer {
        background: #000000;
        color: #ffffff;
        padding: 6rem 0 2rem;
        position: relative;
        border-top: 1px solid #333;
      }

      .footer-grid {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
        gap: 4rem;
        margin-bottom: 4rem;
      }

      .footer-brand h4 {
        color: white;
        font-size: 1.5rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .footer-desc {
        line-height: 1.6;
        max-width: 300px;
        margin-bottom: 2rem;
      }

      .footer-col h5 {
        color: white;
        font-weight: 700;
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
      }

      .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .footer-links li { margin-bottom: 0.8rem; }

      .footer-links a {
        color: #ffffff;
        text-decoration: none;
        transition: color 0.2s;
        display: inline-block;
        position: relative;
      }

      .footer-links a::after {
        content: '';
        position: absolute;
        width: 0;
        height: 1px;
        bottom: -2px;
        left: 0;
        background-color: white;
        transition: width 0.3s;
      }

      .footer-links a:hover {
        color: white;
        padding-left: 5px;
      }

      .footer-links a:hover::after {
        width: 100%;
      }

      .social-links {
        display: flex;
        gap: 1rem;
      }

      .social-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #333;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-decoration: none;
        transition: all 0.3s;
        background: transparent;
      }

      .social-icon svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }

      .social-icon:hover {
        background: white;
        color: black;
        border-color: white;
        transform: translateY(-5px);
        box-shadow: 0 0 20px rgba(255,255,255,0.4);
      }

      .newsletter-form {
        margin-top: 1.5rem;
        position: relative;
      }

      .newsletter-input {
        width: 100%;
        padding: 1rem 1.5rem;
        padding-right: 4rem;
        border-radius: 50px;
        border: 1px solid #333;
        background: #111;
        color: white;
        outline: none;
        transition: all 0.3s;
      }

      .newsletter-input:focus {
        border-color: white;
        background: #000;
      }

      .btn-newsletter {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: white;
        color: black;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
      }

      .btn-newsletter:hover {
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(255,255,255,0.3);
      }

      .footer-bottom {
        border-top: 1px solid #333;
        padding-top: 2rem;
        font-size: 0.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #71717a;
      }

      /* Back to Top Button */
      .back-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--text-main);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 999;
        transition: all 0.3s ease;
        font-size: 1.5rem;
        
        /* Scroll Animation */
        opacity: 0;
        pointer-events: none;
        transform: translateY(20px);
        animation: appear-scroll linear forwards;
        animation-timeline: scroll();
        animation-range: 0vh 30vh;
      }

      .back-to-top:hover {
        background: var(--primary);
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
      }

      @keyframes appear-scroll {
        to { opacity: 1; pointer-events: auto; transform: translateY(0); }
      }

      /* Responsive */
      @media (max-width: 1024px) {
        .hero-grid { grid-template-columns: 1fr; text-align: center; }
        .hero-desc { margin-left: auto; margin-right: auto; }
        .hero-btns { justify-content: center; }
        .hero-image-wrapper { margin-top: 4rem; }
        .stats-container { grid-template-columns: repeat(2, 1fr); }
      }

      @media (max-width: 768px) {
        .hero-title { font-size: 3rem; }
        .nav-links { display: none; }
        .stats-container { grid-template-columns: 1fr; }
        .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
        .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
      }
    `
  ]
})
export class HomeComponent {}
