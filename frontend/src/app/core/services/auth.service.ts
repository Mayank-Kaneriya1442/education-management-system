import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { API_BASE_URL } from '../constants';
import { TokenService } from './token.service';

export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  enrollmentNumber?: string;
  course?: string;
  role: UserRole;
  phone?: string;
  isActive?: boolean;
}

function decodeToken(token: string) {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    return decoded as any;
  } catch {
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSig = signal<User | null>(null);

  isLoggedIn = computed(() => !!this.userSig());
  role = computed(() => this.userSig()?.role ?? null);
  user = computed(() => this.userSig());

  constructor(private http: HttpClient, private tokens: TokenService) {}

  restoreSession() {
    const token = this.tokens.getToken();
    if (!token) return of(null);
    const payload = decodeToken(token);
    if (!payload?.sub && !payload?.id) {
      this.logout();
      return of(null);
    }

    return this.http.get<{user: User}>(`${API_BASE_URL}/auth/me`).pipe(
      tap(({user}) => this.userSig.set(user)),
      catchError(() => {
        this.logout();
        return of(null);
      })
    );
  }

  register(input: any) {
    return this.http.post<{ token: string; user: User }>(`${API_BASE_URL}/auth/register`, input).pipe(
      tap((r) => {
        this.tokens.setToken(r.token);
        this.userSig.set(r.user);
      })
    );
  }

  login(input: any) {
    return this.http.post<{ token: string; user: User }>(`${API_BASE_URL}/auth/login`, input).pipe(
      tap((r) => {
        this.tokens.setToken(r.token);
        this.userSig.set(r.user);
      })
    );
  }

  profile() {
    return this.http.get<{user: User}>(`${API_BASE_URL}/auth/me`).pipe(map(res => res.user));
  }

  updateProfile(input: any) {
    return this.http.patch<{user: User}>(`${API_BASE_URL}/auth/me`, input).pipe(
      tap(({user}) => this.userSig.set(user))
    );
  }

  changePassword(input: { currentPassword: string; newPassword: string }) {
    return this.http.put(`${API_BASE_URL}/auth/change-password`, input);
  }

  logout() {
    this.tokens.clear();
    this.userSig.set(null);
  }
}

