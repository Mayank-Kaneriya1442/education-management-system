import { Component, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminUserService } from '../../core/services/admin-user.service';
import { User } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div class="header-content">
          <h1><span style="margin-right: 12px">👨‍🏫</span>Teacher/Faculty Management</h1>
          <p>Create and manage instructor accounts.</p>
        </div>
        <div class="header-actions">
          <a routerLink="/admin" class="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <span>Dashboard</span>
          </a>
          <button class="btn btn-secondary" (click)="load()">Refresh</button>
        </div>
      </header>

      <div class="management-grid">
        <!-- Form Card -->
        <div class="form-card">
          <h3 class="form-title">Add Instructor</h3>
          <form [formGroup]="form" (ngSubmit)="create()">
            <div class="alert alert-danger" *ngIf="formError()">{{ formError() }}</div>

            <div class="form-group">
              <label class="form-label">Name</label>
              <input class="form-control" formControlName="name" />
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input class="form-control" formControlName="email" type="email" />
            </div>
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input class="form-control" formControlName="phone" />
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input class="form-control" formControlName="password" type="password" />
            </div>

            <div class="form-actions">
              <button class="btn btn-primary" [disabled]="form.invalid || formLoading()">Create Instructor</button>
            </div>
          </form>
        </div>

        <!-- List Card -->
        <div class="list-card">
          <div class="alert alert-danger" *ngIf="error()">{{ error() }}</div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th class="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let u of users()">
                  <td class="font-semibold">{{ u.name }}</td>
                  <td>{{ u.email }}</td>
                  <td>{{ u.phone || '—' }}</td>
                  <td>
                    <span class="badge" [class.badge-success]="u.isActive" [class.badge-secondary]="!u.isActive">
                      {{ u.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td class="text-right">
                    <div class="action-buttons">
                      <button class="btn btn-icon" (click)="toggleActive(u)">
                        {{ u.isActive ? 'Deactivate' : 'Activate' }}
                      </button>
                      <button class="btn btn-icon btn-danger" (click)="remove(u)">Delete</button>
                    </div>
                  </td>
                </tr>
                <tr *ngIf="users().length === 0">
                  <td colspan="5" class="empty-state">No instructors found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
        min-height: 100vh;
      }

      .page-container {
        max-width: 1600px;
        margin: 0 auto;
        padding: 2rem;
      }

      /* Header */
      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2.5rem;
      }

      .page-header h1 {
        font-size: 2rem;
        font-weight: 800;
        color: var(--text-main);
        display: flex;
        align-items: center;
        margin: 0;
      }

      .page-header p {
        color: var(--text-muted);
        margin-top: 0.25rem;
      }

      .header-actions {
        display: flex;
        gap: 0.75rem;
      }

      /* Grid Layout */
      .management-grid {
        display: grid;
        grid-template-columns: 400px 1fr;
        gap: 2rem;
        align-items: flex-start;
      }

      /* Cards */
      .form-card,
      .list-card {
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: 16px;
        overflow: hidden;
      }

      .form-card {
        padding: 1.5rem;
      }

      .form-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
      }

      /* Form Styles */
      .form-group {
        margin-bottom: 1rem;
      }
      .form-label {
        display: block;
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--text-muted);
        margin-bottom: 0.5rem;
      }
      .form-control {
        width: 100%;
        padding: 0.75rem 1rem;
        border-radius: 10px;
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text-main);
        font-size: 1rem;
        transition: all 0.2s;
      }
      .form-control:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
        background: white;
      }
      .form-actions {
        margin-top: 1.5rem;
      }

      /* Table Styles */
      .table-wrapper {
        overflow-x: auto;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.95rem;
      }
      th,
      td {
        padding: 1rem 1.5rem;
        text-align: left;
        border-bottom: 1px solid var(--border);
      }
      th {
        font-weight: 600;
        color: var(--text-muted);
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      tbody tr:last-child td {
        border-bottom: none;
      }
      .font-semibold {
        font-weight: 600;
        color: var(--text-main);
      }
      .text-right {
        text-align: right;
      }
      .action-buttons {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }
      .empty-state {
        text-align: center;
        padding: 3rem;
        color: var(--text-muted);
      }

      /* Components */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.65rem 1.25rem;
        border-radius: 10px;
        font-weight: 600;
        font-size: 0.9rem;
        border: 1px solid var(--border);
        background: var(--background);
        color: var(--text-main);
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
        width: 100%;
      }
      .header-actions .btn {
        width: auto;
      }
      .btn:hover {
        background: var(--surface);
      }
      .btn-primary {
        background: var(--primary);
        color: var(--background);
        border-color: var(--primary);
      }
      .btn-primary:hover {
        background: var(--primary-dark);
        border-color: var(--primary-dark);
      }
      .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .btn-icon {
        width: auto;
        padding: 0.5rem 0.75rem;
      }
      .btn-danger {
        color: #dc3545;
      }
      .btn-danger:hover {
        background: #fee2e2;
        border-color: #fecaca;
      }

      .badge {
        padding: 0.25em 0.6em;
        font-size: 0.75rem;
        font-weight: 600;
        border-radius: 6px;
      }
      .badge-success {
        background-color: #dcfce7;
        color: #166534;
      }
      .badge-secondary {
        background-color: #f1f1f1;
        color: #555;
      }

      .alert-danger {
        padding: 1rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        font-size: 0.95rem;
        font-weight: 500;
        background: #fee2e2;
        color: #991b1b;
        border: 1px solid #fecaca;
      }
      .list-card .alert-danger {
        margin: 1.5rem;
      }

      /* Responsive */
      @media (max-width: 1200px) {
        .management-grid {
          grid-template-columns: 1fr;
        }
      }
      @media (max-width: 768px) {
        .page-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }
      }
    `
  ]
})
export class TeacherManagementComponent {
  private api = inject(AdminUserService);
  private fb = inject(FormBuilder);

  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  formLoading = signal(false);
  formError = signal<string | null>(null);
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.api.list('instructor').subscribe({
      next: (r) => {
        this.users.set(r.users);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set(e?.error?.message ?? 'Failed to load instructors');
        this.loading.set(false);
      }
    });
  }

  create() {
    if (this.form.invalid) return;
    this.formLoading.set(true);
    this.formError.set(null);
    const v = this.form.getRawValue();
    this.api
      .create({ name: v.name!, email: v.email!, phone: v.phone ?? '', password: v.password!, role: 'instructor' })
      .subscribe({
        next: () => {
          this.formLoading.set(false);
          this.form.reset({ name: '', email: '', phone: '', password: '' });
          this.load();
        },
        error: (e) => {
          this.formLoading.set(false);
          this.formError.set(e?.error?.message ?? 'Failed to create instructor');
        }
      });
  }

  toggleActive(u: User) {
    this.api.update(u._id!, { isActive: !u.isActive } as any).subscribe({
      next: () => this.load(),
      error: (e) => this.error.set(e?.error?.message ?? 'Failed to update status')
    });
  }

  remove(u: User) {
    if (!confirm('Delete this instructor?')) return;
    this.api.delete(u._id!).subscribe({
      next: () => this.load(),
      error: (e) => this.error.set(e?.error?.message ?? 'Failed to delete user')
    });
  }
}
