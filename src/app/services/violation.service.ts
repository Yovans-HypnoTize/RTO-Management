import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ViolationModel } from '../models/violation.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ViolationService {
   constructor(private http: HttpClient) {}
  private violations: ViolationModel[] = [
    {
      id: '232',
      driverId: 'srw24',
      vehicleId: 'sds232',
      violationType: 'No helmet',
      createdBy: 'RTO 1',
      createdByOfficerId: 1,
    },
  ];

  getViolations(): Observable<ViolationModel[]> {
    return of(this.violations);
  }

  registerViolation(newViolation: ViolationModel): Observable<any> {
     return this.http.post(`violation`, newViolation);
  }
}
