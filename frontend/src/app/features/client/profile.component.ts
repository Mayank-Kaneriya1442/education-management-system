import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="row justify-content-center">
      <div class="col-lg-9">
        <div class="card shadow-sm border-0 overflow-hidden">
          <div class="card-header bg-white border-0 p-4">
            <div class="d-flex align-items-center gap-3">
              <div class="avatar-circle">{{ getInitials() }}</div>
              <div>
                <div class="d-flex align-items-center gap-2">
                  <h3 class="mb-0">{{ form.get('name')?.value || 'User' }}</h3>
                  <span class="badge rounded-pill text-bg-light text-uppercase">{{ form.get('role')?.value || 'student' }}</span>
                </div>
                <div class="text-secondary small">{{ form.get('email')?.value }}</div>
              </div>
            </div>
          </div>

          <div class="card-body p-4">
            <div class="alert alert-success" *ngIf="success()">{{ success() }}</div>
            <div class="alert alert-danger" *ngIf="error()">{{ error() }}</div>

            <form [formGroup]="form" (ngSubmit)="update()">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Full Name</label>
                  <input class="form-control" formControlName="name" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Phone</label>
                  <input class="form-control" formControlName="phone" placeholder="Enter phone number" />
                </div>
                <div class="col-12">
                  <label class="form-label">Email Address</label>
                  <input class="form-control" formControlName="email" [disabled]="true" />
                  <div class="form-text">Email cannot be changed.</div>
                </div>
              </div>

              <div class="d-flex justify-content-end mt-4">
                <button class="btn btn-dark px-4" [disabled]="form.invalid || loading()">
                  {{ loading() ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .avatar-circle {
        width: 80px;
        height: 80px;
        background: #111;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
      }
    `
  ]
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  loading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: [{value: '', disabled: true}],
    phone: [''],
    role: [{value: '', disabled: true}]
  });

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.loading.set(true);
    this.auth.profile().subscribe({
      next: (user: any) => {
        this.form.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone ?? '',
          role: user.role
        });
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load profile.');
        this.loading.set(false);
      }
    });
  }

  update() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    this.success.set(null);

    this.auth.updateProfile({ name: this.form.get('name')?.value ?? undefined, phone: this.form.get('phone')?.value ?? undefined }).subscribe({
      next: () => {
        this.success.set('Profile updated successfully.');
        this.loading.set(false);
      },
      error: (e: any) => {
        this.error.set(e?.error?.message ?? 'Failed to update profile.');
        this.loading.set(false);
      }
    });
  }

  getInitials(): string {
    const name = this.form.get('name')?.value || '';
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}