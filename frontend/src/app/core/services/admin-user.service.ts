import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../constants';
import { User } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminUserService {
  constructor(private http: HttpClient) {}

  list(role?: string) {
    const qs = role ? `?role=${encodeURIComponent(role)}` : '';
    return this.http.get<{ users: User[] }>(`${API_BASE_URL}/admin/users${qs}`);
  }

  create(input: { name: string; email: string; phone?: string; role: string; password: string }) {
    return this.http.post<{ user: User }>(`${API_BASE_URL}/admin/users`, input);
  }

  update(id: string, input: Partial<User> & { password?: string }) {
    return this.http.patch<{ user: User }>(`${API_BASE_URL}/admin/users/${id}`, input);
  }

  delete(id: string) {
    return this.http.delete<{ ok: boolean }>(`${API_BASE_URL}/admin/users/${id}`);
  }
}

