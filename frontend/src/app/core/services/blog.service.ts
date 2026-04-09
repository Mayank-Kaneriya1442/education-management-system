import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../constants';

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  isPublished: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private http: HttpClient) {}

  listPublic() {
    return this.http.get<{ blogs: Blog[] }>(`${API_BASE_URL}/blogs`);
  }

  adminListAll() {
    return this.http.get<{ blogs: Blog[] }>(`${API_BASE_URL}/blogs/admin/all`);
  }

  adminCreate(input: Partial<Blog>) {
    return this.http.post<{ blog: Blog }>(`${API_BASE_URL}/blogs/admin`, input);
  }

  adminUpdate(id: string, input: Partial<Blog>) {
    return this.http.patch<{ blog: Blog }>(`${API_BASE_URL}/blogs/admin/${id}`, input);
  }

  adminDelete(id: string) {
    return this.http.delete<{ ok: boolean }>(`${API_BASE_URL}/blogs/admin/${id}`);
  }
}

