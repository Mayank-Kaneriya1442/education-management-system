import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  template: ` <div class="text-secondary">Logging out...</div> `
})
export class LogoutComponent {
  constructor() {
    const auth = inject(AuthService);
    const router = inject(Router);
    const role = auth.role();
    auth.logout();
    queueMicrotask(() => {
      if (role === 'admin') {
        router.navigateByUrl('/admin/login');
      } else {
        router.navigateByUrl('/');
      }
    });
  }
}

