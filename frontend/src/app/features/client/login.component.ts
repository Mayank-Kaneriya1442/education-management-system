import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  template: `
    <div class="page-wrapper">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>

      <section class="content-section">
        <div class="container">
          <div class="auth-card reveal-on-scroll">
            <div class="auth-header">
              <h2 class="auth-title">Welcome Back</h2>
              <p class="auth-subtitle">Access your account to continue your journey.</p>
            </div>

            <div class="alert alert-danger" *ngIf="error()">{{ error() }}</div>

            <form [formGroup]="form" (ngSubmit)="submit()">
              <div class="form-group">
                <label class="form-label">Email</label>
                <input class="form-control" formControlName="email" type="email" placeholder="name@example.com" />
              </div>
              <div class="form-group">
                <label class="form-label">Password</label>
                <input class="form-control" formControlName="password" type="password" placeholder="••••••••" />
              </div>
              <div class="form-actions">
                <button class="btn-submit" [disabled]="form.invalid || loading()">
                  {{ loading() ? 'Logging in...' : 'Log In' }}
                </button>
              </div>
            </form>

            <div class="auth-footer">
              <a routerLink="/register">Create new account</a>
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
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4rem 0;
      }

      .container { width: 100%; max-width: 450px; padding: 1.5rem; }

      /* --- Animations & Blobs --- */
      .blob { position: absolute; filter: blur(80px); z-index: 0; opacity: 1; animation: move-blob 10s infinite alternate; pointer-events: none; border-radius: 50%; }
      .blob-1 { top: -10%; left: -10%; width: 500px; height: 500px; background: var(--blob-color-1); }
      .blob-2 { bottom: 10%; right: -5%; width: 400px; height: 400px; background: var(--blob-color-2); animation-duration: 15s; animation-direction: alternate-reverse; }

      @keyframes move-blob {
        0% { transform: translate(0, 0) scale(1); }
        100% { transform: translate(20px, -20px) scale(1.1); }
      }
      @keyframes reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .reveal-on-scroll { animation: reveal 0.6s ease-out forwards; }

      /* --- Auth Card --- */
      .auth-card {
        background: white; border-radius: 24px; border: 1px solid var(--border);
        padding: 2.5rem; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05); width: 100%;
        position: relative; z-index: 1;
      }

      .auth-header { text-align: center; margin-bottom: 2rem; }
      .auth-title { font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; }
      .auth-subtitle { color: var(--text-muted); font-size: 1rem; }

      .form-group { margin-bottom: 1.5rem; }
      .form-label { display: block; font-weight: 600; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.5rem; }
      
      .form-control {
        width: 100%; padding: 0.85rem 1rem; border-radius: 12px; border: 1px solid var(--border);
        background: var(--surface); color: var(--text-main); font-size: 1rem; transition: all 0.2s; font-family: inherit;
      }
      .form-control:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(0,0,0,0.05); background: white; }

      .form-actions { margin-top: 2rem; }

      .btn-submit {
        display: flex; width: 100%; align-items: center; justify-content: center;
        padding: 0.85rem 1.5rem; border-radius: 12px; font-weight: 600; font-size: 1rem;
        color: white; background: var(--text-main); border: none; cursor: pointer; transition: all 0.3s;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      }
      .btn-submit:hover {
        transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        background: var(--primary-dark);
      }
      .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

      .auth-footer { margin-top: 1.5rem; text-align: center; font-size: 0.9rem; }
      .auth-footer a { color: var(--text-muted); font-weight: 600; text-decoration: none; transition: color 0.2s; }
      .auth-footer a:hover { color: var(--text-main); text-decoration: underline; }

      /* Alerts */
      .alert { padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; font-size: 0.95rem; font-weight: 500; }
      .alert-danger { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }

      @media (max-width: 480px) {
        .container { padding: 1rem; }
        .auth-card { padding: 1.5rem; }
      }
    `
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  submit() {
    if (this.form.invalid) return;
    this.error.set(null);
    this.loading.set(true);
    this.auth.login(this.form.getRawValue() as any).subscribe({
      next: () => {
        this.loading.set(false);
        const role = this.auth.role();
        if (role === 'admin') return this.router.navigateByUrl('/admin');
        if (role === 'instructor') return this.router.navigateByUrl('/instructor/my-courses');
        return this.router.navigateByUrl('/');
      },
      error: (e: any) => {
        this.loading.set(false);
        this.error.set(e?.error?.message ?? 'Login failed');
      }
    });
  }
}
