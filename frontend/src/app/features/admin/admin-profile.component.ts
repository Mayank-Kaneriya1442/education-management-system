import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [NgIf, RouterLink],
  template: `
    <div class="profile-container">
      <header class="profile-header">
        <h1>Admin Profile</h1>
        <a routerLink="/admin" class="btn-dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          <span>Go to Dashboard</span>
        </a>
      </header>

      <div class="profile-card" *ngIf="auth.user() as u">
        <div class="profile-card-header">
          <div class="profile-avatar">
            <span>👨‍💼</span>
          </div>
        </div>
        <div class="profile-card-body">
          <h2 class="user-name">{{ u.name }}</h2>
          <p class="user-role">{{ u.role }}</p>

          <div class="details-grid">
            <div class="detail-item">
              <label>Email Address</label>
              <p>{{ u.email }}</p>
            </div>
            <div class="detail-item">
              <label>Phone Number</label>
              <p>{{ u.phone || 'Not Provided' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: 'Outfit', sans-serif;
        color: #e2e8f0;
      }

      .profile-container {
        padding: 3rem;
        animation: fadeIn 0.5s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .profile-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3rem;
      }

      .profile-header h1 {
        font-size: 2.5rem;
        font-weight: 800;
        color: #f8fafc;
        letter-spacing: -0.03em;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      .btn-dashboard {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1.5rem;
        background: rgba(30, 41, 59, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        color: #e2e8f0;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .btn-dashboard:hover {
        background: rgba(51, 65, 85, 0.8);
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      }

      .profile-card {
        max-width: 700px;
        margin: 0 auto;
        background: rgba(30, 41, 59, 0.7);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 32px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        text-align: center;
      }

      .profile-card-header {
        background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(219, 39, 119, 0.1));
        padding: 3rem 2rem 5rem;
        position: relative;
      }

      .profile-avatar {
        width: 120px;
        height: 120px;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
        color: white;
        box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
        border: 4px solid #0f172a;
        position: absolute;
        bottom: -60px;
        left: 50%;
        transform: translateX(-50%);
      }

      .profile-card-body {
        padding: 5rem 2rem 2.5rem;
      }

      .user-name {
        font-size: 2rem;
        font-weight: 700;
        color: #f8fafc;
        margin: 0;
      }

      .user-role {
        font-size: 1rem;
        font-weight: 500;
        color: #a78bfa;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 2.5rem;
      }

      .details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        text-align: left;
      }

      .detail-item label {
        font-size: 0.85rem;
        color: #94a3b8;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.5rem;
        display: block;
      }

      .detail-item p {
        font-size: 1.1rem;
        font-weight: 500;
        color: #e2e8f0;
        margin: 0;
        background: rgba(15, 23, 42, 0.8);
        padding: 0.75rem 1rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      @media (max-width: 768px) {
        .profile-container {
          padding: 1.5rem;
        }
        .profile-header {
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .details-grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
      }
    `
  ]
})
export class AdminProfileComponent {
  auth = inject(AuthService);
}
