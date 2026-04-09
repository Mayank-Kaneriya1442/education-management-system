import { Component, inject, signal, computed } from '@angular/core';
// Added UpperCasePipe to the import below
import { NgFor, NgIf, DatePipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { BlogService, Blog } from '../../core/services/blog.service';

@Component({
  standalone: true,
  // Added UpperCasePipe to the imports array here
  imports: [NgFor, NgIf, DatePipe, SlicePipe, UpperCasePipe],
  template: `
    <div class="page-wrapper">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>

      <section class="content-section">
        <div class="container">
          <div class="section-head reveal-on-scroll">
            <span class="section-badge">Our Blog</span>
            <h2 class="section-title">Latest Articles & News</h2>
            <div class="header-subline">
              <p>Stay updated with the latest announcements, articles, and insights from the Lumina team.</p>
            </div>
          </div>

          <div class="alert alert-danger" *ngIf="error()">{{ error() }}</div>

          <div class="blog-grid" *ngIf="!loading(); else loadingTpl">
            <div class="blog-card reveal-on-scroll" *ngFor="let b of paginatedBlogs()">
              <div class="card-img-container">
                <img
                  [src]="b.coverImageUrl || 'https://via.placeholder.com/400x225.png/f1f1f1/808080?text=Lumina'"
                  class="card-img-top"
                  alt="Blog post cover image"
                />
              </div>
              <div class="card-content">
                <div class="card-meta">
                  <span class="meta-date">{{ b.createdAt | date : 'mediumDate' }}</span>
                  <span class="meta-status">Published</span>
                </div>
                
                <h3 class="card-title">
                  <a href="#">{{ b.title | uppercase }}</a>
                </h3>
                <p class="card-excerpt">{{ b.excerpt || ((b.content | slice : 0 : 140) + '...') }}</p>
              </div>
            </div>
          </div>

          <div *ngIf="!loading() && blogs().length === 0" class="empty-state reveal-on-scroll">
            <h3>No blog posts yet</h3>
            <p>Check back later for articles and announcements.</p>
          </div>

          <div class="pagination-wrapper reveal-on-scroll" *ngIf="!loading() && totalPages() > 1">
            <button class="btn-pagination" (click)="prevPage()" [disabled]="currentPage() === 1">
              ← Previous
            </button>
            <span class="page-indicator">Page {{ currentPage() }} of {{ totalPages() }}</span>
            <button class="btn-pagination" (click)="nextPage()" [disabled]="currentPage() === totalPages()">
              Next →
            </button>
          </div>

          <ng-template #loadingTpl>
            <div class="text-secondary text-center py-5">Loading blog posts...</div>
          </ng-template>
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
        --text-main: #09090b;
        --text-muted: #71717a;
        --border: #e4e4e7;
        --surface: #fafafa;
      }

      .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
      .content-section { padding: 6rem 0; position: relative; z-index: 1; }
      
      /* --- Blog Grid --- */
      .blog-grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
        gap: 2.5rem; 
      }

      .blog-card {
        background: white;
        border-radius: 24px;
        border: 1px solid var(--border);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: all 0.3s ease;
      }

      /* Image styling to match the logo look */
      .card-img-container {
        height: 240px;
        background: #ffffff;
        padding: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #f4f4f5;
      }
      .card-img-top {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }

      .card-content { padding: 1.5rem; }

      .card-meta { 
        display: flex; 
        align-items: center; 
        gap: 0.75rem; 
        font-size: 0.8rem; 
        color: var(--text-muted); 
        margin-bottom: 1rem;
        font-weight: 500;
      }

      .meta-status {
        color: #16a34a;
        background: #f0fdf4;
        padding: 0.2rem 0.6rem;
        border-radius: 6px;
        font-weight: 600;
      }

      .card-title { 
        font-size: 1.4rem; 
        font-weight: 800; 
        margin-bottom: 0.5rem; 
        letter-spacing: -0.02em;
      }
      .card-title a { color: var(--text-main); text-decoration: none; }

      .card-author {
        font-size: 0.85rem;
        color: #71717a;
        font-weight: 600;
        margin-bottom: 1.25rem;
        letter-spacing: 0.05em;
      }

      .card-excerpt { color: var(--text-muted); line-height: 1.6; font-size: 0.95rem; }

      /* Blob/Background styles... */
      .page-wrapper { width: 100%; min-height: 100vh; position: relative; overflow-x: hidden; background: var(--surface); }
      .blob { position: absolute; filter: blur(80px); z-index: 0; opacity: 0.5; border-radius: 50%; }
      .blob-1 { top: -10%; left: -10%; width: 500px; height: 500px; background: rgba(0,0,0,0.03); }
    `
  ]
})
export class BlogComponent {
  private api = inject(BlogService);

  loading = signal(true);
  error = signal<string | null>(null);
  blogs = signal<any[]>([]); // Changed to any[] temporarily to avoid interface errors
  
  currentPage = signal(1);
  pageSize = 6;

  paginatedBlogs = computed(() => {
    const page = this.currentPage();
    const size = this.pageSize;
    const start = (page - 1) * size;
    return this.blogs().slice(start, start + size);
  });

  totalPages = computed(() => Math.ceil(this.blogs().length / this.pageSize));

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  constructor() {
    this.api.listPublic().subscribe({
      next: (r: any) => {
        this.blogs.set(r.blogs);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set(e?.error?.message ?? 'Failed to load blogs');
        this.loading.set(false);
      }
    });
  }
}