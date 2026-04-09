import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/client/home.component').then((m) => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./features/client/login.component').then((m) => m.LoginComponent) },
  {
    path: 'register',
    loadComponent: () => import('./features/client/register.component').then((m) => m.RegisterComponent)
  },
  {
    path: 'courses',
    loadComponent: () => import('./features/client/courses.component').then((m) => m.CoursesComponent)
  },
  { path: 'blog', loadComponent: () => import('./features/client/blog.component').then((m) => m.BlogComponent) },
  {
    path: 'contact',
    loadComponent: () => import('./features/client/contact.component').then((m) => m.ContactComponent)
  },
  { path: 'about', loadComponent: () => import('./features/client/about.component').then((m) => m.AboutComponent) },
  { path: 'logout', loadComponent: () => import('./features/client/logout.component').then((m) => m.LogoutComponent) },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./features/client/profile.component').then((m) => m.ProfileComponent)
  },

  {
    path: 'my-courses',
    canActivate: [authGuard, roleGuard(['student'])],
    loadComponent: () => import('./features/client/my-courses.component').then((m) => m.MyCoursesComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./features/client/profile.component').then((m) => m.ProfileComponent)
  },

  // Admin
  {
    path: 'admin/login',
    loadComponent: () => import('./features/admin/admin-login.component').then((m) => m.AdminLoginComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard(['admin'])],
    loadComponent: () => import('./features/admin/admin-dashboard.component').then((m) => m.AdminDashboardComponent)
  },
  {
    path: 'admin/profile',
    canActivate: [authGuard, roleGuard(['admin'])],
    loadComponent: () => import('./features/admin/admin-profile.component').then((m) => m.AdminProfileComponent)
  },
  {
    path: 'admin/reviews',
    canActivate: [authGuard, roleGuard(['admin'])],
    loadComponent: () => import('./features/admin/review-management.component').then((m) => m.ReviewManagementComponent)
  },
  {
    path: 'admin/students',
    canActivate: [authGuard, roleGuard(['admin'])],
    loadComponent: () =>
      import('./features/admin/student-management.component').then((m) => m.StudentManagementComponent)
  },
  {
    path: 'admin/teachers',
    canActivate: [authGuard, roleGuard(['admin'])],
    loadComponent: () =>
      import('./features/admin/teacher-management.component').then((m) => m.TeacherManagementComponent)
  },
  {
    path: 'admin/contacts',
    canActivate: [authGuard, roleGuard(['admin'])],
    loadComponent: () =>
      import('./features/admin/contact-management.component').then((m) => m.ContactManagementComponent)
  },
  {
    path: 'admin/blogs',
    canActivate: [authGuard, roleGuard(['admin'])],
    loadComponent: () =>
      import('./features/admin/blog-management.component').then((m) => m.BlogManagementComponent)
  },

  // Admin view of instructor courses
  {
    path: 'admin/teacher-courses',
    canActivate: [authGuard, roleGuard(['admin'])],
    loadComponent: () =>
      import('./features/instructor/instructor-my-courses.component').then((m) => m.InstructorMyCoursesComponent)
  },
  {
    path: 'admin/teacher-enrolled/:courseId',
    canActivate: [authGuard, roleGuard(['admin'])],
    loadComponent: () =>
      import('./features/instructor/instructor-enrolled.component').then((m) => m.InstructorEnrolledComponent)
  },

  // Instructor
  {
    path: 'instructor/my-courses',
    canActivate: [authGuard, roleGuard(['instructor', 'admin'])],
    loadComponent: () =>
      import('./features/instructor/instructor-my-courses.component').then((m) => m.InstructorMyCoursesComponent)
  },
  {
    path: 'instructor/enrolled/:courseId',
    canActivate: [authGuard, roleGuard(['instructor', 'admin'])],
    loadComponent: () =>
      import('./features/instructor/instructor-enrolled.component').then((m) => m.InstructorEnrolledComponent)
  },

  { path: '**', redirectTo: '' }
];
