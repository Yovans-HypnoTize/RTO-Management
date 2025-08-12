import { Component, inject, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  router = inject(Router);
  elementRef = inject(ElementRef);
  isProfileMenuOpen = false;

  get currentUserRole(): string {
    return localStorage.getItem('role') || 'Unknown';
  }

  get currentUserName(): string {
    return localStorage.getItem('name') || 'Unknown';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isProfileMenuOpen = false;
    }
  }

  clearUserDataFromLocalStorage() {
    const keysToRemove = [
      'active',
      'badgeNumber',
      'email',
      'id',
      'joiningDate',
      'name',
      'password',
      'role',
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  goToHome() {
    this.router.navigate(['']);
  }

  goToLogin() {
    this.clearUserDataFromLocalStorage();
    this.router.navigate(['login']);
  }
}
