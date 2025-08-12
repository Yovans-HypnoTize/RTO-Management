import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { OfficerModel } from '../models/officer.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OfficerService {
  constructor(private http: HttpClient) {}

  getOfficer() {
    return this.http.get(`officer/list`)
  }

  registerOfficer(officer: OfficerModel) {
    return this.http.post(`officer`, officer)
  }
}
