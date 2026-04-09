import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../constants';

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  student?: any;
  course?: any;
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  [x: string]: any;
  update(existingReviewId: string, reviewData: { courseId: any; rating: number; comment: string | undefined; }) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  getMyReviews() {
    return this.http.get<{ reviews: Review[] }>(`${API_BASE_URL}/reviews/me`);
  }

  create(input: { courseId: string; rating: number; comment?: string }) {
    return this.http.post<{ review: Review }>(`${API_BASE_URL}/reviews`, input);
  }

  adminList(status?: string) {
    const qs = status ? `?status=${encodeURIComponent(status)}` : '';
    return this.http.get<{ reviews: Review[] }>(`${API_BASE_URL}/reviews/admin${qs}`);
  }

  adminSetStatus(id: string, status: 'pending' | 'approved' | 'rejected') {
    return this.http.patch<{ review: Review }>(`${API_BASE_URL}/reviews/admin/${id}/status`, { status });
  }

  adminDelete(id: string) {
    return this.http.delete<{ ok: boolean }>(`${API_BASE_URL}/reviews/admin/${id}`);
  }
}

