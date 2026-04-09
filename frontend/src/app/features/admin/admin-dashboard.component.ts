import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { AdminUserService } from '../../core/services/admin-user.service';
import { ReviewService } from '../../core/services/review.service';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="admin-container">
      <div class="decoration blob-1"></div>
      <div class="decoration blob-2"></div>

      <aside class="sidebar">
        <div class="sidebar-header">
          <span class="logo-box">A</span> Admin Portal
        </div>
        <nav class="nav-links">
          <a routerLink="/admin" class="nav-item active">
            <span class="nav-icon">📊</span> Dashboard
          </a>
          @for (item of navItems; track item.title) {
            <a [routerLink]="item.link" class="nav-item">
              <span class="nav-icon">{{ item.icon }}</span>
              {{ item.shortTitle || item.title }}
            </a>
          }
          <div class="nav-spacer"></div>
          <a routerLink="/logout" class="nav-item logout-link">
            <span class="nav-icon">🚪</span> Logout
          </a>
        </nav>
      </aside>

      <main class="main-content">
        <header class="header">
          <div>
            <h1>Dashboard Overview</h1>
            <p>System metrics and management hub.</p>
          </div>
          <a class="user-profile" routerLink="/admin/profile">
            <div class="admin-avatar">
               <span *ngIf="auth.user() as u">{{ u.name.charAt(0) }}</span>
            </div>
            <div class="user-info" *ngIf="auth.user() as u">
                <span class="user-name">{{ u.name }}</span>
                <span class="user-role">Administrator</span>
            </div>
          </a>
        </header>

        <div class="stats-grid">
          @for (stat of statItems; track stat.label; let i = $index) {
            <div class="stat-card" [style.animation-delay]="(i * 0.1) + 's'">
              <div class="stat-content">
                <div class="stat-header">
                   <span class="stat-label">{{ stat.label }}</span>
                   <span class="stat-icon-mini">{{ stat.icon }}</span>
                </div>
                <div class="stat-value">{{ stat.value() }}</div>
                <div class="stat-footer">Live Data</div>
              </div>
            </div>
          }
        </div>

        <h2 class="section-title">Quick Actions</h2>
        <div class="actions-grid">
           @for (item of navItems; track item.title) {
             <a [routerLink]="item.link" class="action-btn">
                <div class="action-icon-wrapper">{{ item.icon }}</div>
                <div class="action-text">
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.description }}</p>
                </div>
                <span class="arrow">→</span>
             </a>
           }
        </div>
      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

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
      --blob-color-1: rgba(0, 0, 0, 0.02);
      --blob-color-2: rgba(0, 0, 0, 0.04);
      background-color: var(--surface);
      color: var(--text-main);
      min-height: 100vh;
    }

    .admin-container { display: flex; min-height: 100vh; position: relative; }
    .decoration { position: fixed; border-radius: 50%; filter: blur(100px); z-index: 0; pointer-events: none; }
    .blob-1 { top: -5%; right: -5%; width: 500px; height: 500px; background: var(--blob-color-2); }
    .blob-2 { bottom: -5%; left: -5%; width: 600px; height: 600px; background: var(--blob-color-1); }

    .sidebar {
      width: 280px;
      background: var(--background);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      position: fixed;
      height: 100vh;
      z-index: 50;
    }

    .sidebar-header {
      padding: 2rem 1.5rem;
      font-size: 1.1rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-bottom: 1px solid var(--border);
    }

    .logo-box {
      background: var(--primary);
      color: white;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      font-size: 0.8rem;
    }

    .nav-links { flex: 1; padding: 1.5rem 1rem; display: flex; flex-direction: column; gap: 0.25rem; }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: var(--text-muted);
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.2s ease;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .nav-item:hover { background: #f4f4f5; color: var(--text-main); }
    .nav-item.active { background: var(--primary); color: white; }
    .nav-spacer { margin-top: auto; }
    .logout-link { color: #ef4444 !important; margin-bottom: 1rem; }

    .main-content { flex: 1; margin-left: 280px; padding: 3rem 4rem; position: relative; z-index: 1; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
    .header h1 { font-size: 1.75rem; font-weight: 700; letter-spacing: -0.02em; margin: 0; }
    .header p { color: var(--text-muted); font-size: 0.95rem; margin-top: 0.25rem; }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.4rem 0.8rem 0.4rem 0.4rem;
      border-radius: 10px;
      text-decoration: none;
      color: inherit;
      border: 1px solid var(--border);
      background: var(--background);
    }

    .admin-avatar {
      width: 36px;
      height: 36px;
      background: #f4f4f5;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: var(--primary);
      border: 1px solid var(--border);
    }

    .user-info { display: flex; flex-direction: column; }
    .user-name { font-size: 0.85rem; font-weight: 600; }
    .user-role { font-size: 0.7rem; color: var(--text-muted); }

    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-bottom: 4rem; }
    .stat-card {
      background: var(--background);
      padding: 1.25rem;
      border-radius: 12px;
      border: 1px solid var(--border);
      animation: fadeInUp 0.5s ease backwards;
    }

    .stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
    .stat-value { font-size: 1.75rem; font-weight: 700; margin-top: 0.5rem; }
    .stat-footer { font-size: 0.65rem; color: var(--accent); margin-top: 0.5rem; text-transform: uppercase; }

    .section-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem; color: var(--text-main); }
    .actions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }

    .action-btn {
      background: var(--background);
      border: 1px solid var(--border);
      padding: 1.25rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s ease;
    }

    .action-btn:hover { border-color: var(--primary); background: var(--surface); transform: translateY(-2px); }
    .action-icon-wrapper { font-size: 1.25rem; width: 40px; height: 40px; background: #f4f4f5; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
    .action-text h4 { margin: 0; font-size: 0.9rem; font-weight: 600; }
    .action-text p { margin: 2px 0 0 0; font-size: 0.75rem; color: var(--text-muted); }
    .arrow { margin-left: auto; color: var(--border); font-size: 0.8rem; }
    .action-btn:hover .arrow { color: var(--primary); }

    @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

    @media (max-width: 1400px) { .actions-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
  `]
})
export class AdminDashboardComponent implements OnInit {
  auth = inject(AuthService);
  private studentService = inject(AdminUserService);
  private reviewService = inject(ReviewService);
  private contactService = inject(ContactService);

  studentCount = signal(0);
  teacherCount = signal(0);
  pendingReviewCount = signal(0);
  newMessageCount = signal(0);

  statItems = [
    { label: 'Students', value: this.studentCount, icon: '🎓' },
    { label: 'Faculty', value: this.teacherCount, icon: '👨‍🏫' },
    { label: 'Reviews', value: this.pendingReviewCount, icon: '⭐' },
    { label: 'Messages', value: this.newMessageCount, icon: '💬' }
  ];

  navItems = [
    { title: 'Student Management', shortTitle: 'Students', description: 'Manage student accounts.', link: '/admin/students', icon: '👤' },
    { title: 'Faculty Management', shortTitle: 'Faculty', description: 'Instructor roles and access.', link: '/admin/teachers', icon: '💼' },
    { title: 'Review Management', shortTitle: 'Reviews', description: 'Approve student feedback.', link: '/admin/reviews', icon: '📝' },
    { title: 'Contact Messages', shortTitle: 'Messages', description: 'View user inquiries.', link: '/admin/contacts', icon: '✉️' },
    { title: 'Course Management', shortTitle: 'Courses', description: 'Organize course catalog.', link: '/admin/teacher-courses', icon: '📚' },
    { title: 'Blog Management', shortTitle: 'Blogs', description: 'Publish and edit articles.', link: '/admin/blogs', icon: '📰' }
  ];

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.studentService.list('student').subscribe(res => this.studentCount.set(res.users.length));
    this.studentService.list('instructor').subscribe(res => this.teacherCount.set(res.users.length));
    this.reviewService.adminList().subscribe(res => {
      const pending = res.reviews.filter(r => r.status !== 'approved' && r.status !== 'rejected').length;
      this.pendingReviewCount.set(pending);
    });
    this.contactService.adminList().subscribe(res => {
      const newMessages = res.messages.filter(m => m.status === 'new').length;
      this.newMessageCount.set(newMessages);
    });
  }
}