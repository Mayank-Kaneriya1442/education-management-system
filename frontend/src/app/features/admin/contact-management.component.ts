import { Component, inject, signal } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactService, ContactMessage } from '../../core/services/contact.service';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterLink],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div class="header-content">
          <h1><span style="margin-right: 12px">💬</span>Contact Messages</h1>
          <p>View and update contact us submissions.</p>
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

      <div class="list-card">
        <div class="alert alert-danger" *ngIf="error()">{{ error() }}</div>
        <div class="table-wrapper" *ngIf="!loading(); else loadingTpl">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let m of messages()">
                <td class="font-semibold">{{ m.name }}</td>
                <td>{{ m.email }}</td>
                <td>{{ m.subject || '—' }}</td>
                <td>
                  <span class="badge" [class]="badgeClass(m.status)">{{ m.status }}</span>
                </td>
                <td>{{ m.createdAt | date : 'mediumDate' }}</td>
                <td class="text-right">
                  <div class="action-buttons">
                    <button class="btn btn-icon" (click)="setStatus(m, 'read')">Mark Read</button>
                    <button class="btn btn-icon btn-success" (click)="setStatus(m, 'closed')">Close</button>
                    <button class="btn btn-icon btn-danger" (click)="remove(m)">Delete</button>
                  </div>
                </td>
              </tr>
              <tr *ngIf="messages().length === 0">
                <td colspan="6" class="empty-state">No messages found.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ng-template #loadingTpl>
          <div class="loading-state">Loading messages...</div>
        </ng-template>
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

      /* Card */
      .list-card {
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: 16px;
        overflow: hidden;
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
      .text-muted {
        color: var(--text-muted);
      }
      .text-right {
        text-align: right;
      }
      .action-buttons {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }
      .empty-state,
      .loading-state {
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
        padding: 0.5rem 0.75rem;
      }
      .btn-danger {
        color: #dc3545;
      }
      .btn-danger:hover {
        background: #fee2e2;
        border-color: #fecaca;
      }
      .btn-success {
        color: #198754;
      }
      .btn-success:hover {
        background: #d1e7dd;
        border-color: #badbcc;
      }

      .badge {
        padding: 0.25em 0.6em;
        font-size: 0.75rem;
        font-weight: 600;
        border-radius: 6px;
        text-transform: capitalize;
      }
      .badge-primary {
        background-color: #cfe2ff;
        color: #0a58ca;
      }
      .badge-success {
        background-color: #d1e7dd;
        color: #0f5132;
      }
      .badge-secondary {
        background-color: #f8f9fa;
        color: #495057;
        border: 1px solid #dee2e6;
      }

      .alert-danger {
        padding: 1rem;
        border-radius: 12px;
        margin: 1.5rem;
        font-size: 0.95rem;
        font-weight: 500;
        background: #fee2e2;
        color: #991b1b;
        border: 1px solid #fecaca;
      }

      /* Responsive */
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
export class ContactManagementComponent {
  private api = inject(ContactService);

  loading = signal(true);
  error = signal<string | null>(null);
  messages = signal<ContactMessage[]>([]);

  constructor() {
    this.load();
  }

  badgeClass(status: string) {
    if (status === 'new') return 'badge-primary';
    if (status === 'read') return 'badge-secondary';
    return 'badge-success';
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.api.adminList().subscribe({
      next: (r) => {
        this.messages.set(r.messages);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set(e?.error?.message ?? 'Failed to load messages');
        this.loading.set(false);
      }
    });
  }

  setStatus(m: ContactMessage, status: 'new' | 'read' | 'closed') {
    this.api.adminSetStatus(m._id, status).subscribe({
      next: () => this.load(),
      error: (e) => this.error.set(e?.error?.message ?? 'Failed to update status')
    });
  }

  remove(m: ContactMessage) {
    if (!confirm('Delete this message?')) return;
    this.api.adminDelete(m._id).subscribe({
      next: () => this.load(),
      error: (e) => this.error.set(e?.error?.message ?? 'Failed to delete message')
    });
  }
}
