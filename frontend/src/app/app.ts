import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar.component';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NgIf],
  template: `
    <app-navbar *ngIf="!isAppShellHidden()"></app-navbar>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);
  private url = signal(this.router.url);

  /** Hide navbar on all admin and instructor routes. */
  protected isAppShellHidden = computed(() => this.url().startsWith('/admin') || this.url().startsWith('/instructor'));

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.url.set(this.router.url));
  }
}
