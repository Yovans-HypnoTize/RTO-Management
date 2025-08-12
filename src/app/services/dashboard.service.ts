import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardModel } from '../models/dashboard.model'; // adjust path

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getDashboardDetails(id: number): Observable<DashboardModel> {
    return this.http.get<DashboardModel>(`officer/dashboard`, {
      params: { officerId: id }
    });
  }
}
