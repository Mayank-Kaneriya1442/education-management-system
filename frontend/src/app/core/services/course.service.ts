import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../constants';
import { AuthService, User } from './auth.service';

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  thumbnailUrl: string;
  instructor: User | string;
  isPublished: boolean;
  createdAt: string;
}

export interface Enrollment {
  _id: string;
  student: User | string;
  course: Course;
  status: 'enrolled' | 'completed' | 'cancelled';
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  listPublic() {
    return this.http.get<{ courses: Course[] }>(`${API_BASE_URL}/courses`);
  }

  enroll(courseId: string) {
    return this.http.post<{ enrollment: Enrollment }>(`${API_BASE_URL}/courses/${courseId}/enroll`, {});
  }

  myEnrollments() {
    return this.http.get<{ enrollments: Enrollment[] }>(`${API_BASE_URL}/courses/me/enrollments`);
  }

  instructorCreate(input: Partial<Course>) {
    return this.http.post<{ course: Course }>(`${API_BASE_URL}/courses/instructor`, input);
  }

  instructorMyCourses() {
    return this.http.get<{ courses: Course[] }>(`${API_BASE_URL}/courses/instructor/me`);
  }

  instructorCourseEnrollments(courseId: string) {
    return this.http.get<{ enrollments: Enrollment[] }>(`${API_BASE_URL}/courses/instructor/${courseId}/enrollments`);
  }

  update(courseId: string, input: Partial<Course>) {
    return this.http.patch<{ course: Course }>(`${API_BASE_URL}/courses/${courseId}`, input);
  }

  remove(courseId: string) {
    return this.http.delete<{ ok: boolean }>(`${API_BASE_URL}/courses/${courseId}`);
  }
}

