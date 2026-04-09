import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="page-wrapper">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>

      <section class="content-section">
        <div class="container">
          <div class="section-head reveal-on-scroll">
            <span class="section-badge">Get In Touch</span>
            <h2 class="section-title">Contact Us</h2>
            <div class="header-subline">
              <p>Have questions or feedback? We'd love to hear from you. Send us a message below.</p>
            </div>
          </div>

          <div class="contact-card reveal-on-scroll">
            <div class="alert alert-success" *ngIf="success()">Message sent successfully!</div>
            <div class="alert alert-danger" *ngIf="error()">{{ error() }}</div>

            <form [formGroup]="form" (ngSubmit)="submit()">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Name</label>
                  <input class="form-control" formControlName="name" placeholder="Your full name" />
                </div>
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input class="form-control" formControlName="email" type="email" placeholder="name@example.com" />
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Subject</label>
                  <input class="form-control" formControlName="subject" placeholder="What is this regarding?" />
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Message</label>
                  <textarea class="form-control" rows="6" formControlName="message" placeholder="Type your message here..."></textarea>
                  <small *ngIf="form.get('message')?.invalid && form.get('message')?.touched" style="color: #ef4444;">
                    Please enter at least 3 characters.
                  </small>
                </div>
              </div>

              <div class="form-actions">
                <button class="btn-submit" type="submit" [disabled]="form.invalid || loading()">
                  {{ loading() ? 'Sending...' : 'Send Message' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      /* Existing styles remain the same */
      :host { display: block; font-family: 'Plus Jakarta Sans', sans-serif; --primary: #000000; --surface: #fafafa; --text-main: #09090b; --text-muted: #71717a; --border: #e4e4e7; }
      .page-wrapper { width: 100%; min-height: 100vh; position: relative; overflow-x: hidden; background-color: var(--surface); }
      .container { max-width: 1000px; margin: 0 auto; padding: 0 1.5rem; }
      .contact-card { background: white; border-radius: 24px; border: 1px solid var(--border); padding: 3rem; margin: 0 auto; max-width: 800px; z-index: 1; position: relative;}
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
      .full-width { grid-column: 1 / -1; }
      .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
      .form-label { font-weight: 600; font-size: 0.9rem; color: var(--text-muted); }
      .form-control { width: 100%; padding: 0.85rem 1rem; border-radius: 12px; border: 1px solid var(--border); background: var(--surface); transition: 0.2s; }
      .btn-submit { padding: 0.85rem 2.5rem; border-radius: 50px; font-weight: 600; color: white; background: var(--text-main); border: none; cursor: pointer; }
      .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
      .alert { padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; }
      .alert-success { background: #dcfce7; color: #166534; }
      .alert-danger { background: #fee2e2; color: #991b1b; }
    `
  ]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private api = inject(ContactService);

  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(3)]] // Fixed here
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.api.send(this.form.getRawValue() as any).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        this.form.reset();
      },
      error: (e) => {
        this.loading.set(false);
        this.error.set(e?.error?.message ?? 'Failed to send message');
      }
    });
  }
}