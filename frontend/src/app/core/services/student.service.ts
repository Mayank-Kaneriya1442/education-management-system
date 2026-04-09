import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../constants';

@Injectable({ providedIn: 'root' })
export class StudentService {
  constructor(private http: HttpClient) {}

  profile() {
    return this.http.get<any>(`${API_BASE_URL}/student/profile`);
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.put(`${API_BASE_URL}/student/change-password`, { currentPassword, newPassword });
  }

  listStudents() {
    return this.http.get<any[]>(`${API_BASE_URL}/admin/students`);
  }

  createStudent(student: { name: string; email: string; password: string; enrollmentNumber: string; course: string }) {
    return this.http.post(`${API_BASE_URL}/admin/students`, student);
  }

  deleteStudent(id: string) {
    return this.http.delete(`${API_BASE_URL}/admin/students/${id}`);
  }
}
