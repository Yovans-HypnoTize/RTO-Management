import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private role: 'Clerk' | 'Inspector' | 'Supervisor' = 'Clerk';

  getUserRole() {
    return this.role;
  }

  setUserRole(role: 'Clerk' | 'Inspector' | 'Supervisor') {
    this.role = role;
  }
}
