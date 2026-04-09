import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <div class="logo-wrapper">
      <div class="logo-box">
        <div class="logo-inner"></div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
      .logo-wrapper {
        display: inline-block;
      }
      .logo-box {
        width: 50px; height: 50px;
        background: #fff;
        transform: rotate(45deg);
        display: flex; align-items: center; justify-content: center;
        animation: floatLogo 6s ease-in-out infinite;
        box-shadow: 0 0 20px rgba(255,255,255,0.2);
      }
      .logo-inner {
        width: 20px; height: 20px;
        background: #000;
        border-radius: 2px;
      }
      @keyframes floatLogo {
        0%, 100% { transform: rotate(45deg) translateY(0); box-shadow: 0 0 20px rgba(255,255,255,0.2); }
        50% { transform: rotate(45deg) translateY(-10px); box-shadow: 0 10px 30px rgba(255,255,255,0.4); }
      }

      /* Scale down slightly for smaller screens or dense layouts */
      @media (max-height: 800px) {
        .logo-box { width: 40px; height: 40px; }
        .logo-inner { width: 15px; height: 15px; }
      }
      
      /* Helper to use a smaller logo in Navbar if needed via class */
      :host(.small) .logo-box { width: 35px; height: 35px; }
      :host(.small) .logo-inner { width: 14px; height: 14px; }
    `
  ]
})
export class LogoComponent {}