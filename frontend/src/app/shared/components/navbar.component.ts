import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, UpperCasePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { LogoComponent } from './logo.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, UpperCasePipe, LogoComponent],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark navbar-glass" *ngIf="!isAdminArea()">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center gap-2" routerLink="/">
          <app-logo class="small"></app-logo>
          <span class="fw-bold tracking-tight">Lumina</span>
        </a>

        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMain"
          aria-controls="navMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navMain">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/courses" routerLinkActive="active">Courses</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/blog" routerLinkActive="active">Blog</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/about" routerLinkActive="active">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/contact" routerLinkActive="active">Contact</a>
            </li>
          </ul>

          <div class="d-flex align-items-center gap-3">
            <ng-container *ngIf="!auth.isLoggedIn()">
              <a routerLink="/login" class="btn btn-sm btn-link text-white text-decoration-none">Login</a>
              <a routerLink="/register" class="btn btn-sm btn-white">Get Started</a>
            </ng-container>

            <div class="dropdown" *ngIf="auth.user() as u">
              <button
                class="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center gap-2 user-btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div class="avatar">{{ u.name.charAt(0) | uppercase }}</div>
                <span class="d-none d-lg-inline">{{ u.name }}</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark glass-dropdown shadow border-0 mt-2">
                <li><h6 class="dropdown-header text-white-50">Signed in as<br><span class="text-white">{{ u.email }}</span></h6></li>
                <li><hr class="dropdown-divider border-white border-opacity-10"></li>

                <li><a class="dropdown-item" routerLink="/profile">👤 My Profile</a></li>
                <li *ngIf="isStudent()"><a class="dropdown-item" routerLink="/my-courses">🎓 My Learning</a></li>
                <li *ngIf="isAdmin()"><a class="dropdown-item" routerLink="/admin">⚡ Admin Portal</a></li>

                <li><hr class="dropdown-divider border-white border-opacity-10"></li>
                <li><button class="dropdown-item text-danger" (click)="logout()">Log Out</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    /* Sticky Glass Navbar */
    .navbar-glass {
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      position: sticky;
      top: 0;
      z-index: 1030;
      transition: background 0.3s ease;
    }

    /* Brand */
    .navbar-brand {
      font-size: 1.25rem;
      letter-spacing: -0.5px;
    }

    /* Links Animation */
    .nav-link {
      color: rgba(255, 255, 255, 0.7) !important;
      font-weight: 500;
      font-size: 0.95rem;
      position: relative;
      padding: 0.5rem 0;
      transition: color 0.3s;
    }
    .nav-link:hover, .nav-link.active {
      color: #fff !important;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 50%;
      background-color: #fff;
      transition: width 0.3s ease, left 0.3s ease;
      transform: translateX(-50%);
    }
    .nav-link:hover::after, .nav-link.active::after {
      width: 100%;
    }

    /* Buttons */
    .btn-white {
      background: #fff;
      color: #000;
      border: 1px solid #fff;
      border-radius: 50px;
      font-weight: 600;
      padding: 0.375rem 1rem;
      transition: transform 0.2s;
    }
    .btn-white:hover {
      transform: scale(1.05);
      background: #eee;
      border-color: #eee;
    }

    /* User Avatar */
    .user-btn {
      border-radius: 50px;
      padding: 0.25rem 0.75rem 0.25rem 0.25rem;
      border-color: rgba(255,255,255,0.2);
    }
    .user-btn:hover {
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.4);
    }
    .avatar {
      width: 28px;
      height: 28px;
      background: #fff;
      color: #000;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 0.8rem;
    }

    /* Glass Dropdown */
    .glass-dropdown {
      background: rgba(20, 20, 20, 0.9);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      overflow: hidden;
      animation: slideDown 0.2s ease-out;
    }
    .dropdown-item {
      color: rgba(255,255,255,0.8);
      padding: 0.5rem 1rem;
      transition: all 0.2s;
    }
    .dropdown-item:hover {
      background: rgba(255,255,255,0.1);
      color: #fff;
      padding-left: 1.25rem;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class NavbarComponent {
  auth = inject(AuthService);
  private router = inject(Router);
  private url = signal(this.router.url);

  isAdmin = computed(() => this.auth.role() === 'admin');
  // isInstructor = computed(() => this.auth.role() === 'instructor');
  isStudent = computed(() => this.auth.role() === 'student');
  isAdminArea = computed(() => this.url().startsWith('/admin'));

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.url.set(this.router.url));
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
