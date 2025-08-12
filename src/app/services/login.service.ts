import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environment';

@Injectable({ providedIn: 'root' })
export class LoginService {
  // private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  login(credentials: LoginModel): Observable<any> {
    return this.http.post(`officer/login`, credentials);
  }
}
