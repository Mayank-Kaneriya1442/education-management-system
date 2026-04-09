import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../constants';

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'closed';
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  send(input: { name: string; email: string; subject?: string; message: string }) {
    return this.http.post<{ message: ContactMessage }>(`${API_BASE_URL}/contacts`, input);
  }

  adminList(status?: string) {
    const qs = status ? `?status=${encodeURIComponent(status)}` : '';
    return this.http.get<{ messages: ContactMessage[] }>(`${API_BASE_URL}/contacts/admin${qs}`);
  }

  adminSetStatus(id: string, status: 'new' | 'read' | 'closed') {
    return this.http.patch<{ message: ContactMessage }>(`${API_BASE_URL}/contacts/admin/${id}/status`, { status });
  }

  adminDelete(id: string) {
    return this.http.delete<{ ok: boolean }>(`${API_BASE_URL}/contacts/admin/${id}`);
  }
}

