import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaxModel } from '../models/tax.model';

@Injectable({ providedIn: 'root' })
export class TaxService {
  private taxDetails: TaxModel[] = [
    {
      id: 'D001',
      name: 'John Doe',
      dob: '2000-01-01',
      licenseNumber: 'KA1234567',
      licenseIssue: '2022-08-01',
      licenseExpiry: '2032-08-01',
      status: 'active',
      violations: [],
      vehicles: []
    }
  ];

  getTaxDetails(): Observable<TaxModel[]> {
    return of(this.taxDetails);
  }

  registerTax(newTax: TaxModel): Observable<any> {
    this.taxDetails.push(newTax);
    return of({ success: true });
  }
}