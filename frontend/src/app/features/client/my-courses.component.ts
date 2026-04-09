import { Component, inject, signal } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService, Enrollment } from '../../core/services/course.service';
import { ReviewService, Review } from '../../core/services/review.service';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, ReactiveFormsModule, RouterLink],
  template: `
    <div class="page-wrapper">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>

      <section class="content-section">
        <div class="container">
          <div class="section-head reveal-on-scroll">
            <span class="section-badge">Dashboard</span>
            <h2 class="section-title">My Learning Journey</h2>
            <div class="header-subline">
              <p>Track your progress and manage your course reviews.</p>
            </div>
          </div>

          <div class="alert alert-danger reveal-on-scroll" *ngIf="error()">{{ error() }}</div>
          <div class="alert alert-success reveal-on-scroll" *ngIf="reviewSuccess()">{{ reviewSuccess() }}</div>

          <div class="courses-grid" *ngIf="!loading(); else loadingTpl">
            <div class="course-card reveal-on-scroll" *ngFor="let e of enrollments()">
                <div class="status-badge" [class.completed]="e.status === 'completed'">
                  {{ e.status }}
                </div>

              <div class="card-content">
                <div class="content-body">
                  <h3 class="course-title">{{ e.course.title }}</h3>
                  <p class="instructor-text">By {{ instructorName(e.course) }}</p>
                  <div class="meta-info">
                    <span class="date">Enrolled: {{ e.createdAt | date : 'mediumDate' }}</span>
                  </div>

                  <div class="review-status" *ngIf="getMyReview(e.course._id) as r">
                    <div class="stars">
                      <span class="star-icon">★</span> {{ r.rating }}/5
                    </div>
                    <span
                      class="status-pill"
                      [class]="r.status === 'approved' ? 'status-success' : r.status === 'rejected' ? 'status-danger' : 'status-neutral'"
                    >
                      {{ r.status }}
                    </span>
                  </div>
                </div>

                <div class="card-footer">
                  <button class="btn-review" (click)="openReviewForm(e.course)">
                    {{ getMyReview(e.course._id) ? 'Update Review' : 'Leave a Review' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="!loading() && enrollments().length === 0" class="empty-state reveal-on-scroll">
            <div class="empty-icon">📚</div>
            <h3>No enrollments yet</h3>
            <p>You haven't enrolled in any courses yet. Start your journey today!</p>
            <a routerLink="/courses" class="btn-browse">Browse Courses</a>
          </div>

          <ng-template #loadingTpl>
            <div class="text-secondary text-center py-5">Loading your courses...</div>
          </ng-template>
        </div>
      </section>

      <div class="modal-backdrop" *ngIf="reviewingCourse() as c" (click)="closeReviewForm()">
        <div class="modal-dialog" role="dialog" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h5 class="modal-title">Review Course</h5>
            <button type="button" class="btn-close" (click)="closeReviewForm()">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div class="modal-body">
            <h4 class="review-course-title">{{ c.title }}</h4>
            <p class="review-subtitle">Share your experience with other students</p>
            
            <form [formGroup]="reviewForm" (ngSubmit)="submitReview()">
              <div class="form-group">
                <label class="form-label">Rating</label>
                <select class="form-select" formControlName="rating">
                  <option [value]="5">⭐⭐⭐⭐⭐ - Excellent</option>
                  <option [value]="4">⭐⭐⭐⭐ - Very Good</option>
                  <option [value]="3">⭐⭐⭐ - Good</option>
                  <option [value]="2">⭐⭐ - Fair</option>
                  <option [value]="1">⭐ - Poor</option>
                </select>
              </div>
              
              <div class="form-group">
                <label class="form-label">Your Comment</label>
                <textarea 
                  class="form-control" 
                  rows="4" 
                  formControlName="comment" 
                  placeholder="What did you like or dislike about this course?"
                ></textarea>
              </div>

              <div class="modal-footer-actions">
                <button type="button" class="btn-modal-secondary" (click)="closeReviewForm()">Cancel</button>
                <button 
                  type="submit" 
                  class="btn-modal-primary" 
                  [disabled]="reviewForm.invalid || submittingReview()"
                >
                  {{ submittingReview() ? 'Submitting...' : 'Submit Review' }}
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

      .page-wrapper {
        width: 100%;
        min-height: 100vh;
        position: relative;
        overflow-x: hidden;
      }

      .container { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; }

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
      .blob-2 { bottom: 10%; right: -5%; width: 400px; height: 400px; background: var(--blob-color-2); }

      @keyframes move-blob { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(20px, -20px) scale(1.1); } }
      @keyframes reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

      .reveal-on-scroll { animation: reveal 0.6s ease-out forwards; }

      .content-section { padding: 6rem 0; position: relative; z-index: 1; }
      .section-head { text-align: center; max-width: 700px; margin: 0 auto 4rem; }
      .section-badge { color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 0.875rem; margin-bottom: 1rem; display: block; }
      .section-title { font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
      .header-subline { color: var(--text-muted); font-size: 1.1rem; }

      .courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; }
      
      .course-card {
        background: white; border-radius: 20px; border: 1px solid var(--border);
        overflow: hidden; display: flex; flex-direction: column; transition: all 0.3s;
      }
      .course-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px -10px rgba(0,0,0,0.1); }

      .status-badge {
        position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.7);
        color: white; padding: 0.35rem 0.85rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600;
      }
      .status-badge.completed { background: #10b981; }

      .card-content { padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column; }
      .course-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-main); }
      .instructor-text { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem; }

      .btn-review {
        width: 100%; padding: 0.75rem; border-radius: 12px; border: 1px solid var(--border);
        background: white; font-weight: 600; cursor: pointer; transition: all 0.2s;
      }
      .btn-review:hover { background: var(--surface); }

      /* --- MODAL FIXES --- */
      .modal-backdrop {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
        z-index: 9999; display: flex; align-items: center; justify-content: center;
        animation: fadeIn 0.2s ease-out;
        pointer-events: auto; /* Ensure clicks are captured */
      }
      .modal-dialog {
        background: white; width: 90%; max-width: 500px;
        border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3);
        animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative; z-index: 10000;
        pointer-events: auto; /* Ensure inputs are interactive */
      }
      .modal-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; }
      .modal-body { padding: 1.5rem; }
      
      .form-control, .form-select {
        width: 100%; padding: 0.75rem; border-radius: 12px; border: 1px solid var(--border);
        font-family: inherit; margin-top: 0.5rem;
      }
      .btn-modal-primary { background: var(--text-main); color: white; width: 100%; padding: 0.8rem; border-radius: 12px; border: none; cursor: pointer; font-weight: 600; }
      .btn-modal-secondary { background: none; border: 1px solid var(--border); color: var(--text-main); padding: 0.8rem; border-radius: 12px; cursor: pointer; font-weight: 600; }
    `
  ]
})
export class MyCoursesComponent {
  private courseApi = inject(CourseService);
  private reviewApi = inject(ReviewService);
  private fb = inject(FormBuilder);

  loading = signal(true);
  error = signal<string | null>(null);
  reviewSuccess = signal<string | null>(null);
  enrollments = signal<Enrollment[]>([]);
  myReviews = signal<Review[]>([]);
  
  reviewingCourse = signal<any>(null);
  submittingReview = signal(false);

  reviewForm = this.fb.group({
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: ['']
  });

  constructor() {
    this.loadData();
  }

  loadData() {
    this.courseApi.myEnrollments().subscribe({
      next: (r) => {
        this.enrollments.set(r.enrollments);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set(e?.error?.message ?? 'Failed to load enrollments');
        this.loading.set(false);
      }
    });
    this.reviewApi.getMyReviews().subscribe({
      next: (r) => this.myReviews.set(r.reviews),
      error: () => {}
    });
  }

  getMyReview(courseId: string): Review | undefined {
    return this.myReviews().find((r) => (r.course as any)?._id === courseId || (r.course as any) === courseId);
  }

  openReviewForm(course: any) {
    const r = this.getMyReview(course._id);
    this.reviewForm.patchValue({
      rating: r?.rating ?? 5,
      comment: r?.comment ?? ''
    });
    this.reviewingCourse.set(course);
    this.reviewSuccess.set(null);
  }

  closeReviewForm() {
    this.reviewingCourse.set(null);
  }

  submitReview() {
    const course = this.reviewingCourse();
    if (!course || this.reviewForm.invalid) return;

    this.submittingReview.set(true);
    this.error.set(null);
    this.reviewApi
      .create({
        courseId: course._id,
        rating: Number(this.reviewForm.get('rating')!.value!),
        comment: this.reviewForm.get('comment')!.value ?? undefined
      })
      .subscribe({
        next: () => {
          this.submittingReview.set(false);
          this.closeReviewForm();
          this.reviewSuccess.set('Review submitted. It may be visible after admin approval.');
          this.reviewApi.getMyReviews().subscribe((res) => this.myReviews.set(res.reviews));
        },
        error: (e) => {
          this.submittingReview.set(false);
          this.error.set(e?.error?.message ?? 'Failed to submit review');
        }
      });
  }

  instructorName(course: any): string {
    const i = course?.instructor;
    if (!i) return '—';
    return typeof i === 'object' ? (i.name ?? '—') : '—';
  }
}