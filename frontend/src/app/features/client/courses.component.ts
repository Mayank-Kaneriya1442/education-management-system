import { Component, inject, signal } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService, Course } from '../../core/services/course.service';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, RouterLink, FormsModule],
  template: `
    <div class="courses-page-wrapper">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>

      <section class="courses-section">
        <div class="container">
          <div class="section-head reveal-on-scroll">
            <span class="section-badge">All Courses</span>
            <h2 class="section-title">Find Your Next Course</h2>
            <div class="header-subline">
              <p>Browse our curated list of courses and start learning today.</p>
              <a class="btn-my-courses" routerLink="/my-courses" *ngIf="auth.role() === 'student'">My Courses</a>
            </div>
          </div>

          <div class="alert alert-danger" *ngIf="error()">{{ error() }}</div>

          <div class="courses-grid" *ngIf="!loading(); else loadingTpl">
            <div class="course-card reveal-on-scroll" *ngFor="let c of courses()">
              
                <div class="instructor-badge">By {{ instructorName(c) }}</div>
              
              <div class="card-content">
                <h3 class="course-title">{{ c.title }}</h3>
                <p class="course-description">{{ c.description }}</p>
                <div class="course-footer">
                  <span class="course-price">{{ c.price > 0 ? (c.price | currency : 'INR' : 'symbol' : '1.0-0') : 'Free' }}</span>
                  <button class="btn-enroll" *ngIf="auth.role() === 'student'" (click)="openPayment(c)">Enroll</button>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="!loading() && courses().length === 0" class="text-center text-secondary py-5 reveal-on-scroll">
            No courses available at the moment.
          </div>

          <ng-template #loadingTpl>
            <div class="text-secondary text-center py-5">Loading courses...</div>
          </ng-template>
        </div>
      </section>

      <!-- Styled payment modal -->
      <div class="payment-modal-backdrop" *ngIf="paymentCourse() as pc">
        <div class="payment-modal" role="dialog">
          <div class="modal-header">
            <h5 class="modal-title">Course Payment</h5>
            <button type="button" class="btn-close" (click)="closePayment()">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          <div class="modal-body">
            <p class="course-title-modal">
              <strong>{{ pc.title }}</strong>
            </p>
            <p class="course-price-modal">
              Amount:
              <span>{{ pc.price | currency : 'INR' : 'symbol' : '1.0-0' }}</span>
            </p>
            <div class="form-group">
              <label class="form-label">Payment Method</label>
              <select class="form-select" [(ngModel)]="paymentMethod">
                <option value="card">Credit / Debit Card</option>
                <option value="upi">UPI</option>
                <option value="netbanking">Net Banking</option>
              </select>
            </div>
            <div class="form-group" *ngIf="paymentMethod === 'card'">
              <label class="form-label">Card Number</label>
              <input type="text" class="form-control" placeholder="1111 2222 3333 4444" />
            </div>
            <div class="form-group" *ngIf="paymentMethod === 'upi'">
              <label class="form-label">UPI ID</label>
              <input type="text" class="form-control" placeholder="name@upi" />
            </div>
            <div class="form-group" *ngIf="paymentMethod === 'netbanking'">
              <label class="form-label">Bank</label>
              <input type="text" class="form-control" placeholder="Bank name" />
            </div>
            <p class="demo-notice">
              This is a demo payment. No real transaction is processed. After clicking
              <strong>Pay &amp; Enroll</strong>, you will be enrolled in the course.
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-modal-secondary" (click)="closePayment()">Close</button>
            <button
              type="button"
              class="btn-modal-primary"
              [disabled]="enrollingId() === pc._id"
              (click)="confirmPaymentAndEnroll(pc)"
            >
              {{ enrollingId() === pc._id ? 'Processing...' : 'Pay & Enroll' }}
            </button>
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
      }

      * {
        box-sizing: border-box;
      }

      .courses-page-wrapper {
        width: 100%;
        min-height: 100vh;
        background: var(--surface);
        color: var(--text-main);
        position: relative;
        overflow-x: hidden;
      }

      .container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      /* --- Animations --- */
      @keyframes reveal {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes move-blob {
        0% {
          transform: translate(0, 0) scale(1);
        }
        33% {
          transform: translate(30px, -50px) scale(1.1);
        }
        66% {
          transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
          transform: translate(0, 0) scale(1);
        }
      }

      @supports (animation-timeline: view()) {
        .reveal-on-scroll {
          opacity: 0;
          animation: reveal 0.6s ease-out forwards;
          animation-timeline: view();
          animation-range: entry 10% cover 30%;
        }
      }

      @supports not (animation-timeline: view()) {
        .reveal-on-scroll {
          opacity: 1;
          transform: none;
        }
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

      /* --- Section Styles --- */
      .courses-section {
        padding: 6rem 0;
        position: relative;
        z-index: 1;
      }

      .section-head {
        text-align: center;
        max-width: 700px;
        margin: 0 auto 4rem;
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
        margin-bottom: 1rem;
        letter-spacing: -0.02em;
      }

      .header-subline {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        font-size: 1.1rem;
        color: var(--text-muted);
      }

      .header-subline p {
        margin: 0;
      }

      .btn-my-courses {
        padding: 0.5rem 1.25rem;
        border-radius: 50px;
        font-weight: 600;
        text-decoration: none;
        color: var(--text-main);
        background: white;
        border: 1px solid var(--border);
        transition: all 0.3s;
        white-space: nowrap;
      }

      .btn-my-courses:hover {
        border-color: var(--text-muted);
        transform: translateY(-2px);
        box-shadow: 0 4px 10px -2px rgba(0, 0, 0, 0.1);
      }

      /* --- Courses Grid --- */
      .courses-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        gap: 2rem;
      }

      .course-card {
        background: white;
        border-radius: 24px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid var(--border);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      }

      .course-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }

      .card-img-container {
        position: relative;
        height: 200px;
      }

      .card-img-top {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s;
      }

      .course-card:hover .card-img-top {
        transform: scale(1.05);
      }

      .instructor-badge {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 50px;
        font-size: 0.8rem;
        backdrop-filter: blur(4px);
      }

      .card-content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }

      .course-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
        color: var(--text-main);
      }

      .course-description {
        color: var(--text-muted);
        line-height: 1.6;
        flex-grow: 1;
        margin-bottom: 1.5rem;
        white-space: pre-line;
        font-size: 0.95rem;
      }

      .course-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        padding-top: 1rem;
        border-top: 1px solid var(--border);
      }

      .course-price {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--text-main);
      }

      .btn-enroll {
        padding: 0.6rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        text-decoration: none;
        color: white;
        background: var(--text-main);
        transition: all 0.3s;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }

      .btn-enroll:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        background: var(--primary-dark);
      }

      /* --- Payment Modal --- */
      .payment-modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(9, 9, 11, 0.5);
        backdrop-filter: blur(8px);
        z-index: 1050;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .payment-modal {
        background: var(--background);
        border-radius: 24px;
        border: 1px solid var(--border);
        box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 500px;
        animation: slideIn 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        display: flex;
        flex-direction: column;
        margin: 1.5rem;
      }

      @keyframes slideIn {
        from { transform: translateY(30px) scale(0.98); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid var(--border);
      }

      .modal-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-main);
      }

      .btn-close {
        background: transparent;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        transition: color 0.2s;
        padding: 0;
        line-height: 1;
        opacity: 0.7;
      }

      .btn-close:hover {
        opacity: 1;
        color: var(--text-main);
      }

      .modal-body {
        padding: 1.5rem;
      }

      .course-title-modal {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-main);
        margin-bottom: 0.5rem;
      }

      .course-price-modal {
        font-size: 1rem;
        color: var(--text-muted);
        margin-bottom: 2rem;
      }

      .course-price-modal span {
        font-weight: 700;
        color: var(--text-main);
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      .form-label {
        display: block;
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--text-muted);
        margin-bottom: 0.5rem;
      }

      .form-control, .form-select {
        width: 100%;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text-main);
        font-size: 1rem;
        transition: all 0.2s;
      }

      .form-control:focus, .form-select:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
      }

      .demo-notice {
        font-size: 0.85rem;
        color: var(--text-muted);
        background: var(--surface);
        padding: 0.75rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
      }

      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        padding: 1.5rem;
        border-top: 1px solid var(--border);
        background: var(--surface);
        border-bottom-left-radius: 24px;
        border-bottom-right-radius: 24px;
      }

      .btn-modal-secondary, .btn-modal-primary {
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s;
        border: none;
        cursor: pointer;
      }

      .btn-modal-secondary {
        background: white;
        color: var(--text-main);
        border: 1px solid var(--border);
      }

      .btn-modal-secondary:hover {
        background: var(--surface);
        border-color: var(--accent);
      }

      .btn-modal-primary {
        color: white;
        background: var(--text-main);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }

      .btn-modal-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        background: var(--primary-dark);
      }

      .btn-modal-primary:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
    `
  ]
})
export class CoursesComponent {
  private courseApi = inject(CourseService);
  auth = inject(AuthService);

  loading = signal(true);
  error = signal<string | null>(null);
  enrollingId = signal<string | null>(null);
  courses = signal<Course[]>([]);
  paymentCourse = signal<Course | null>(null);
  paymentMethod: 'card' | 'upi' | 'netbanking' = 'card';

  constructor() {
    this.courseApi.listPublic().subscribe({
      next: (r) => {
        this.courses.set(r.courses);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set(e?.error?.message ?? 'Failed to load courses');
        this.loading.set(false);
      }
    });
  }

  openPayment(course: Course) {
    this.paymentCourse.set(course);
    this.paymentMethod = 'card';
    this.error.set(null);
  }

  closePayment() {
    this.paymentCourse.set(null);
    this.enrollingId.set(null);
  }

  confirmPaymentAndEnroll(course: Course) {
    this.enrollingId.set(course._id);
    this.courseApi.enroll(course._id).subscribe({
      next: () => {
        this.enrollingId.set(null);
        this.closePayment();
        alert('Payment successful. You are enrolled in this course.');
      },
      error: (e) => {
        this.enrollingId.set(null);
        this.error.set(e?.error?.message ?? 'Enrollment failed');
      }
    });
  }

  instructorName(c: Course): string {
    const i: any = c.instructor as any;
    if (!i) return '—';
    if (typeof i === 'string') return '—';
    return String(i.name ?? '—');
  }
}
